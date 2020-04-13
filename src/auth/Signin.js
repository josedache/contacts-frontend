import React from "react";
import { Box, Paper, Typography, TextField, Button } from "@material-ui/core";
import { useFormik } from "formik";
import { SIGNUP_ROUTE } from "./Signup";
import { InputContainer, AuthSwitcher } from "./components";
import { useSignin } from "../store";
import { CONTACTS_ROUTE } from "../contact/Contacts";

export const SIGNIN_ROUTE = "/signin";

export function Signin(props) {
  const { history } = props;
  const signin = useSignin();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: (user, { setSubmitting }) => {
      signin(user).then(() => {
        // setSubmitting(false);
        history.replace(CONTACTS_ROUTE);
      });
    },
  });

  return (
    <Box height={1} display="flex" justifyContent="center" alignItems="center">
      <Paper>
        <Box padding={4}>
          <Box display="flex" justifyContent="center">
            <Typography>Sign in</Typography>
          </Box>
          <InputContainer>
            <TextField
              name="username"
              placeholder="Username"
              value={formik.values.username}
              onChange={formik.handleChange}
            />
          </InputContainer>
          <InputContainer>
            <TextField
              name="password"
              placeholder="Password"
              value={formik.values.password}
              onChange={formik.handleChange}
            />
          </InputContainer>
          <Box display="flex" justifyContent="space-between" marginY={2}>
            <Button variant="text">Forgot Password</Button>
            <Button variant="contained" onClick={formik.handleSubmit}>
              Sign in
            </Button>
          </Box>
          <AuthSwitcher
            info="Don't Have an account?"
            button="Signup instead"
            disabled={formik.isSubmitting}
            onClick={() => history.push(SIGNUP_ROUTE)}
          />
        </Box>
      </Paper>
    </Box>
  );
}

export default Signin;
