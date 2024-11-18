import "../css/Home.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetTodo } from "../hooks/useGetTodo";
import { useDecodeToken } from "../hooks/useDecodeToken";

export const Home = () => {
  const navigate = useNavigate();
  const { getAllTodos } = useGetTodo();
  const { decodeUserToken } = useDecodeToken();

  const [todos, set_todos] = useState([]);

  const effectFn = async () => {
    const response = await getAllTodos();
    set_todos(response);
  };
  useEffect(() => {
    decodeUserToken();
    effectFn();
  }, []);

  return (
    <div className="container-fluid" style={{ height: "100vh" }}>
      <div className="row justify-content-center ">
        <div className="col-3 d-flex justify-content-center align-items-center">
          <div className="animal-img"></div>
        </div>
        <div className="col-5">
          <div className="todo-container text-center ">
            <div className="task-container overflow-auto px-4">
              {todos.map((d) => {
                return (
                  <div className="row justify-content-center">
                    <div
                      className={`${
                        d.isFinished && "task-finished"
                      } todo-task col-10`}
                      // onClick={() => toUpdate(d.todo_id, d.title)}
                    >
                      {d.title}
                    </div>
                    <div className="col-1 pt-3">
                      <i
                        className={`${
                          d.isFinished && "checkbox-finish"
                        } task-checkbox bi bi-clipboard2-check`}
                        // onClick={() => handleStatus(d.status, d.todo_id)}
                      ></i>
                    </div>
                  </div>
                );
              })}
            </div>
            <i
              onClick={() => navigate("/add")}
              className="btn-add-task bi bi-plus-circle-fill"
            ></i>
            <i
              onClick={() => navigate("/")}
              className="btn-logout bi bi-box-arrow-in-left"
            ></i>
          </div>
        </div>
        <div className="col-3 d-flex justify-content-center align-items-center">
          <div className="animal-img"></div>
        </div>
      </div>
    </div>
  );
};
