import Avatar from "../../components/Avatar";

const ContactListItem = ({
  contact,
  handleEditContact,
  handleDeleteContact,
  hideAction,
}: any) => {
  return (
    <>
      <div className=" mt-4 mr-4 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="flex justify-end px-4 pt-4"></div>
        <div className="flex flex-col items-center pb-5">
          <Avatar />
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            {contact?.firstName} {contact?.lastName}
          </h5>
          <span className="text-sm text-gray-500 dark:text-gray-400 ">
            {contact.status === "active" ? (
              <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                {contact.status}
              </span>
            ) : (
              <span className="bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
                {contact.status}
              </span>
            )}
          </span>
          {!hideAction && (
            <div className="flex mt-4 space-x-3 md:mt-6 ">
              <button
                onClick={() => handleEditContact?.(contact)}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteContact?.(contact.id)}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ContactListItem;
