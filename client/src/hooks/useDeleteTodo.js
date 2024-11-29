import axios from "axios";

export const useDeleteTodo = () => {
  const deleteTodo = async (todoId) => {
    try {
      const data = await axios.delete(
        `http://localhost:1337/api/todos/${todoId}`
      );
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };
  return { deleteTodo };
};
