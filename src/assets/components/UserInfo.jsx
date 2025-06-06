import React from "react";
import { useAuth } from "../contexts/AuthContext";

const UserInfo = () => {
  const { user } = useAuth();

  if (!user) {
    return null; // eller visa "Gäst" eller laddar...
  }

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
