import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";

function NavbarComponent() {
  return (
    <AppBar position="sticky">
      <Toolbar variant="dense">
        <Typography variant="h6" className="bold">
          Boto3 Builder
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default NavbarComponent;
