import React from "react";
import { MuiThemeProvider, CssBaseline } from "@material-ui/core";
import theme from "./theme";
import Navigator from "./navigator/Navigator";
import {StoreProvider} from './store'
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <StoreProvider>
      <Router>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <Navigator />
        </MuiThemeProvider>
      </Router>
    </StoreProvider>
  );
}

export default App;
