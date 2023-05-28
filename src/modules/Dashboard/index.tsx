import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// relative files
import CasesGraph from "../Graph";
import MapPage from "../Map";
import ContactListItem from "../ContactData/ContactListItem";
// constans
import { Contact, StateType } from "../../constants/types";

const DashBoard = () => {
  const navigate = useNavigate();
  const contacts = useSelector((state: StateType) => state.contacts);

  return (
    <div>
      <div className="grid mb-10  md:grid-cols-1 lg:grid-cols-2">
        <div className="md:mr-4 ">
          <CasesGraph height="41vh" />
        </div>
        <div className="md:mr-4 sm:mt-4 md:mt-0">
          <MapPage height="42vh" />
        </div>
      </div>
      {contacts?.length > 0 && (
        <>
          <div className="flex mt-10 justify-between">
            <h2 className="text-2xl font-bold mb-4">Contact List</h2>
            <span
              className="text-indigo-500 cursor-pointer"
              onClick={() => {
                navigate("/contact-list");
              }}
            >
              View All
            </span>
          </div>
          <div className=" mb-4 grid space-y-4   md:grid-cols-4">
            {contacts.slice(0, 4)?.map((contact: Contact, index) => (
              <ContactListItem
                contact={contact}
                hideAction={true}
                key={index}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default DashBoard;
