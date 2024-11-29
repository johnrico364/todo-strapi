import axios from "axios";

export const useUpdateTodo = () => {
  const updateTodo = async (todoId, todoData) => {
    try {
      const data = await axios.put(
        `http://localhost:1337/api/todos/${todoId}`,
        todoData
      );
      
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };
  return { updateTodo };
};
