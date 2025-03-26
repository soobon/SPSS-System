import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, Form } from "react-bootstrap";
import { Printer, FileText } from "react-feather";
import apiService from "../../services/api";

const PrintSettings = ({ onPrintConfirm }) => {
  const { id } = useParams();
  const [printer, setPrinter] = useState("");
  const [paperSize, setPaperSize] = useState("A4");
  const [printPages, setPrintPages] = useState("-1");
  const [printSides, setPrintSides] = useState("1");
  const [copies, setCopies] = useState(1);
  const [allPrinters, setAllPrinters] = useState([]);
  const [startPage, setStartPage] = useState("-1");
  const [endPage, setEndPage] = useState("-1");

  const handleSubmit = (e) => {
    e.preventDefault();
    onPrintConfirm({
      start_page: startPage,
      end_page: endPage,
      list_page: printPages,
      printer_id: printer,
      file_id: id,
      paper_size: paperSize,
      one_or_two_side: printSides,
      nb_of_copy: copies,
    });
    // console.log();
  };

  useEffect(() => {
    apiService
      .getAllPrinter()
      .then((res) => {
        // console.log(res);
        setAllPrinters(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  return (
    <Form id="print-settings-form" onSubmit={handleSubmit}>
      <Card className="shadow-sm mb-4">
        <Card.Body>
          <h2 className="h5 mb-4">
            <Printer className="me-2" size={20} />
            Chọn máy in
          </h2>
          <Form.Select
            className="mb-4"
            value={printer}
            onChange={(e) => setPrinter(e.target.value)}
            required
          >
            <option value="">Chọn máy in</option>
            {allPrinters.map((printer, index) => {
              if (printer.state == 0) return <></>;
              return (
                <option value={printer.printer_id} key={index}>
                  {printer.model} - {printer.building}
                </option>
              );
            })}
          </Form.Select>
        </Card.Body>
      </Card>

      <Card className="shadow-sm mb-4">
        <Card.Body>
          <h2 className="h5 mb-4">
            <FileText className="me-2" size={20} />
            Tùy chọn in
          </h2>
          <Form.Group className="mb-3">
            <Form.Label>Kích thước giấy</Form.Label>
            <Form.Select
              value={paperSize}
              onChange={(e) => setPaperSize(e.target.value)}
            >
              <option value="A4">A4</option>
              <option value="A3">A3</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Trang bắt đầu</Form.Label>
            <Form.Control
              type="text"
              placeholder="Để trống hoặc chọn số (vd: 8)"
              value={startPage == -1 ? "" : startPage}
              onChange={(e) => {
                if (e.target.value) {
                  setStartPage(e.target.value);
                } else setStartPage(-1);
              }}
              disabled={printPages != "-1"}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Trang kết thúc</Form.Label>
            <Form.Control
              type="text"
              placeholder="Để trống hoặc chọn số (vd: 16)"
              value={endPage == -1 ? "" : endPage}
              onChange={(e) => {
                if (e.target.value) {
                  setEndPage(e.target.value);
                } else setEndPage(-1);
              }}
              disabled={printPages != "-1"}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Số trang cần in</Form.Label>
            <Form.Control
              type="text"
              placeholder="Để trống hoặc chọn range (vd: 1,3,4,6,8...)"
              value={printPages == -1 ? "" : printPages}
              onChange={(e) => {
                if (e.target.value) {
                  setPrintPages(e.target.value);
                } else setPrintPages(-1);
                // console.log(e.target.value);
              }}
              disabled={endPage != "-1" || startPage != "-1"}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>In một mặt/hai mặt</Form.Label>
            <Form.Select
              value={printSides}
              onChange={(e) => setPrintSides(e.target.value)}
            >
              <option value="1">Một mặt</option>
              <option value="2">Hai mặt</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Số bản sao</Form.Label>
            <Form.Control
              type="number"
              value={copies}
              onChange={(e) => setCopies(e.target.value)}
              min="1"
            />
          </Form.Group>
        </Card.Body>
      </Card>
    </Form>
  );
};

export default PrintSettings;
