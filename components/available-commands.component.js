import {
  Grid,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import SearchFieldComponent from "./search-field.component";
import CommandGuideComponent from "./command-guide.component";
import Info from "@mui/icons-material/Info";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import InfoRounded from "@mui/icons-material/InfoRounded";

async function getCommands(service) {
  const response = await axios.get(`/api/${service.name}/available-commands`, {
    params: { link: service.link },
  });
  return response.data;
}

function AvailableCommandsComponent({ service, setActiveCommand }) {
  const [commands, setCommands] = useState([]);
  const [description, setDescription] = useState("");
  const [filteredCommands, setFilteredCommands] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    (async () => {
      setLoading(true);
      if (!service) {
        return false;
      }
      const res = await getCommands(service);
      const commands = res.commands;
      setCommands(commands);
      if (res.description) {
        setDescription(res.description);
      }
      setFilteredCommands(commands);
      setLoading(false);
    })();
  }, [service]);
  if (!service) {
    return null;
  }
  return (
    <Grid item md={2}>
      <List dense>
        <ListSubheader disableSticky>
          <Typography variant="h5">
            {service.name}
            {description && (
              <CommandGuideComponent
                icon={<InfoOutlined />}
                description={description}
              />
            )}
          </Typography>
        </ListSubheader>
        <ListItem>
          <SearchFieldComponent
            onChange={(e) => {
              const filteredCommands = commands.filter((command) =>
                command.name.match(e.target.value)
              );
              setFilteredCommands(filteredCommands);
            }}
          />
        </ListItem>
        {loading && <LinearProgress color="secondary" />}
        {filteredCommands &&
          filteredCommands.map((command) => (
            <ListItem
              button
              key={command.name}
              onClick={() => {
                setActiveCommand({
                  service: service.name,
                  link: command.link,
                  name: command.name,
                  key: Math.random().toString(36).substring(7),
                });
              }}
            >
              <ListItemText>
                <Typography
                  variant="body2"
                  title={command.name}
                  key={command.name}
                >
                  {command.name}
                </Typography>
              </ListItemText>
            </ListItem>
          ))}
      </List>
    </Grid>
  );
}

export default AvailableCommandsComponent;
