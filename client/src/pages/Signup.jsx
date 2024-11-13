import { Link, useNavigate } from "react-router-dom";
import "../css/Signup.css";
import axios from "axios";
import { AppContext } from "../App";
import { useContext, useState } from "react";

export const Signup = () => {
  const navigate = useNavigate();
  const { userData } = useContext(AppContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [response, setResponse] = useState("");

  const signupAPI = async (newPost) => {
    try {
      await axios.post(
        "api_link_here",
        newPost
      );
      return true;
    } catch (err) {
      setResponse(err.response.data.message);
      return;
    }
  };

  const signupFn = async () => {
    const data = {
      email: email,
      password: password,
    };

    const status = await signupAPI(data);

    status && navigate("/");
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="logo-side col-md-6 text-white ">Logo side here</div>

        <div className="signup-form-side col-md-6 page-container">
          <div
            className="row align-items-center justify-content-center"
            style={{ height: "100vh" }}
          >
            <div className="col-10">
              <div className="row mt-3">
                <div className="create-title">Create your account</div>
                <span style={{ fontSize: "13px", color: "red" }}>
                  {response}
                </span>
                <div className="col-12">
                  <input
                    type="text"
                    className="signup-container w-75"
                    placeholder="Email:"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className="row mt-3">
                <div className="col">
                  <input
                    type="password"
                    className="signup-container w-75"
                    placeholder="Password:"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className="row"></div>
              <div className="row mt-3">
                <div className="col">
                  <button onClick={signupFn} className="btn-signup">
                    Sign up
                  </button>
                  <div className="w-75 text-end">
                    <Link style={{ color: "black" }} to={"/"}>
                      Back to login
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
