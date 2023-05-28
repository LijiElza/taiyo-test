import { actionTypes } from "../constants/reduxActionTypes";
import { Contact } from "../constants/types";

// Define the initial state
const initialState: { contacts: Contact[] | [] } = {
  contacts: [],
};

// Define the reducer function
const contactsReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case actionTypes?.ADD_CONTACT:
      return {
        ...state,
        contacts: [...state.contacts, action.payload],
      };

    case actionTypes?.UPDATE_CONTACTS:
      const updatedContact = action.payload;

      const updatedContactList = state.contacts.map((contact: Contact) =>
        contact.id === updatedContact.id ? updatedContact : contact
      );

      return {
        ...state,
        contacts: updatedContactList,
      };

    case actionTypes?.DELETE_CONTACT:
      const updatedContacts = state.contacts.filter(
        (contact: any) => contact?.id !== action.payload
      );

      return {
        ...state,
        contacts: updatedContacts,
      };

    default:
      return state;
  }
};

export default contactsReducer;
