import React, { useState, memo, useEffect, useMemo } from "react";
import {
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Card,
  Avatar,
  makeStyles,
  Typography,
  IconButton,
} from "@material-ui/core";
import PhoneIcon from "@material-ui/icons/Phone";
import EmailIcon from "@material-ui/icons/Email";
import AddressIcon from "@material-ui/icons/LocationCity";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { EDIT_ROUTE } from "./ContactCreateEdit";
import { CONTACTS_ROUTE } from "./Contacts";
import { useSingleAppDispatch, useAppState } from "../store/config";
import { apiDeleteContact } from "../api/backend";
import { useIsDesktop } from "../utils/hooks";
import { useParams } from "react-router-dom";

export const CONTACT_DETAIL_ROUTE = "/details/:index";

export function ContactDetail(props) {
  const { closeDetailModal, openEditModal, contactIndex, history } = props;
  const classes = useStyle();
  const [isDeleting, setDeleting] = useState(false);
  const { index: paramIndex } = useParams();
  const isDesktop = useIsDesktop();
  const contacts = useAppState(({ contacts }) => contacts);
  const removeContact = useSingleAppDispatch("REMOVE_CONTACT");
  const contact = useMemo(
    () =>
      !isDesktop && paramIndex ? contacts[paramIndex] : contacts[contactIndex],
    [contactIndex, contacts, isDesktop, paramIndex]
  );

  /**
   * Route to Contact page -
   * when resized from mobile to desktop, or
   * when reloading on mobile and no contacts
   */
  useEffect(() => {
    if ((isDesktop && history) || (history && !contact)) {
      history.push(CONTACTS_ROUTE);
    }
  }, [contact, history, isDesktop]);

  const fullName = useMemo(() => {
    if (contact) {
      const { firstName, lastName } = contact;
      return `${firstName} ${lastName}`;
    }
    return "";
  }, [contact]);

  /**
   * when app is reloaded on mobile returning null
   * makes useEffect route to contact screen
   */
  if (!contact) {
    return null;
  }

  const Container = isDesktop ? Card : "div";

  function editContact(e) {
    isDesktop
      ? openEditModal(contactIndex)
      : history.push(EDIT_ROUTE.replace(":index", paramIndex));
  }

  function deleteContact() {
    // setDeleting(true);
    apiDeleteContact(contact.uid).then(
      () => {
        removeContact(contact.uid);
        if (isDesktop) {
          closeDetailModal();
        } else {
          history.push(CONTACTS_ROUTE);
        }
      },
      (err) => {
        console.log(err);
        // setDeleting(false);
      }
    );
  }

  return (
    <Container onClick={e => e.stopPropagation()}>
      <Grid container>
        <Grid
          item
          container
          direction="column"
          justify="center"
          alignItems="center"
          className={classes.contactImageContainer}
        >
          <IconButton
            className={[classes.actionIcon, classes.editIcon].join(" ")}
            onClick={editContact}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            className={[classes.actionIcon, classes.deleteIcon].join(" ")}
            onClick={deleteContact}
          >
            <DeleteIcon />
          </IconButton>
          <Avatar className={classes.contactAvater}>
            {fullName.charAt(0)}
          </Avatar>
          <Typography variant="h5" className={classes.name}>
            {fullName}
          </Typography>
        </Grid>
        <Grid item>
          <List>
            <ListItem>
              <ListItemIcon>
                <PhoneIcon />
              </ListItemIcon>
              <ListItemText primary={contact.phoneNumber} />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <EmailIcon />
              </ListItemIcon>
              <ListItemText primary={contact.email} />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <AddressIcon />
              </ListItemIcon>
              <ListItemText primary={contact.address} />
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </Container>
  );
}

const useStyle = makeStyles((theme) => ({
  contactImageContainer: {
    height: 200,
    backgroundColor: theme.palette.primary.main,
    position: "relative",
  },
  contactAvater: {
    margin: 10,
    width: 100,
    height: 100,
    ...theme.typography.h2,
  },
  name: {
    color: theme.palette.common.white,
  },
  actionIcon: {
    position: "absolute",
    top: 0,
    margin: theme.spacing(1),
    color: theme.palette.common.white,
  },
  editIcon: {
    right: 0,
  },
  deleteIcon: {
    left: 0,
    color: theme.palette.secondary.light,
  },
}));

export default memo(ContactDetail, () => true);
