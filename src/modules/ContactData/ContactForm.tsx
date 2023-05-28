import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { v4 as uuid } from "uuid";
import { useLocation, useNavigate } from "react-router-dom";
// constants
import { ContactFormState } from "../../constants/types";
// helpers
import { addContact, updateContact } from "../../state/action";
// css
import "react-toastify/dist/ReactToastify.css";

const ContactForm: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const initialState: ContactFormState = location?.state?.contact || {
    firstName: "",
    lastName: "",
    status: "",
  };

  const [formState, setFormState] = useState<ContactFormState>(initialState);

  const dispatch = useDispatch();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (location.state?.isEdit) {
      // Perform update action
      const updatedContact = { id: location.state.id, ...formState };
      dispatch(updateContact(updatedContact));
      toast.success("Contact updated successfully!", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      navigate("/contact-list");
    } else {
      // Perform create action
      const newContact = { id: uuid(), ...formState };
      dispatch(addContact(newContact));
      toast.success("Contact added successfully!", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
    setFormState({
      firstName: "",
      lastName: "",
      status: "",
    });
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 pb-2 lg:px-8 ">
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm  border border-gray-100 rounded-lg shadow-md">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Create Contact Screen
            </h2>
          </div>

          <form className="space-y-6  p-4" onSubmit={handleSubmit}>
            <div className="relative">
              <label className="leading-7 text-sm text-gray-600">
                First Name:
              </label>
              <input
                type="text"
                name="firstName"
                value={formState.firstName}
                onChange={handleInputChange}
                required
                className="w-full bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>

            <div>
              <div className="relative">
                <label className="leading-7 text-sm text-gray-600">
                  Last Name:
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formState.lastName}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>

            <div className="p-2 w-full">
              <div className="relative">
                <label className="leading-7 text-sm text-gray-600 mr-3">
                  Status:
                </label>
                <div className="flex items-center mb-4">
                  <input
                    id="default-radio-1"
                    type="radio"
                    name="status"
                    value="active"
                    required
                    checked={formState.status === "active"}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor="default-radio-1"
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Active
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="default-radio-2"
                    type="radio"
                    name="status"
                    value="inactive"
                    checked={formState.status === "inactive"}
                    onChange={handleInputChange}
                    required
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor="default-radio-2"
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    In Active
                  </label>
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {location?.state?.isEdit
                  ? "Save Edited Contact"
                  : "Save Contact"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ContactForm;
