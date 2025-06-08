import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Grid,
  LinearProgress,
  TextField,
  Typography,
} from "@mui/material";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Alert from "@mui/material/Alert";
import axios from "axios";
import React, { useEffect, useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { monokai as codeStyle } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import CommandGuideComponent from "./command-guide.component";
import CloseControlComponent from "./close-control.component";
import CopyControlComponent from "./copy-control.component";
import SelectHighlightLanguageComponent from "./select-highligh-language.component";

async function getCommandDetail(service, command, link) {
  const response = await axios.get(`/api/${service}/command/${command}`, {
    params: { link: link },
  });
  return response.data;
}

async function runCommand(command) {
  const response = await axios.post(
    "/api/cli/execute",
    command.replace(/\n/g, " "),
    {
      headers: {
        "Content-Type": "text/plain",
      },
    }
  );
  if (typeof response.data === "number") {
    return String(response.data);
  }
  return response.data;
}

function createTextToCopy(userCommand, userOutput, highlightLanguage) {
  return userCommand;
  // let outputText;
  // if (typeof userOutput === "object") {
  //   outputText = JSON.stringify(userOutput, null, 2);
  // } else {
  //   outputText = userOutput;
  // }
  // const wrapCodeString = "```";
  // return [
  //   wrapCodeString,
  //   userCommand.replace(/\n/g, " \\\n"),
  //   wrapCodeString + "\n",
  //   wrapCodeString + highlightLanguage,
  //   outputText,
  //   wrapCodeString,
  // ].join("\n");
}

function CommandComponent({ command, deleteCommand }) {
  const [userCommand, setUserCommand] = useState("");
  const [userOutput, setUserOutput] = useState("");
  const [userError, setUserError] = useState("");
  const [highlightLanguage, setHighlightLanguage] = useState("");
  const [textToCopy, setTextToCopy] = useState("");
  const [descriptionMarkdown, setDescriptionMarkdown] = useState("");
  const [optionsMarkdown, setOptionsMarkdown] = useState("");
  const [examplesMarkdown, setExamplesMarkdown] = useState("");
  const [outputMarkdown, setOutputMarkdown] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const commandDetail = await getCommandDetail(
          command.service,
          command.name,
          command.link
        );
        setUserCommand(`${commandDetail.synopsis}`);
        setDescriptionMarkdown(commandDetail.description);
        setOptionsMarkdown(commandDetail.options);
        setExamplesMarkdown(commandDetail.examples);
        setOutputMarkdown(commandDetail.output);
      } catch (err) {
        setUserError(err.message);
      }
      setLoading(false);
    })();
  }, []);
  useEffect(() => {
    setTextToCopy(createTextToCopy(userCommand, userOutput, highlightLanguage));
  }, [userCommand, userOutput, highlightLanguage]);
  return (
    <Accordion square TransitionProps={{ timeout: 100 }}>
      <AccordionSummary expandIcon={<ExpandMore />} className="break-all">
        <CloseControlComponent
          onClick={(e) => {
            e.stopPropagation();
            deleteCommand(command.key);
          }}
        />
        <CopyControlComponent textToCopy={textToCopy} />
        {command.service} - {command.name}
      </AccordionSummary>
      <AccordionDetails>
        <Grid container>
          <Grid item xs={12} className="mb-2">
            {descriptionMarkdown && (
              <CommandGuideComponent
                title="Description"
                description={descriptionMarkdown}
              />
            )}
            {optionsMarkdown && (
              <CommandGuideComponent
                title="Options"
                description={optionsMarkdown}
              />
            )}
            {examplesMarkdown && (
              <CommandGuideComponent
                title="Examples"
                description={examplesMarkdown}
              />
            )}
            {outputMarkdown && (
              <CommandGuideComponent
                title="Output"
                description={outputMarkdown}
              />
            )}
          </Grid>
          <Grid item xs={12} className="mb-2">
            <TextField
              fullWidth
              defaultValue={userCommand}
              multiline
              margin="normal"
              onChange={(e) => setUserCommand(e.target.value)}
            />
            {loading && <LinearProgress color="secondary" />}
          </Grid>
          <Grid item xs={12}>
            {userError && (
              <Alert severity="error">
                <pre className="pre-wrap m-0">{userError}</pre>
              </Alert>
            )}
            {userOutput && (
              <>
                <SelectHighlightLanguageComponent
                  language={highlightLanguage}
                  onChange={(e) => setHighlightLanguage(e.target.value)}
                />
                <SyntaxHighlighter
                  language={highlightLanguage}
                  style={codeStyle}
                >
                  {typeof userOutput === "object"
                    ? JSON.stringify(userOutput, null, 2)
                    : userOutput}
                </SyntaxHighlighter>
              </>
            )}
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
}

export default CommandComponent;
