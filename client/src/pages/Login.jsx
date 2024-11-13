import { useContext, useState } from "react";
import "../css/Login.css";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../App";
import axios from "axios";

export const Login = () => {
  let navigate = useNavigate();
  const { userData, setUserData } = useContext(AppContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [response, setResponse] = useState(""); 

  const loginAPI = async (getPost) => {
    try {
      const data = await axios.post("api_link_here", getPost);
      setUserData(data.data);
      return true;
    } catch (err) {
      setResponse(err.response.data.message);
      return;
    }
  };

  const handleLogin = async () => {
    const data = {
      email: email,
      password: password,
    };

    const status = await loginAPI(data);
    status && navigate("/home");
  };

  return (
    <div>
      <div className="container-fluid">
        <div className="row justify-content-center login-container align-content-center">
          <div className="col-4 border align-content-center text-center login-form">
            <div className="login-title">Log in</div>
            <span style={{ fontSize: "13px", color: "red" }}>{response}</span>
            <div className="row justify-content-center mt-3">
              <div className="col-8">
                <input
                  className="input-container w-100"
                  type="text"
                  placeholder="Email:"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="row justify-content-center mt-3">
              <div className="col-8">
                <input
                  className="input-container w-100"
                  type="password"
                  placeholder="Password:"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="row justify-content-center mt-3">
              <div className="col-8">
                <button onClick={handleLogin} className="login-btn w-100">
                  Log in
                </button>
              </div>
            </div>
            <div className="row justify-content-center mt-2 mb-3">
              <div className="col-8 text-white text-end">
                <Link to={"/signup"} className=" text-white">
                  Create Account?
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
