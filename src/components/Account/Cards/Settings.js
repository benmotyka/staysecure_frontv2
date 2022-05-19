import { useState } from "react";
import {Container, Header} from "./Cards.styles"
import PasswordChange from "./Parts/PasswordChange"
import AccountLevel from "./Parts/AccountLevel"
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "features/userSlice";
import { useSelector } from "react-redux";
import { selectUser } from "features/userSlice";
import { useTranslation } from "react-i18next";
import DeleteAccount from "./Parts/DeleteAccount";
import { useChangeAccountLevel } from "store/actions/user";

const Settings  = () => {
  const {t} = useTranslation()

  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const { changeAccountLevel } = useChangeAccountLevel();
  const [userData, setUserData] = useState(user.accountLevel)

  const sendRequest = async (newLevel) => {
      try {
        const requestBody = {
            query: `
            mutation ChangeAccountLevel($newAccountLevel: String!){
                changeAccountLevel(newAccountLevel: $newAccountLevel){
                  accountLevel
                }
              }
          `,
            variables: {
                newAccountLevel: newLevel,
            },
          };

          const {
            data : {data : {changeAccountLevel : {accountLevel}}}
          } = await axios.post(`${window.env.API_URL}/graphql`, requestBody, {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          });
          if (accountLevel) {
            dispatch(
                login({
                    token: user.token,
                    name: user.name,
                  accountLevel: accountLevel
                })
              );
              changeAccountLevel(accountLevel)
          }
      } catch (error) {
        console.log(error);
      }
  }
    return (
        <Container>
            <Header>{t('settings')}</Header>
            <AccountLevel account data={userData} onClick={setUserData} sendRequest={sendRequest}/>
            <PasswordChange user={user}/>
            <DeleteAccount user={user}/>
        </Container>
    )
}

export default Settings
