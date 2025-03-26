import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, LogOut } from "react-feather";

const UserAccountDropdown = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();

  };
  return (
    <div className="dropdown">
      <button
        className="btn btn-link text-dark dropdown-toggle d-flex align-items-center"
        type="button"
        onClick={toggleDropdown}
      >
        <User size={18} className="me-2" />
      </button>
      <ul className={`dropdown-menu${isOpen ? " show" : ""}`}>
        <li>
          <Link to="/account" className="dropdown-item">
            <User size={18} className="me-2" />
            Thông tin tài khoản
          </Link>
        </li>
        <li>
          <hr className="dropdown-divider" />
        </li>
        <li>
          <Link
            to="#"
            className="dropdown-item text-danger"
            onClick={() => handleLogout()}
          >
            <LogOut size={18} className="me-2" />
            Đăng xuất
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default UserAccountDropdown;
