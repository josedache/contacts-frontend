import React from "react";
import { MuiThemeProvider, CssBaseline } from "@material-ui/core";
import theme from "./styles/theme";
import GlobalCss from "./styles/GlobalCss";
import Layout from "./Layout";
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <GlobalCss />
          <Layout />
        </MuiThemeProvider>
      </Router>
    </Provider>
  );
}

export default App;
