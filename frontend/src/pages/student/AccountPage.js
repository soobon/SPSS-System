import React, { useEffect, useState } from "react";
import { Card, Row, Col, ListGroup } from "react-bootstrap";
import { User, Mail, Book, Printer } from "react-feather";
import StudentHeader from "../../components/common/StudentHeader";
import Footer from "../../components/common/Footer";
import apiService from "../../services/api";

const AccountPage = () => {
  const userId = localStorage.getItem("id");

  // Mock user data
  const [user, setUser] = useState({
    name: "",
    email: "",
    studentId: "",
    faculty: "",
    remainingPages: { A4: 0, A3: 0 },
  });

  useEffect(() => {
    apiService
      .getInfo(userId)
      .then((response) => {
        console.log(response.data);
        let newUser = {};
        newUser.name = response.data.name;
        newUser.email = response.data.email;
        newUser.studentId = response.data.id;
        newUser.faculty = response.data.faculty;
        setUser(newUser);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });

    apiService.getStatistic(userId, 1).then((response) => {
      console.log(response.data);
      setUser((prev) => ({
        ...prev,
        remainingPages: {
          A4: response.data.nb_of_page_left,
          A3: response.data.nb_of_page_left / 2,
        },
      }));
    });
  }, []);

  return (
    <div className="d-flex flex-column min-vh-100">
      <StudentHeader />
      <main className="flex-grow-1 bg-light">
        <div className="container py-5">
          <h1 className="mb-4">Thông tin tài khoản</h1>
          <Row>
            <Col md={6}>
              <Card className="shadow-sm mb-4">
                <Card.Body>
                  <Card.Title className="mb-4">Thông tin cá nhân</Card.Title>
                  <ListGroup variant="flush">
                    <ListGroup.Item className="d-flex align-items-center">
                      <User className="me-3 text-primary" />
                      <div>
                        <small className="text-muted">Họ và tên</small>
                        <p className="mb-0">{user.name}</p>
                      </div>
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex align-items-center">
                      <Mail className="me-3 text-primary" />
                      <div>
                        <small className="text-muted">Email</small>
                        <p className="mb-0">{user.email}</p>
                      </div>
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex align-items-center">
                      <Book className="me-3 text-primary" />
                      <div>
                        <small className="text-muted">Mã số sinh viên</small>
                        <p className="mb-0">{user.studentId}</p>
                      </div>
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex align-items-center">
                      <Book className="me-3 text-primary" />
                      <div>
                        <small className="text-muted">Khoa</small>
                        <p className="mb-0">{user.faculty}</p>
                      </div>
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card className="shadow-sm">
                <Card.Body>
                  <Card.Title className="mb-4">Số trang in còn lại</Card.Title>
                  <ListGroup variant="flush">
                    <ListGroup.Item className="d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center">
                        <Printer className="me-3 text-primary" />
                        <span>A4</span>
                      </div>
                      <span className="badge bg-primary rounded-pill">
                        {user.remainingPages?.A4} trang
                      </span>
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center">
                        <Printer className="me-3 text-primary" />
                        <span>A3</span>
                      </div>
                      <span className="badge bg-primary rounded-pill">
                        {user.remainingPages?.A3} trang
                      </span>
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AccountPage;
