import React from "react";
import { Box, BoxProps, Typography, Button } from "@material-ui/core";

/**
 *
 * @param {BoxProps} props
 */
export function InputContainer(props) {
  return (
    <Box
      display="flex"
      marginY={2}
      flexDirection="column"
      alignItems="stretch"
      {...props}
    />
  );
}



export function AuthSwitcher(props) {
  const { onClick, button, info, disabled } = props;
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      marginTop={2}
    >
      <Typography>{info}</Typography>
      <Button variant="text" onClick={onClick} disabled={disabled}>
        {button}
      </Button>
    </Box>
  );
}
