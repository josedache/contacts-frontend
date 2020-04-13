import Http from "../utils/http";

const USER_BASE_ENDPOINT = "/user";
const CONTACT_BASE_ENDPOINT = "/contacts";

export const endpoint = {
  SIGN_IN: `${USER_BASE_ENDPOINT}/sign-in`,
  SIGN_UP: `${USER_BASE_ENDPOINT}/sign-up`,
  UPDATE_PROFILE: `${USER_BASE_ENDPOINT}/update-profile`,
  GET_CONTACTS: `${CONTACT_BASE_ENDPOINT}`,
  CREATE_CONTACT: `${CONTACT_BASE_ENDPOINT}`,
  UPDATE_CONTACT: `${CONTACT_BASE_ENDPOINT}`,
  DELETE_CONTACT: `${CONTACT_BASE_ENDPOINT}`,
};

// user
export const apiSignin = user => Http.post(endpoint.SIGN_IN, user);
export const apiSignup = user => Http.post(endpoint.SIGN_UP, user)

// contacts
export const apiCreateContact = (contact) =>
  Http.post(endpoint.CREATE_CONTACT, contact);

export const apiGetContacts = (page = 0, size = 200, sort = "asc") =>
  Http.get(endpoint.GET_CONTACTS, {
    params: {
      page,
      size,
      sort,
    },
  });

export const apiUpdateContact = (phoneNumber, contact) =>
  Http.put(endpoint.UPDATE_CONTACT, contact, { params: { phoneNumber } });

export const apiDeleteContact = (uid) =>
  Http.delete(endpoint.DELETE_CONTACT, { params: { uid } });

export const apiUploadImage = (image, username) =>
  Http.post(endpoint.UPDATE_CONTACT, image, { params: { username } });
