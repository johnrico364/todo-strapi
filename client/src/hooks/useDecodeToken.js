import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

export const useDecodeToken = () => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  const currentTime = Math.floor(Date.now() / 1000);

  const decodeUserToken = async () => {
    if (!token) {
      navigate("/");
      return;
    }

    const decode = jwtDecode(token);
    if (decode.exp < currentTime) {
      sessionStorage.removeItem("token");
      navigate("/");
    } else {
      navigate("/home");
    }
  };

  return { decodeUserToken };
};
