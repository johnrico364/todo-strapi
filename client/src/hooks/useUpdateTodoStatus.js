import axios from "axios";

export const useUpdateTodoStatus = () => {
  const updateTodoStatus = async (todoId, status) => {
    const updateStatus = {
      data: {
        isFinished: status,
      },
    };

    try {
      const data = await axios.put(
        `http://localhost:1337/api/todos/${todoId}`,
        updateStatus
      );
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };
  return { updateTodoStatus };
};
