import React from 'react';
import { Card, Table, Form, Row, Col } from 'react-bootstrap';

const PrintHistory = () => {
  const historyData = [
    { id: 1, date: '2023-07-15', document: 'Assignment.pdf', pages: 5, status: 'Completed' },
    { id: 2, date: '2023-07-14', document: 'Lecture_Notes.docx', pages: 10, status: 'Completed' },
    { id: 3, date: '2023-07-13', document: 'Research_Paper.pdf', pages: 15, status: 'Failed' },
    { id: 4, date: '2023-07-12', document: 'Presentation.pptx', pages: 20, status: 'Completed' },
  ];

  return (
    <div className="print-history">
      <h1 className="page-title">Print History</h1>
      <Card className="dashboard-card">
        <Card.Body>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Start Date</Form.Label>
                <Form.Control type="date" />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>End Date</Form.Label>
                <Form.Control type="date" />
              </Form.Group>
            </Col>
          </Row>
          <Table responsive striped hover>
            <thead>
              <tr>
                <th>Date</th>
                <th>Document</th>
                <th>Pages</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {historyData.map((item) => (
                <tr key={item.id}>
                  <td>{item.date}</td>
                  <td>{item.document}</td>
                  <td>{item.pages}</td>
                  <td>
                    <span className={`badge bg-${item.status === 'Completed' ? 'success' : 'danger'}`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </div>
  );
};

export default PrintHistory;