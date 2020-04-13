import React from "react";
import {
  AppBar as MuiAppBar,
  Toolbar,
  Typography,
} from "@material-ui/core";


export function AppBar(props) {
  return (
    <MuiAppBar position="static">
      <Toolbar>
        <Typography variant="h5" noWrap>
          Contacts
        </Typography>
      </Toolbar>
    </MuiAppBar>
  );
}
