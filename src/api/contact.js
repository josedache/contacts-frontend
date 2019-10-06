import Http from "./http";

const ENDPOINT = "/contact";

export const createContact = contact => Http.post(ENDPOINT, contact);

export const getContact = (page = 0, size = 200, sort = "asc") =>
  Http.get(ENDPOINT, {
    params: {
      page,
      size,
      sort
    }
  });

export const updateContact = (phoneNumber, contact) =>
  Http.put(ENDPOINT, contact, { params: { phoneNumber } });

export const deleteContact = uid =>
  Http.delete(ENDPOINT, { params: { uid } });

export const uploadImage = (image, username) =>
  Http.post(ENDPOINT, image, { params: { username } });
