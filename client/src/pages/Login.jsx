import "../css/Login.css";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";
import { useDecodeToken } from "../hooks/useDecodeToken";

export const Login = () => {
  const navigate = useNavigate();
  const { loginUser } = useLogin();
  const { decodeUserToken } = useDecodeToken();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [response, setResponse] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const loginForm = {
      identifier,
      password,
    };

    const response = await loginUser(loginForm);

    if (response?.status === 200) {
      sessionStorage.setItem("token", response?.response);
      console.log(response);
      navigate("/home");
    } else {
      setResponse(response?.response);
      setTimeout(() => {
        setResponse("");
      }, 3000);
    }
  };

  useEffect(() => {
    decodeUserToken();
  }, []);

  return (
    <div>
      <div className="container-fluid">
        <div className="row justify-content-center login-container align-content-center">
          <div className="col-4 border align-content-center text-center login-form">
            <div className="login-title">Log in</div>
            <span style={{ fontSize: "13px", color: "red", fontWeight: "600" }}>
              {response}
            </span>
            <form onSubmit={handleLogin}>
              <div className="row justify-content-center mt-3">
                <div className="col-8">
                  <input
                    className="input-container w-100"
                    type="text"
                    placeholder="Email/Username:"
                    onChange={(e) => setIdentifier(e.target.value)}
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
                  <button
                    onClick={handleLogin}
                    className="login-btn w-100"
                    type="submit"
                  >
                    Log in
                  </button>
                </div>
              </div>
            </form>
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
