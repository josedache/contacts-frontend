import React from "react";
import { Avatar } from "@material-ui/core";
import Row from "./Row";
import {useIsDesktop} from '../utils/hooks'

function Contact(props) {
  const {data, showDetail, style} = props
  const { firstName, lastName, email, address, phoneNumber } = data;
  const fullName = firstName ? firstName.concat(" ", lastName || "") : lastName;

  return (
    <div style={style}>
      <Row
        button
        Image={() => <Avatar>{fullName.charAt(0)}</Avatar>}
        name={fullName}
        phoneNumber={phoneNumber}
        email={email}
        address={address}
        onClick={showDetail}
      />
    </div>
  );
}

export default Contact;
