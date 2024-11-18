import "../css/Signup.css";
import { Link, useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
import { useSignup } from "../hooks/useSignup";
import { useDecodeToken } from "../hooks/useDecodeToken";
import { jwtDecode } from "jwt-decode";

export const Signup = () => {
  const navigate = useNavigate();
  const { signupUser } = useSignup();
  const { decodeUserToken } = useDecodeToken();

  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [response, setResponse] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    const signupForm = {
      username: `${fname} ${lname}`,
      email,
      password,
    };
    const response = await signupUser(signupForm);

    if (response?.status === 200) {
      sessionStorage.setItem("token", response?.response);
      navigate("/home");
    } else {
      setResponse(response?.response);
      setTimeout(() => {
        setResponse("");
      }, 3000);
    }
  };

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) navigate("/home");
  });

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="logo-side col-md-6 text-white "></div>

        <div className="signup-form-side col-md-6 page-container">
          <div
            className="row align-items-center justify-content-center"
            style={{ height: "100vh" }}
          >
            <div className="col-10">
              <div className="create-title">Create your account</div>
              <span style={{ fontSize: "13px", color: "red" }}>{response}</span>

              <form onSubmit={handleSignup}>
                <div className="row mt-3">
                  <div className="col-5">
                    <input
                      type="text"
                      className="signup-container w-100"
                      placeholder="First Name:"
                      onChange={(e) => setFname(e.target.value.trim())}
                    />
                  </div>
                  <div className="col-4">
                    <input
                      type="text"
                      className="signup-container w-100"
                      placeholder="Last Name:"
                      onChange={(e) => setLname(e.target.value.trim())}
                    />
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-9">
                    <input
                      type="email"
                      className="signup-container w-100"
                      placeholder="Email:"
                      onChange={(e) => setEmail(e.target.value.trim())}
                    />
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-9">
                    <input
                      type="password"
                      className="signup-container w-100"
                      placeholder="Password:"
                      onChange={(e) => setPassword(e.target.value.trim())}
                    />
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col">
                    <button className="btn-signup" type="submit">
                      Sign up
                    </button>
                    <div className="w-75 text-end">
                      <Link style={{ color: "black" }} to={"/"}>
                        Back to login
                      </Link>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
