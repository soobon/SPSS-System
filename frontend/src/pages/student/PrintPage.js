import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Alert } from "react-bootstrap";
import StudentHeader from "../../components/common/StudentHeader";
import Footer from "../../components/common/Footer";
import PrintSettings from "../../components/student/PrintSettings";
import apiService from "../../services/api";

const PrintPage = () => {
  const navigate = useNavigate();
  const [printConfirmed, setPrintConfirmed] = useState(false);

  const handlePrintConfirm = (XXX) => {
    // console.log(XXX);
    apiService
      .sendPrintRequest(XXX)
      .then((res) => {
        setPrintConfirmed(true);
      })
      .catch((err) => {
        console.log(err);
        alert("Lỗi rồi!!!!");
      });
      apiService.sendMail();
  };
  const handleReset = () => {
    navigate("/");
  };
  return (
    <div className="d-flex flex-column min-vh-100">
      <StudentHeader />
      <main className="flex-grow-1 bg-light">
        <div className="container py-5">
          <h1 className="mb-4">In tài liệu</h1>

          <PrintSettings onPrintConfirm={handlePrintConfirm} />

          <div className="d-flex justify-content-between mt-4">
            <>
              <Button
                variant="outline-secondary"
                onClick={() => {
                  navigate("/upload");
                }}
              >
                Quay lại
              </Button>
              <Button
                variant="primary"
                form="print-settings-form"
                type="submit"
              >
                Xác nhận in
              </Button>
            </>
          </div>

          {printConfirmed && (
            <Alert variant="success" className="mt-4">
              <h4 className="alert-heading">Đã xác nhận in thành công!</h4>
              <p>Bạn đã gửi yêu cầu in thành công.</p>
              <hr />
              <Button variant="link" className="p-0 mt-3" onClick={handleReset}>
                Về trang chủ
              </Button>
            </Alert>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};
export default PrintPage;
