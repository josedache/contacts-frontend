import React from "react";
import PropTypes from "prop-types";
import { Modal, Fade, withStyles } from "@material-ui/core";

function ContactModal({ children, classes, open, backdropClick }) {
  return (
    <Modal
      closeAfterTransition
      open={open}
      className={classes.modal}
      onBackdropClick={backdropClick}
    >
      <Fade>{children}</Fade>
    </Modal>
  );
}

ContactModal.defaultProps = {
  backdropClick: () => {}
};

export default withStyles({
  modal: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
})(ContactModal);
