import React from "react";
import { ListItem, ListItemText, Typography } from "@mui/material";

function SidebarMenuItemComponent({ service, setService }) {
  return (
    <ListItem button onClick={() => setService(service)}>
      <ListItemText>
        <Typography noWrap>{service.name}</Typography>
      </ListItemText>
    </ListItem>
  );
}

export default SidebarMenuItemComponent;
