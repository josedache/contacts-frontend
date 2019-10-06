import React from "react";
import PropTypes from "prop-types";
import {
  Button,
  List,
  ListItemIcon,
  ListItem,
  ListItemText,
  TextField,
  Grid,
  Card,
  CardContent,
  CardActions,
  useMediaQuery,
  makeStyles
} from "@material-ui/core";
import PhoneIcon from "@material-ui/icons/Phone";
import EmailIcon from "@material-ui/icons/Email";
import AddressIcon from "@material-ui/icons/LocationCity";
import NameIcon from "@material-ui/icons/Contacts";
import { Formik, Form } from "formik";
import { storeContact } from "../store/actions";
import { connect } from "react-redux";
import { object, string } from "yup";
import Contacts from "./Contacts";

function Create(props) {
  const isDesktop = useMediaQuery(theme =>
    theme.breakpoints.up(theme.breakpoints.values.sm)
  );
  const classes = useStyle();

  // when resized from mobile to desktop
  if (isDesktop && props.history) {
    props.history.replace(Contacts.routeName);
    return null;
  } else if (!isDesktop) {
    // when reloaded on mobile and path is edit
    if (props.match && !props.contacts.length && props.match.path === Create.routeName[1]) {
      props.history.replace(Contacts.routeName);
      return null;
      // when resized from desktop to mobile
    } else if (props.closeCreateEditModal) {
      props.closeCreateEditModal();
      return null;
    }
  }

  const Container = isDesktop ? Card : "div";

  const validationSchema = object({
    id: string().notRequired(),
    firstName: string().when("lastName", {
      is: undefined,
      then: string().required(),
      otherwise: string().notRequired()
    }),
    lastName: string(),
    phoneNumber: string().required(),
    email: string()
      .email()
      .nullable(true)
      .notRequired(),
    address: string()
      .nullable(true)
      .notRequired()
  });

  function createContact(values, actions) {
    props.storeContact(values).then(
      action =>
        isDesktop
          ? props.closeCreateEditModal()
          : props.history.push(Contacts.routeName),
      err => {
        console.log(err);
        actions.setSubmitting(false);
      }
    );
  }

  let initialValues = {
    uid: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    address: ""
  };

  if (isDesktop && props.contactIndex >= 0)
    initialValues = props.contacts[props.contactIndex];
  else if (!isDesktop && props.match)
    initialValues = props.contacts[props.match.params.index];

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={createContact}
      render={({
        values,
        errors,
        touched,
        isSubmitting,
        handleChange,
        handleBlur
      }) => (
        <Form>
          <Container>
            <CardContent>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <NameIcon />
                  </ListItemIcon>
                  <TextField
                    error={touched.firstName && errors.firstName ? true : false}
                    name="firstName"
                    label="First name"
                    variant="outlined"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.firstName || ""}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText inset>
                    <TextField
                      error={touched.lastName && errors.lastName ? true : false}
                      name="lastName"
                      label="Last name"
                      variant="outlined"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.lastName || ""}
                    />
                  </ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <PhoneIcon />
                  </ListItemIcon>
                  <TextField
                    error={
                      touched.phoneNumber && errors.phoneNumber ? true : false
                    }
                    name="phoneNumber"
                    label="Phone number"
                    variant="outlined"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.phoneNumber || ""}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <EmailIcon />
                  </ListItemIcon>
                  <TextField
                    error={touched.email && errors.email ? true : false}
                    name="email"
                    label="Email"
                    variant="outlined"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email || ""}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <AddressIcon />
                  </ListItemIcon>
                  <TextField
                    error={touched.address && errors.address ? true : false}
                    name="address"
                    variant="outlined"
                    label="Address"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.address || ""}
                  />
                </ListItem>
              </List>
            </CardContent>
            <CardActions className={classes.cardActions}>
              {isDesktop && (
                <Button
                  color="primary"
                  variant="text"
                  disabled={isSubmitting}
                  onClick={props.closeCreateEditModal}
                >
                  Cancel
                </Button>
              )}
              <Button
                variant="contained"
                type="submit"
                color="primary"
                disabled={isSubmitting}
              >
                Submit
              </Button>
            </CardActions>
          </Container>
        </Form>
      )}
    />
  );
}

const useStyle = makeStyles(theme => ({
  cardActions: {
    justifyContent: "flex-end"
  }
}));

Create.routeName = ["/create", "/edit/:index"];

Create.propTypes = {
  storeContact: PropTypes.func.isRequired
};

export default connect(
  ({ contacts }) => ({ contacts }),
  { storeContact }
)(Create);
