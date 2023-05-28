import React from "react";
import SideBar from "./components/SideBar";
import RoutePage from "./Routes";

const Home: React.FC = () => {
  return (
    <div>
      <SideBar />
      <div className="sm:ml-64 p-4">
        <RoutePage />
      </div>
    </div>
  );
};

export default Home;
