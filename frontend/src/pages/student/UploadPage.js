import React from "react";
import StudentHeader from "../../components/common/StudentHeader";
import Footer from "../../components/common/Footer";
import UploadDocument from "../../components/student/UploadDocument";
import ListDocument from "../../components/student/ListDocument";

const UploadPrintPage = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <StudentHeader />
      <main className="flex-grow-1 bg-light">
        <div className="container py-5">
          <h1 className="mb-0">Tải lên</h1>
          <UploadDocument />
        </div>
        <div className="container py-1">
          <h1 className="mb-4">Tài liệu đã tải lên</h1>
          <ListDocument />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default UploadPrintPage;
