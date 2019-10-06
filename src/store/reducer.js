import * as types from "./types";

const initialState = {
  contacts: []
};

function reducer(state = initialState, { payload, type }) {
  switch (type) {
    case types.STORE_CONTACTS:
      return { ...state, contacts: payload };
    case types.STORE_CONTACT:
      return { ...state, contacts: store(payload, [...state.contacts]) };
    case types.REMOVE_CONTACT:
      return { ...state, contacts: remove(payload, [...state.contacts]) };
    default:
      return state;
  }
}

const store = (newContact, contacts) =>
  sort([...remove(newContact.uid, contacts), newContact]);
const sort = contacts => contacts;
const remove = (uid, contacts) =>
  contacts.filter(contact => contact.uid !== uid);

export default reducer;
