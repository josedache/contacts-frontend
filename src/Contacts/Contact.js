import React from "react";
import { Avatar } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import Row from "./Row";

function Contact(props) {
  const { firstName, lastName, email, address, phoneNumber } = props.data;
  const fullName = firstName ? firstName.concat(" ", lastName || "") : lastName;

  return (
    <div style={props.style}>
      <Row
        button
        isDesktop={props.isDesktop}
        image={() => <Avatar>{fullName.charAt(0)}</Avatar>}
        name={fullName}
        phoneNumber={phoneNumber}
        email={email}
        address={address}
        onClick={props.showDetail}
      />
    </div>
  );
}

Contact.propTypes = {
  // classes: PropTypes.object.isRequired
};

export default Contact;
