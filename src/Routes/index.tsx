import { Route, Routes } from "react-router-dom";

import ContactList from "../modules/ContactData/ContactList";
import ContactForm from "../modules/ContactData/ContactForm";
import CasesGraph from "../modules/Graph";
import MapPage from "../modules/Map";
import PageNotFound from "../components/PageNotFound";
import DashBoard from "../modules/Dashboard";

const RoutePage = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<DashBoard />} />
        <Route path="/contact-list" element={<ContactList />} />
        <Route path="/contact-form" element={<ContactForm />} />
        <Route path="/chart" element={<CasesGraph />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
};

export default RoutePage;
