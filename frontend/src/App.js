import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import HomePage from "./pages/student/HomePage";
import UploadPrintPage from "./pages/student/UploadPage";
import HistoryPage from "./pages/student/HistoryPage";
import BuyPagesPage from "./pages/student/BuyPagesPage";
import AccountPage from "./pages/student/AccountPage";
import LoginPage from "./pages/student/LoginPage";
import PrintPage from "./pages/student/PrintPage";
import PaymentSuccess from "./pages/student/PaymentSuccess";
import PaymentFailure from "./pages/student/PaymentFailure.js";

function App() {
  const isAuth = localStorage.getItem("isAuth");
  return (
    <Router>
      <Routes>
        <Route
          exact
          path="/"
          element={isAuth ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/upload"
          element={isAuth ? <UploadPrintPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/history"
          element={isAuth ? <HistoryPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/buy-pages"
          element={isAuth ? <BuyPagesPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/account"
          element={isAuth ? <AccountPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={isAuth ? <Navigate to="/" /> : <LoginPage />}
        />
        <Route
          path="/print/:id"
          element={isAuth ? <PrintPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/payment-success"
          element={isAuth ? <PaymentSuccess /> : <Navigate to="/login" />}
        />
        <Route
          path="/payment-failure"
          element={isAuth ? <PaymentFailure /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
