import React, { useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { ShoppingCart } from "react-feather";
import StudentHeader from "../../components/common/StudentHeader";
import Footer from "../../components/common/Footer";
import apiService from "../../services/api";

const BuyPagesPage = () => {
  const [pagesToBuy, setPagesToBuy] = useState(10);
  const [paymentMethod] = useState("BKPay");
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handlePurchase = (e) => {
    e.preventDefault();
    apiService
      .updatePageAfterBuy(localStorage.getItem("id"), pagesToBuy)
      .then((res) => {
        console.log(res);
        setShowConfirmation(true);
        if (res.data) {
          window.location.href = res.data; // Chuyển hướng đến URL thanh toán
        } else {
          alert("Không nhận được URL thanh toán!");
        }
      })
      .catch(() => {
        alert("Lỗi ròi !!!!!!!!!");
      });
};

  return (
    <div className="d-flex flex-column min-vh-100">
      <StudentHeader />
      <main className="flex-grow-1 bg-light">
        <div className="container py-5">
          <h1 className="mb-4">Mua thêm trang in</h1>
          <Card className="shadow-sm">
            <Card.Body>
              <Form onSubmit={handlePurchase}>
                <Form.Group className="mb-3">
                  <Form.Label>Số lượng trang muốn mua (A4)</Form.Label>
                  <Form.Control
                    type="number"
                    value={pagesToBuy}
                    onChange={(e) => setPagesToBuy(parseInt(e.target.value))}
                    min="1"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Tương đương số trang A3</Form.Label>
                  <Form.Control
                    type="text"
                    value={Math.floor(pagesToBuy / 2)}
                    readOnly
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Tổng chi phí</Form.Label>
                  <Form.Control
                    type="text"
                    value={`${pagesToBuy * 500} VND`}
                    readOnly
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Phương thức thanh toán</Form.Label>
                  <Form.Select value={paymentMethod}>
                    <option value="BKPay">BKPay</option>
                  </Form.Select>
                </Form.Group>
                <div className="d-flex justify-content-end">
                  <Button variant="primary" type="submit">
                    <ShoppingCart className="me-2" />
                    Thanh toán
                  </Button>
                </div>
              </Form>
              {showConfirmation && (
                <Alert variant="success" className="mt-3">
                  <Alert.Heading>Thanh toán thành công!</Alert.Heading>
                  <p>
                    Bạn đã mua thêm {pagesToBuy} trang A4. Số dư mới của bạn sẽ
                    được cập nhật trong vài phút.
                  </p>
                </Alert>
              )}
            </Card.Body>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BuyPagesPage;
