import React, { useState, useEffect } from "react";
import { CircularProgress, Box } from "@material-ui/core";
import { Route, Redirect } from "react-router-dom";
import { Contacts, CONTACTS_ROUTE } from "../contact/Contacts";
import { ContactDetail, CONTACT_DETAIL_ROUTE } from "../contact/ContactDetail";
import {
  ContactCreateEdit,
  CREATE_ROUTE,
  EDIT_ROUTE,
} from "../contact/ContactCreateEdit";
import { Signin, SIGNIN_ROUTE } from "../auth/Signin";
import { Signup, SIGNUP_ROUTE } from "../auth/Signup";
import { ChangePassword, CHANGE_PASSWORD_ROUTE } from "../auth/ChangePassword";
import { ResetPassword, RESET_PASSWORD_ROUTE } from "../auth/ResetPassword";
import { useAppState } from "../store";
import { AppBar } from "./AppBar";

export function Navigator() {
  const [isLoading, setLoading] = useState(true);
  const token = useAppState(({ token }) => token);

  useEffect(() => {
    const timerID = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timerID);
  }, []);

  if (isLoading) {
    return (
      <Box
        height="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box height="100vh">
      {token ? (
        <React.Fragment>
          <AppBar />
          <Route exact path={CONTACTS_ROUTE} component={Contacts} />
          <Route path={CONTACT_DETAIL_ROUTE} component={ContactDetail} />
          <Route
            path={[CREATE_ROUTE, EDIT_ROUTE]}
            component={ContactCreateEdit}
          />
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Redirect from={CONTACTS_ROUTE} to={SIGNIN_ROUTE} />
          <Route path={SIGNIN_ROUTE} component={Signin} />
          <Route path={SIGNUP_ROUTE} component={Signup} />
          <Route path={RESET_PASSWORD_ROUTE} component={ResetPassword} />
          <Route path={CHANGE_PASSWORD_ROUTE} component={ChangePassword} />
        </React.Fragment>
      )}
    </Box>
  );
}

export default Navigator;
