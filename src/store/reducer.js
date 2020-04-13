import * as types from "./types";

export function reducer(state, { payload, type }) {
  switch (type) {
    case types.STORE_CONTACTS:
      return { ...state, contacts: payload };
    case types.STORE_CONTACT:
      return { ...state, contacts: store(payload, [...state.contacts]) };
    case types.REMOVE_CONTACT:
      return { ...state, contacts: remove(payload, [...state.contacts]) };
    case types.STORE_TOKEN:
      return { ...state, token: payload };
    default:
      return state;
  }
}

const store = (newContact, contacts) =>
  sort([...remove(newContact.uid, contacts), newContact]);
const sort = (contacts) => contacts;
const remove = (uid, contacts) =>
  contacts.filter((contact) => contact.uid !== uid);
