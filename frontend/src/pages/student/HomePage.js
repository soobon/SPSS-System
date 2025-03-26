import React, { useState, useEffect } from "react";
import StudentHeader from "../../components/common/StudentHeader";
import Footer from "../../components/common/Footer";
import Dashboard from "../../components/student/Dashboard";
import apiService from "../../services/api";

const HomePage = () => {
  const studentID = localStorage.getItem("id");
  const [printStats, setPrintStats] = useState({
    totalPrints: 0,
    totalPages: 0,
    balance: 0,
  });
  const [chartData, setChartData] = useState([
    { name: "T1", prints: 0 },
    { name: "T2", prints: 0 },
    { name: "T3", prints: 0 },
    { name: "T4", prints: 0 },
    { name: "T5", prints: 0 },
    { name: "T6", prints: 0 },
    { name: "T7", prints: 0 },
    { name: "T8", prints: 0 },
    { name: "T9", prints: 0 },
    { name: "T10", prints: 0 },
    { name: "T11", prints: 0 },
    { name: "T12", prints: 0 },
  ]);

  useEffect(() => {
    apiService
      .getStatistic(studentID, 2024)
      .then((res) => {
        // console.log(res);
        setPrintStats({
          totalPrints: res.data.printing_count,
          totalPages: res.data.total_page_used,
          balance: res.data.nb_of_page_left,
        });
        setChartData(res.data.monthDTOS);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <div className="bg-light min-vh-100 d-flex flex-column">
      <StudentHeader />
      <main className="flex-grow-1">
        <div className="container py-5">
          <div className="row">
            <div className="col-lg-8">
              <h1 className="display-4 mb-4">Chào mừng bạn!</h1>
              <p className="lead text-muted mb-5">
                Quản lý in ấn của bạn trở nên dễ dàng hơn với HCMUT SSPS.
              </p>
              <Dashboard printStats={printStats} chartData={chartData} />
            </div>
            <div className="col-lg-4">
              <img
                src="https://img.freepik.com/free-vector/printing-industry-flat-illustration_23-2148899280.jpg?t=st=1726754615~exp=1726758215~hmac=9ccc0c1614228e52d3be16bf0d559dbca4a57ed416f6bef57fafad0331ac83ab&w=1380"
                alt="Printing Illustration"
                className="img-fluid mb-4"
              />
              <div className="card bg-primary text-white">
                <div className="card-body">
                  <h5 className="card-title">Bạn đã biết?</h5>
                  <p className="card-text">
                    In hai mặt giúp tiết kiệm 50% giấy và góp phần bảo vệ môi
                    trường.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
