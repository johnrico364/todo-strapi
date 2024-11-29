import "../css/Add.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useAddTodo } from "../hooks/useAddTodo";

export const Add = () => {
  const navigate = useNavigate();

  const { addTodo } = useAddTodo();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [userId, setUserId] = useState(0);
  const [response, setResponse] = useState("");

  const handleAdd = async () => {
    if (title === "" || title.length <= 3) {
      setResponse("Title is empty or too short...");
      setTimeout(() => {
        setResponse("");
      }, 1500);
      return;
    }

    const newTodo = {
      data: {
        title,
        description,
        isFinished: false,
        ownerId: userId.toString(),
      },
    };

    const response = await addTodo(newTodo);
    if (response) navigate("/home");
  };

  useEffect(() => {
    const user_token = sessionStorage.getItem("token");
    const decode = jwtDecode(user_token);
    setUserId(decode?.id);
  }, []);
  return (
    <div className="container-fluid" style={{ height: "100vh" }}>
      <div className="row justify-content-center ">
        <div className="col-5 text-white ">
          <div className="add-container text-center ">
            <div className="add-task-container overflow-auto">
              <div className="row justify-content-center ">
                <div className="col-7 mt-4 ">
                  <input
                    className="add-input w-100"
                    type="text"
                    placeholder="Add:"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <textarea
                    className="add-input w-100 mt-3"
                    style={{height: '200px'}}
                    placeholder="Description:"
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <p className="text-danger fw-bold">{response}</p>
                </div>
                <div className="col-7 mt-4">
                  <button className="btn-add w-100" onClick={handleAdd}>
                    Add
                  </button>
                </div>
              </div>
            </div>
            <i
              onClick={() => navigate("/home")}
              className="btn-return bi bi-arrow-return-left"
            ></i>
          </div>
        </div>
      </div>
    </div>
  );
};
