import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Card, Modal, Button } from "react-bootstrap";
import { Printer, Trash } from "react-feather";
import apiService from "../../services/api";

const ListDocument = () => {
  const navigate = useNavigate();
  const [documents, setDocuments] = useState([]);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedFileId, setSelectedFileId] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem("id");
    apiService
      .getFileList(userId)
      .then((response) => {
        setDocuments(response.data.reverse());
      })
      .catch((error) => {
        console.error("Error fetching file list:", error);
      });
  }, []);

  const handleDelete = (fileId) => {
    setSelectedFileId(fileId);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    apiService.deleteFile(selectedFileId).then(() => {
      window.location.reload();
    });
    setShowDeleteModal(false);
  };

  const handlePrint = (fileId) => {
    navigate("/print/" + fileId);
  };

  return (
    <Card className="shadow-sm mb-4">
      <Card.Body>
        <div className="card shadow-sm">
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-striped table-hover mb-0">
                <thead className="bg-light">
                  <tr>
                    <th className="py-3 px-4">Tên tài liệu</th>
                    <th className="py-3">Ngày tải lên</th>
                    <th className="py-3">Số trang</th>
                    <th className="text-end py-3 px-4">Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {documents.map((doc) => (
                    <tr key={doc.fileid} className="align-middle">
                      <td className="py-3 px-4 fw-medium">{doc.file_name}</td>
                      <td className="py-3">{doc.upload_date}</td>
                      <td className="py-3">{doc.num_pages}</td>
                      <td className="text-end py-3 px-4">
                        <div className="btn-group" role="group">
                          <button
                            className="btn btn-outline-primary me-2 btn-sm d-flex align-items-center justify-content-center"
                            onClick={() => handlePrint(doc.fileid)}
                            title="In tài liệu"
                          >
                            <Printer size={24} />
                          </button>
                          <button
                            className="btn btn-outline-danger btn-sm d-flex align-items-center justify-content-center"
                            onClick={() => handleDelete(doc.fileid)}
                            title="Xóa tài liệu"
                          >
                            <Trash size={24} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

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
      </Card.Body>
    </Card>
  );
};

export default ListDocument;
