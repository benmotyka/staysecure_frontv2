import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { useSelector } from "react-redux";
import { selectUser } from "features/userSlice";

import axios from "axios";
import isEmail from "validator/lib/isEmail";
import * as Yup from "yup";
import { useFormik } from "formik";

import {
  Container,
  Header,
  ErrorsWrapper,
  Error,
  SuccessText,
} from "./Cards.styles";
import Loader from "components/Loader/GlobalLoader";
import AccountLevel from "components/Account/Cards/Parts/AccountLevel";

import Button from "../Button/Button";
import { useTranslation } from "react-i18next";
import BasicInput from "components/BasicInput/BasicInput";
const Register = () => {
  const history = useHistory();
  const user = useSelector(selectUser);
  const { t, i18n } = useTranslation();

  const [accountLevel, setAccountLevel] = useState("basic");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (user) history.push("/");
  }, []);

  const onSubmit = (
    { email, name, password, passwordConfirmation },
    { setFieldError }
  ) => {
    if (password !== passwordConfirmation) {
      setFieldError("password", t("errors.passwordsMustMatch"));
      return;
    }
    window.grecaptcha.ready(() => {
      window.grecaptcha
        .execute("6LdJhwMbAAAAAP658oVQALS41aSkllNuOehb5SvW", {
          action: "submit",
        })
        .then(async (token) => {
          setLoading(true);
          const requestBody = {
            query: `
          mutation Register($email: String!, $password: String!, $name: String!, $captcha: String!, $accountLevel: String!, $language: String!){
            register(email: $email, password: $password, name: $name, captchaToken: $captcha, accountLevel: $accountLevel, language: $language) {
                email
            }
          }   
          `,
            variables: {
              email,
              password,
              name,
              captcha: token,
              accountLevel,
              language: i18n.language,
            },
          };
          try {
            const {
              data: {
                data: { register: response },
              },
            } = await axios.post(`${window.env.API_URL}/graphql`, requestBody);
            if (response) {
              setSuccess(true);
            } else {
              setFieldError("email", t("errors.userExists"));
            }
          } catch (error) {
            console.log(error);
          } finally {
            setLoading(false);
          }
        });
    });
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      password: "",
      passwordConfirmation: "",
    },
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: Yup.object({
      email: Yup.string()
        .email(t("errors.wrongEmailNamePassword"))
        .required(t("errors.wrongEmailNamePassword")),
      password: Yup.string()
        .required(t("errors.wrongEmailNamePassword"))
        .min(5, t("errors.wrongEmailNamePassword")),
      name: Yup.string()
        .required(t("errors.wrongEmailNamePassword"))
        .min(3, t("errors.wrongEmailNamePassword")),
    }),
    onSubmit,
  });

  return (
    <Container>
      {loading ? <Loader /> : null}
      {success ? (
        <SuccessText>
          {t("registerSuccessfulEmailSent")} {formik.values.email}
        </SuccessText>
      ) : (
        <>
          <Header>{t("register")}</Header>
          <BasicInput
            id="email"
            placeholder={t("email")}
            type="email"
            autocomplete="off"
            onChange={formik.handleChange}
            value={formik.values.email}
            onBlur={formik.handleBlur}
          />
          <BasicInput
            id="name"
            placeholder={t("userName")}
            autocomplete="off"
            onChange={formik.handleChange}
            value={formik.values.name}
            onBlur={formik.handleBlur}
          />
          <BasicInput
            id="password"
            placeholder={t("password")}
            type="password"
            autocomplete="off"
            onChange={formik.handleChange}
            value={formik.values.password}
            onBlur={formik.handleBlur}
          />
          <BasicInput
            id="passwordConfirmation"
            placeholder={t("confirmPassword")}
            type="password"
            autocomplete="off"
            onChange={formik.handleChange}
            value={formik.values.passwordConfirmation}
            onBlur={formik.handleBlur}
          />
          <AccountLevel small onClick={setAccountLevel} data={accountLevel} />
          <ErrorsWrapper>
            {formik.touched.email && formik.errors.email ? (
              <Error>{formik.errors.email}</Error>
            ) : formik.touched.name && formik.errors.name ? (
              <Error>{formik.errors.name}</Error>
            ) : formik.touched.password && formik.errors.password ? (
              <Error>{formik.errors.password}</Error>
            ) : null}
          </ErrorsWrapper>
          <Button onClick={formik.handleSubmit} text={t("register")} full />
        </>
      )}
    </Container>
  );
};

export default Register;
