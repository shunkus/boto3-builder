import { Grid } from "@mui/material";
import Head from "next/head";
import { useState } from "react";
import AvailableCommandsComponent from "../components/available-commands.component";
import CommandComponent from "../components/command.component";
import NavbarComponent from "../components/navbar.component";
import SidebarComponent from "../components/sidebar.component";

function Index() {
  const [service, setService] = useState();
  const [activeCommands, setActiveCommands] = useState([]);
  return (
    <div>
      <Head>
        <title>Boto3 Builder</title>
      </Head>
      <NavbarComponent />
      <Grid container>
        <SidebarComponent setService={setService} />
        <AvailableCommandsComponent
          service={service}
          setActiveCommand={(command) => {
            const commands = [command, ...activeCommands];
            setActiveCommands(commands);
          }}
        />
        <Grid item md={8}>
          {activeCommands &&
            activeCommands.map((command) => (
              <CommandComponent
                key={command.key}
                command={command}
                deleteCommand={(key) => {
                  const commands = activeCommands.filter(
                    (command) => command.key !== key
                  );
                  setActiveCommands(commands);
                }}
              />
            ))}
        </Grid>
      </Grid>
    </div>
  );
}

export default Index;
