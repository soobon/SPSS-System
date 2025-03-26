import React, { useState, useEffect } from "react";
import {
  Card,
  Table,
  Form,
  Row,
  Col,
  Badge,
  Button,
  Modal,
} from "react-bootstrap";
import { Printer, FileText, Trash, Home } from "react-feather";
import StudentHeader from "../../components/common/StudentHeader";
import Footer from "../../components/common/Footer";
import apiService from "../../services/api";

const HistoryPage = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [historyData, setHistoryData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [selectedItem, setSelectedItem] = useState({
    id: "123456789",
    file_name: "rp.pdf",
    nb_of_page_used: 15,
    statuss: 0,
    print_date: "2024-12-01",
    building: "Building I",
    print_id: "P00000009",
    file_id: "F9446770170",
    order_num: 2,
  });

  const userId = localStorage.getItem("id");

  useEffect(() => {
    apiService
      .getHistory(userId)
      .then((response) => {
        setHistoryData(response.data);
        setFilteredData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching history:", error);
      });
  }, []);

  const handleFilter = () => {
    if (!startDate && !endDate) {
      setFilteredData(historyData);
      return;
    }

    const filtered = historyData.filter((item) => {
      const itemDate = new Date(item.print_date);
      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;

      if (start && end) {
        return itemDate >= start && itemDate <= end;
      } else if (start) {
        return itemDate >= start;
      } else if (end) {
        return itemDate <= end;
      }
      return true;
    });

    setFilteredData(filtered);
  };

  const clearFilter = () => {
    setStartDate("");
    setEndDate("");
    setFilteredData(historyData);
  };

  const confirmDelete = () => {
    apiService
      .deleteRequest(selectedItem.order_num, selectedItem.file_id)
      .then(() => {
        window.location.reload();
      })
      .catch((err) => {
        alert("Lỗi ròi !!!!!!!");
        console.error(err);
      });
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <StudentHeader />
      <main className="flex-grow-1 bg-light">
        <div className="container py-5">
          <h1 className="mb-4">Lịch sử in</h1>

          {/* Filter Section */}
          <Card className="mb-4">
            <Card.Body>
              <Row className="align-items-end">
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Từ ngày</Form.Label>
                    <Form.Control
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Đến ngày</Form.Label>
                    <Form.Control
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <div className="d-flex gap-2">
                    <Button variant="primary" onClick={handleFilter}>
                      Lọc
                    </Button>
                    <Button variant="secondary" onClick={clearFilter}>
                      Xóa bộ lọc
                    </Button>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
          <Table responsive hover>
            <thead>
              <tr>
                <th>Ngày</th>
                <th>Tài liệu</th>
                <th>Số trang</th>
                <th>Trạng thái</th>
                <th>Xóa</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item) => (
                <tr
                  key={item.id}
                  onClick={() => {
                    setSelectedItem(item);
                    setShowInfo(true);
                  }}
                >
                  <td>{item.print_date}</td>
                  <td>
                    <FileText size={18} className="me-2" />
                    {item.file_name}
                  </td>
                  <td>
                    <Printer size={18} className="me-2" />
                    {item.nb_of_page_used}
                  </td>
                  <td>
                    <Badge bg={+item.statuss == 2 ? "success" : "danger"}>
                      {item.statuss}
                    </Badge>
                  </td>
                  <td>
                    <button
                      className="btn btn-outline-danger btn-sm d-flex align-items-center justify-content-center"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowDeleteModal(true);
                        setSelectedItem(item);
                      }}
                      title="Xóa tài liệu"
                    >
                      <Trash size={15} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Modal
            show={showDeleteModal}
            onHide={() => setShowDeleteModal(false)}
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>Xác nhận xóa</Modal.Title>
            </Modal.Header>
            <Modal.Body>Bạn có chắc chắn muốn xóa tài liệu này?</Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => setShowDeleteModal(false)}
              >
                Hủy
              </Button>
              <Button variant="danger" onClick={confirmDelete}>
                Xóa
              </Button>
            </Modal.Footer>
          </Modal>

          <Modal show={showInfo} onHide={() => setShowInfo(false)} centered>
            <Modal.Header closeButton>
              <Modal.Title>Thông tin yêu cầu</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="d-flex flex-column gap-3">
                <div className="d-flex align-items-center">
                  <FileText size={24} className="me-3 text-primary" />
                  <div>
                    <strong>Tên file:</strong> {selectedItem.file_name}
                  </div>
                </div>

                <div className="d-flex align-items-center">
                  <Printer size={24} className="me-3 text-primary" />
                  <div>
                    <strong>Số trang:</strong>{" "}
                    {selectedItem.nb_of_page_used}
                  </div>
                </div>

                <div className="d-flex align-items-center">
                  <Home size={24} className="me-3 text-primary" />
                  <div>
                    <strong>Vị trí:</strong> {selectedItem.building}
                  </div>
                </div>

                <div className="d-flex align-items-center">
                  <strong className="me-3">Print ID:</strong>
                  {selectedItem.print_id}
                </div>

                <div className="d-flex align-items-center">
                  <strong className="me-3">File ID:</strong>
                  {selectedItem.file_id}
                </div>

                <div className="d-flex align-items-center">
                  <strong className="me-3">Số thứ tự:</strong>
                  {selectedItem.order_num}
                </div>

                <div className="d-flex align-items-center">
                  <strong className="me-3">Ngày:</strong>
                  {selectedItem.print_date}
                </div>
              </div>
            </Modal.Body>
          </Modal>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HistoryPage;
