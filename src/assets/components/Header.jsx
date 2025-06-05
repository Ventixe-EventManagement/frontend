import React from "react";
import Breadcrumb from "./Breadcrumb";
import UserInfo from "./UserInfo";

const Header = () => {
  return (
    <header className="page-header">
      <div className="breadcrumb-wrapper">
        <Breadcrumb />
      </div>
      <UserInfo />
    </header>
  );
};

export default Header;
