import React from "react";
import { Link, useLocation } from "react-router-dom";
import UserAccountDropdown from "./UserAccountDropdown";

const StudentHeader = () => {
  const location = useLocation(); // Lấy route hiện tại

  const getNavLinkClass = (path) => {
    return location.pathname === path
      ? "nav-link text-primary"
      : "nav-link text-dark";
  };

  return (
    <header className="bg-white shadow-sm sticky-top">
      <div className="container py-3 d-flex justify-content-between align-items-center">
        <Link to="/">
          <img
            src="https://hcmut.edu.vn/img/nhanDienThuongHieu/bk_name_en.png"
            alt="HCMUT_SSPS Logo"
            style={{ height: "50px" }}
          />
        </Link>
        <nav>
          <ul className="nav align-items-center">
            <li className="nav-item">
              <Link to="/" className={getNavLinkClass("/")}>
                Trang chủ
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/upload" className={getNavLinkClass("/upload")}>
                Tài liệu
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/history" className={getNavLinkClass("/history")}>
                Lịch sử
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/buy-pages" className={getNavLinkClass("/buy-pages")}>
                Mua thêm trang in
              </Link>
            </li>
            <li className="nav-item">
              <UserAccountDropdown />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default StudentHeader;
