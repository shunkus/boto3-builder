import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";

function NavbarComponent() {
  return (
    <AppBar position="sticky">
      <Toolbar variant="dense">
        <Typography variant="h6" id="logo">
          Boto3 Builder
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default NavbarComponent;
