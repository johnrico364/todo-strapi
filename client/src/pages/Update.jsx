import "../css/Update.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useUpdateTodo } from "../hooks/useUpdateTodo";
import { useDeleteTodo } from "../hooks/useDeleteTodo";

export const Update = () => {
  const navigate = useNavigate();
  const todoDetails = JSON.parse(sessionStorage.getItem("todoDetails"));

  const { updateTodo } = useUpdateTodo();
  const { deleteTodo } = useDeleteTodo();

  const [newTitle, setNewTitle] = useState(todoDetails?.title);
  const [newDescription, setNewDescription] = useState(todoDetails?.description);
  const [response, setResponse] = useState("");
  const handleUpdate = async () => {
    console.log(newTitle.length)
    if (newTitle.length <= 3) {
      setResponse("Title is empty or too short (min 3 characters)");
      setTimeout(() => {
        setResponse("");
      }, 1500);
      return;
    }
    if(newDescription.length <= 10) {
      setResponse("Description is empty or too short (min 10 characters)");
      setTimeout(() => {
        setResponse("");
      }, 1500);
      return;
    }
    const newTodo = {
      data: {
        title: newTitle,
        description: newDescription,
      },
    };

    const response = await updateTodo(todoDetails?.id, newTodo);
    if (response) navigate("/home");
  };

  const handleDelete = async () => {
    const response = await deleteTodo(todoDetails?.id);
    if (response) navigate("/home");
  };

  return (
    <div className="container-fluid" style={{ height: "100vh" }}>
      <div className="row justify-content-center ">
        <div className="col-5 text-white ">
          <div className="update-container text-center ">
            <div className="update-task-container overflow-auto">
              <div className="row justify-content-center ">
                <div className="col-7 mt-4 ">
                  <input
                    id="update-input"
                    className="update-input w-100"
                    type="text"
                    placeholder="Update:"
                    defaultValue={todoDetails?.title}
                    onChange={(e) => setNewTitle(e.target.value)}
                  />
                  <textarea 
                    className="update-input w-100 mt-3" 
                    style={{height: '200px'}}
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                  >
                  </textarea>
                  <p className="text-danger fw-bold">{response}</p>
                </div>
                <div className="col-7 mt-4 ">
                  <button
                    className="btn-update-delete w-100"
                    onClick={handleUpdate}
                  >
                    Update
                  </button>
                </div>
                <div className="col-7 mt-4 ">
                  <button
                    className="btn-update-delete w-100"
                    onClick={handleDelete}
                  >
                    Delete
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
