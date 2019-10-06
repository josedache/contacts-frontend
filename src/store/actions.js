import * as types from "./types";
import * as api_contact from "../api/contact";

export const getContact = (page, size) => dispatch =>
  api_contact
    .getContact(page, size)
    .then(({ data }) =>
      dispatch({ type: types.STORE_CONTACTS, payload: data.content })
    );

export const storeContact = contact => dispatch =>
  api_contact
    .createContact(contact)
    .then(() => dispatch({ type: types.STORE_CONTACT, payload: contact }));

export const deleteContact = uid => dispatch =>
  api_contact
    .deleteContact(uid)
    .then(() => dispatch({ type: types.REMOVE_CONTACT, payload: uid }));
// export const uploadContactImage = ()
