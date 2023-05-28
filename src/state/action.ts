import { actionTypes } from "../constants/reduxActionTypes";
import { Contact } from "../constants/types";

export const addContact = (contact: Contact) => {
  return {
    type: actionTypes?.ADD_CONTACT,
    payload: contact,
  };
};

export const deleteContact = (contactId: string) => {
  return {
    type: actionTypes?.DELETE_CONTACT,
    payload: contactId,
  };
};

export const updateContact = (contact: Contact) => {
  return {
    type: actionTypes?.UPDATE_CONTACTS,
    payload: contact,
  };
};
