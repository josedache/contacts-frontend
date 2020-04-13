import React, { useCallback, useMemo, useEffect } from "react";
import {
  Button,
  List,
  ListItemIcon,
  ListItem,
  ListItemText,
  TextField,
  Card,
  CardContent,
  CardActions,
  Box,
} from "@material-ui/core";
import PhoneIcon from "@material-ui/icons/Phone";
import EmailIcon from "@material-ui/icons/Email";
import AddressIcon from "@material-ui/icons/LocationCity";
import NameIcon from "@material-ui/icons/Contacts";
import { useFormik } from "formik";
import { object, string } from "yup";
import { CONTACTS_ROUTE } from "./Contacts";
import { useSingleAppDispatch, useAppState } from "../store/config";
import { apiCreateContact } from "../api/backend";
import { useIsDesktop } from "../utils/hooks";
import { useParams } from "react-router-dom";

export const EDIT_ROUTE = "/edit/:index";
export const CREATE_ROUTE = "/create";

export function ContactCreateEdit(props) {
  const { history, contactIndex, closeModal } = props;
  const { index: paramIndex } = useParams();
  const isDesktop = useIsDesktop();
  const contacts = useAppState(({ contacts }) => contacts);
  const storeContact = useSingleAppDispatch("STORE_CONTACT");
  const contact = useMemo(
    () => (isDesktop ? contacts[contactIndex] : contacts[paramIndex]),
    [contactIndex, contacts, isDesktop, paramIndex]
  );
  const validationSchema = useMemo(
    () =>
      object({
        id: string().notRequired(),
        firstName: string().when("lastName", {
          is: undefined,
          then: string().required(),
          otherwise: string().notRequired(),
        }),
        lastName: string(),
        phoneNumber: string().required(),
        email: string().email().nullable(true).notRequired(),
        address: string().nullable(true).notRequired(),
      }),
    []
  );

  useEffect(() => {
    // TODO add path validation too
    // when resized from mobile to desktop
    // when reloading on mobile and no contacts
    if ((isDesktop && history) || (history && !contact)) {
      history.replace(CONTACTS_ROUTE);
    }
  }, [contact, history, isDesktop]);

  const createContact = useCallback(
    (values, actions) => {
      apiCreateContact(values).then(
        () => {
          storeContact(values);
          if (isDesktop) {
            props.closeCreateEditModal();
            return;
          }
          props.history.push(CONTACTS_ROUTE);
        },
        (err) => {
          console.log(err);
          actions.setSubmitting(false);
        }
      );
    },
    [isDesktop, props, storeContact]
  );

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      uid: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      address: "",
      ...contact,
    },
    validationSchema: validationSchema,
    onSubmit: createContact,
  });

  // when resized from mobile to desktop
  // if (isDesktop && props.history) {
  //   props.history.replace(Contacts.routeName);
  //   return null;
  // } else if (!isDesktop) {
  //   // when reloaded on mobile and path is edit
  //   if (
  //     props.match &&
  //     !props.contacts.length &&
  //     props.match.path === Create.routeName[1]
  //   ) {
  //     props.history.replace(Contacts.routeName);
  //     return null;
  //     // when resized from desktop to mobile
  //   }
  //   else if (props.closeCreateEditModal) {
  //     props.closeCreateEditModal();
  //     return null;
  //   }
  // }

  const Container = isDesktop ? Card : "div";

  return (
    <Container onClick={(e) => e.stopPropagation()}>
      <CardContent>
        <List>
          <ListItem>
            <ListItemIcon>
              <NameIcon />
            </ListItemIcon>
            <TextField
              error={
                formik.touched.firstName && formik.errors.firstName
                  ? true
                  : false
              }
              name="firstName"
              label="First name"
              variant="outlined"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.firstName}
            />
          </ListItem>
          <ListItem>
            <ListItemText inset>
              <TextField
                error={
                  formik.touched.lastName && formik.errors.lastName
                    ? true
                    : false
                }
                name="lastName"
                label="Last name"
                variant="outlined"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lastName}
              />
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <PhoneIcon />
            </ListItemIcon>
            <TextField
              error={
                formik.touched.phoneNumber && formik.errors.phoneNumber
                  ? true
                  : false
              }
              name="phoneNumber"
              label="Phone number"
              variant="outlined"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phoneNumber}
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <EmailIcon />
            </ListItemIcon>
            <TextField
              error={formik.touched.email && formik.errors.email ? true : false}
              name="email"
              label="Email"
              variant="outlined"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <AddressIcon />
            </ListItemIcon>
            <TextField
              error={
                formik.touched.address && formik.errors.address ? true : false
              }
              name="address"
              variant="outlined"
              label="Address"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.address}
            />
          </ListItem>
        </List>
      </CardContent>
      <Box>
        <CardActions>
          {isDesktop && (
            <Button
              color="primary"
              variant="text"
              disabled={formik.isSubmitting}
              onClick={closeModal}
            >
              Cancel
            </Button>
          )}
          <Button
            variant="contained"
            type="submit"
            color="primary"
            disabled={formik.isSubmitting}
          >
            Submit
          </Button>
        </CardActions>
      </Box>
    </Container>
  );
}

export default ContactCreateEdit;
