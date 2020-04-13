import React from "react";
import { Box, Paper, Typography, TextField, Button } from "@material-ui/core";
import { useFormik } from "formik";
import { SIGNIN_ROUTE } from "./Signin";
import { InputContainer, AuthSwitcher } from "./components";
import { useSignup } from "../store";

export const SIGNUP_ROUTE = "/signup";

export function Signup(props) {
  const { history } = props;
  const signup = useSignup();
  const formik = useFormik({
    initialValues: {
      fullname: "",
      phoneNumber: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: signup,
  });

  return (
    <Box height={1} display="flex" justifyContent="center" alignItems="center">
      <Paper>
        <Box padding={4}>
          <Box display="flex" justifyContent="center">
            <Typography>Sign up</Typography>
          </Box>
          <InputContainer>
            <TextField
              name="fullname"
              placeholder="Full name"
              value={formik.values.username}
              onChange={formik.handleChange}
            />
          </InputContainer>
          <InputContainer>
            <TextField
              name="phoneNumber"
              placeholder="Phone number"
              value={formik.values.phoneNumber}
              onChange={formik.handleChange}
            />
          </InputContainer>
          <InputContainer>
            <TextField
              name="email"
              placeholder="Email"
              value={formik.values.email}
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
          <InputContainer>
            <TextField
              name="confirmPassword"
              placeholder="Confirm password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
            />
          </InputContainer>
          <Box display="flex" justifyContent="center" marginY={2}>
            <Button variant="contained" onClick={formik.handleSubmit}>
              Sign up
            </Button>
          </Box>
          <AuthSwitcher
            info="Have an account?"
            button="Sign in"
            disabled={formik.isSubmitting}
            onClick={() => history.push(SIGNIN_ROUTE)}
          />
        </Box>
      </Paper>
    </Box>
  );
}

export default Signup;
