import React, { useState, useRef } from "react";
import { Card, Form, Button, ProgressBar, Alert } from "react-bootstrap";
import { Upload, File, CheckCircle } from "react-feather";
import apiService from "../../services/api";
import axios from "axios";

const UploadDocument = () => {
  const userId = localStorage.getItem("id");
  const [file, setFile] = useState();
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const fileInputRef = useRef(null);

  // Fallback page count method
  const getPageCount = async (pdfFile) => {
    try {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const arrayBuffer = e.target.result;
          const uint8Array = new Uint8Array(arrayBuffer);

          // Basic PDF page count detection by counting %% markers
          const pdfContent = new TextDecoder().decode(uint8Array);
          const pageMatches = pdfContent.match(/\/Type\s*\/Page\b/g);

          resolve(pageMatches ? pageMatches.length : 1);
        };
        reader.onerror = (error) => reject(error);
        reader.readAsArrayBuffer(pdfFile);
      });
    } catch (error) {
      console.error("Page count detection error:", error);
      return 1; // Default to 1 page if detection fails
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    console.log(selectedFile);

    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
      setUploadComplete(false);
      setErrorMessage("");
    } else {
      setErrorMessage("Vui lòng chọn file PDF");
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const selectedFile = e.dataTransfer.files[0];
    console.log(selectedFile);
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
      setUploadComplete(false);
      setErrorMessage("");
    } else {
      setErrorMessage("Vui lòng chọn file PDF");
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleUpload = async () => {
    if (!file) return;

    try {
      setUploading(true);
      const pageCount = await getPageCount(file);

      const formData = new FormData();
      formData.append("numpages", pageCount);
      formData.append("file_name", file.name);
      formData.append("file", file);

      // Call API to add new file
      // await apiService
      //   .addNewFile(userId, formData)
      //   .then((res) => {
      //     console.log(res);
      //     setProgress(100);
      //     setUploadComplete(true);
      //     // window.location.reload();
      //   })
      //   .catch((err) => {
      //     // console.error(err);
      //   });

      axios
        .post(
          process.env.REACT_APP_API_URL +
            "/student/newFile/" +
            localStorage.getItem("id"),
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          console.log(res);
          setProgress(100);
          setUploadComplete(true);
          window.location.reload();
        })
        .catch((err) => {
          alert("Lỗi ròi !!!!!");
        });
    } catch (error) {
      setErrorMessage(error.message || "Tải lên thất bại");
      setUploading(false);
    }
  };

  return (
    <Card className="shadow-sm mb-4">
      <Card.Body>
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="text-center p-5 border rounded mb-4"
          style={{ backgroundColor: "#f8f9fa" }}
        >
          {file ? (
            <div>
              <File size={48} className="text-primary mb-3" />
              <p>{file.name}</p>
            </div>
          ) : (
            <div>
              <Upload size={48} className="text-primary mb-3" />
              <h5>Kéo và thả file của bạn vào đây</h5>
              <p className="text-muted">hoặc nhấp để chọn file</p>
            </div>
          )}
          <Form.Control
            ref={fileInputRef}
            type="file"
            onChange={handleFileChange}
            className="d-none"
            id="fileInput"
            accept=".pdf"
          />
          <label htmlFor="fileInput" className="btn btn-outline-primary mt-3">
            Chọn file
          </label>
        </div>
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
        {file && !uploadComplete && (
          <div className="mb-3">
            <p>
              File đã chọn: {file.name} ({(file.size / 1024 / 1024).toFixed(2)}{" "}
              MB)
            </p>
            {uploading ? (
              <ProgressBar animated now={progress} label={`${progress}%`} />
            ) : (
              <Button
                variant="primary"
                onClick={handleUpload}
                disabled={uploading}
              >
                Tải lên
              </Button>
            )}
          </div>
        )}
        {uploadComplete && (
          <Alert variant="success" className="d-flex align-items-center">
            <CheckCircle size={24} className="me-2" />
            <div>Tải lên thành công! File của bạn đã sẵn sàng để in.</div>
          </Alert>
        )}
      </Card.Body>
    </Card>
  );
};

export default UploadDocument;
