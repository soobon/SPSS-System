import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Printer, FileText, CreditCard } from "react-feather";

const Dashboard = ({ printStats, chartData }) => {
  const COLORS = ["#0088FE", "#00C49F"];

  return (
    <div className="dashboard">
      <Row className="mb-4">
        <Col md={4}>
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <Card.Title className="d-flex justify-content-between align-items-center">
                <span>Số dư trang in</span>
                <Printer size={24} className="text-primary" />
              </Card.Title>
              <h3 className="display-4 text-center my-4">
                {printStats.balance}
              </h3>
              <p className="text-muted text-center">trang A4</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <Card.Title className="d-flex justify-content-between align-items-center">
                <span>Trang đã dùng</span>
                <Printer size={24} className="text-primary" />
              </Card.Title>
              <h3 className="display-4 text-center my-4">
                {printStats.totalPages}
              </h3>
              <p className="text-muted text-center">trang</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <Card.Title className="d-flex justify-content-between align-items-center">
                <span>Số lần in</span>
                <FileText size={24} className="text-primary" />
              </Card.Title>
              <h3 className="display-4 text-center my-4">
                {printStats.totalPrints}
              </h3>
              <p className="text-muted text-center">lần in</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>Lịch sử in theo tháng</Card.Title>

              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="printing_count_for_this_month" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
