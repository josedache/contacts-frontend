import React from "react";
import { Backdrop, Box } from "@material-ui/core";

export const ContactBackdrop = (props) => {
  const { children, open, onClick } = props;
  return (
    <Box zIndex="drawer" clone>
      <Backdrop
        open={open}
        onClick={onClick}
      >
        <div>{children}</div>
      </Backdrop>
    </Box>
  );
};

ContactBackdrop.defaultProps = {
  onClick: () => {},
};

export default ContactBackdrop;
