import React, { useState } from "react";
import {
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemIcon,
  Card,
  Avatar,
  makeStyles,
  Typography,
  CircularProgress,
  IconButton,
  useMediaQuery
} from "@material-ui/core";
import PhoneIcon from "@material-ui/icons/Phone";
import EmailIcon from "@material-ui/icons/Email";
import AddressIcon from "@material-ui/icons/LocationCity";
import NameIcon from "@material-ui/icons/Contacts";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import CreateEdit from "./CreateEdit";
import { connect } from "react-redux";
import Contacts from "./Contacts";
import ContactModal from "./Modal";
import { deleteContact } from "../store/actions";

function Details({
  contacts,
  deleteContact,
  setDetailModal,
  openEditModal,
  contactIndex,
  match,
  history
}) {
  const classes = useStyle();
  const [isDeleting, setDeleting] = useState(false);
  const isDesktop = useMediaQuery(theme =>
    theme.breakpoints.up(theme.breakpoints.values.sm)
  );

  // when resized from mobile to desktop
  if (isDesktop && history) {
    history.replace(Contacts.routeName);
    return null;
  } else if (isDesktop && !contacts.length) {
    setDetailModal(false);
    return null;
  } else if (!isDesktop) {
    // when reloaded on mobile
    if (!contacts.length) {
      history.replace(Contacts.routeName);
      return null;
    }
    // when resized from desktop to mobile
    else if (setDetailModal) {
      setDetailModal(false);
      return null;
    }
  }

  const Container = isDesktop ? Card : "div";

  const contact = isDesktop
    ? contacts[contactIndex]
    : contacts[match.params.index];
  const fullName = contact.firstName
    ? contact.firstName.concat(" ", contact.lastName || "")
    : contact.lastName;

  function editContact() {
    isDesktop
      ? openEditModal(contactIndex)
      : history.push(
          CreateEdit.routeName[1].replace(":index", match.params.index)
        );
  }

  function removeContact() {
    // setDeleting(true);
    deleteContact(contact.uid).then(
      () => {
        if (isDesktop) {
          setDetailModal(false);
        } else {
          history.push(Contacts.routeName);
        }
      },
      err => {
        console.log(err);
        // setDeleting(false);
      }
    );
  }

  return (
    <Container>
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
            onClick={removeContact}
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
      {/* <CircularProgress /> */}
    </Container>
  );
}

const useStyle = makeStyles(theme => ({
  contactImageContainer: {
    height: 200,
    backgroundColor: theme.palette.primary.main,
    position: "relative"
  },
  contactAvater: {
    margin: 10,
    width: 100,
    height: 100,
    ...theme.typography.h2
  },
  name: {
    color: theme.palette.common.white
  },
  actionIcon: {
    position: "absolute",
    top: 0,
    margin: theme.spacing(1),
    color: theme.palette.common.white
  },
  editIcon: {
    right: 0
  },
  deleteIcon: {
    left: 0,
    color: theme.palette.secondary.light
  }
}));

Details.routeName = "/details/:index";

const mapStateToProps = ({ contacts }) => ({ contacts });

export default connect(
  mapStateToProps,
  { deleteContact }
)(Details);
