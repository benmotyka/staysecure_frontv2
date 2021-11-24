import React, { useEffect, useRef, useState } from "react";
import Browser from "../../Browser/Browser.js";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-github";

import {Container, Wrapper, CodeWrapper, CodeHeaderContainer, CodeHeader, CodeIcon, PageBody} from './Styles.js'

const SqlInteractive = (props) => {
  const [search, setSearch] = useState("");
  const aceEditor = useRef(null);

  useEffect(() => {
    props.setWaitForCorrectAnswer(true);
  }, []);


const code = `
searchItem: async (args, req) => {
  await validateCaptcha(args.captchaToken);

  const search = '${search}'
  const sql = "SELECT * FROM products p where p.name = ${search}"
  const result = await sequelize.query(sql, {
    plain: false,
    raw: true,
    type: QueryTypes.SELECT
  });
  
  return result;
},
`;
  return (
    <Container>
      <Wrapper>
        <Browser>
          <PageBody>
            <h1>Sklep internetowy</h1>
            <label for="input">Wpisz nazwę produktu aby wyszukać:</label>
            <input
              name="input"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
            <br />
            <button
              onClick={() => {
                if (search.match(/' or \d+=\d+ --/gi))
                  props.setWaitForCorrectAnswer(false);
                else props.setWaitForCorrectAnswer(true);
              }}
            >
              Wyszukaj
            </button>
          </PageBody>
        </Browser>
      </Wrapper>
      <CodeWrapper>
              <CodeHeaderContainer>
              <CodeIcon/> <CodeHeader>Kod źródłowy aplikacji serwerowej</CodeHeader> 
              </CodeHeaderContainer>
              <AceEditor
          mode="javascript"
          ref={aceEditor}
          height={400}
          width={1000}
          theme="github"
          value={code}
          fontSize={18}
          wrapEnabled={true}
          readOnly
        />
      </CodeWrapper>

    </Container>
  );
};

export default SqlInteractive;
