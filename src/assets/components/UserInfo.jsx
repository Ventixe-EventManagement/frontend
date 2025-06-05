import React from "react";

const UserInfo = () => {
  // Tillfällig hårdkodad användare – byt mot auth-data senare
  const user = {
    name: "Orlando Laurentius",
    role: "Admin",
  };

  return (
    <div className="user-info">
      <div className="user-avatar" />
      <div className="user-details">
        <strong>{user.name}</strong>
        <small>{user.role}</small>
      </div>
    </div>
  );
};

export default UserInfo;
