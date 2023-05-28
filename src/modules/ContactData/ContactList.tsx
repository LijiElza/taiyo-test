import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
// relative files
import ContactListItem from "./ContactListItem";
// constants
import { Contact, StateType } from "../../constants/types";
// helpers
import { deleteContact } from "../../state/action";
import NoDataFound from "../../components/NoDataFound";

const ContactList: React.FC = () => {
  const contacts = useSelector((state: StateType) => state?.contacts);
  const history = useNavigate();
  const dispatch = useDispatch();

  const handleEditContact = (contact: Contact) => {
    history("/contact-form", { state: { contact, isEdit: true } });
  };

  const handleDeleteContact = (contactId: string) => {
    dispatch(deleteContact(contactId));
  };

  return (
    <div className="px-6 pb-2 lg:px-8 ">
      <div className="flex justify-between mt-10">
        <h2 className="text-2xl font-bold mb-4">Contact List</h2>
        {contacts?.length > 0 && (
          <button
            className="bg-indigo-500 text-white px-4 py-2 rounded-md"
            onClick={() => {
              history("/contact-form");
            }}
          >
            Create Contact
          </button>
        )}
      </div>
      {contacts?.length > 0 ? (
        <div className=" grid space-y-4   md:grid-cols-4">
          {contacts?.map((contact: Contact, index: number) => (
            <ContactListItem
              key={index}
              contact={contact}
              handleDeleteContact={handleDeleteContact}
              handleEditContact={handleEditContact}
            />
          ))}
        </div>
      ) : (
        <NoDataFound />
      )}
    </div>
  );
};

export default ContactList;
