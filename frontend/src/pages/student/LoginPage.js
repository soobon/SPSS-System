import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import apiService from "../../services/api";

const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    apiService
      .login(username, password)
      .then((res) => {
        if (res.data.response === "Login successfully!") {
          // console.log(res.data);
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("isAuth", true);
          localStorage.setItem("id", res.data.user_id);
          window.location.reload();
        } else {
          alert(res.data.response);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="bg-white vh-100 d-flex align-items-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-6 col-lg-4">
            <div className="card border shadow-sm">
              <div className="card-body p-4 text-center">
                {/* Logo Placeholder */}
                <div className="mb-4">
                  <div
                    className="mx-auto bg-white text-white rounded-circle d-flex align-items-center justify-content-center"
                    style={{
                      width: "100px",
                      height: "100px",
                      margin: "0 auto",
                    }}
                  >
                    {/* <span className="fs-4">Logo</span> */}
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/HCMUT_official_logo.png/640px-HCMUT_official_logo.png"
                      alt="logo"
                      width="100%"
                    />
                  </div>
                </div>

                <h3 className="text-primary mb-5">Đăng nhập</h3>

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="password"
                      className="form-control form-control-lg"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>

                  <div className="d-grid mt-5">
                    <button
                      type="submit"
                      className="btn btn-primary btn-lg"
                      onClick={(e) => handleSubmit(e)}
                    >
                      Đăng nhập
                    </button>
                  </div>

                  <div className="text-center mt-3"></div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
