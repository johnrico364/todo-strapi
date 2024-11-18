import axios from "axios";

export const useGetTodo = () => {
  const getAllTodos = async () => {
    try {
      const data = await axios.get("http://localhost:1337/api/todos");

      return data?.data?.data;
    } catch (error) {
      console.log(error)
    }
  };

  return { getAllTodos };
};
