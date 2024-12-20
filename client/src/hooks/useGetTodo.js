import axios from "axios";

export const useGetTodo = () => {
  const getAllTodos = async (user_id) => {
    try {
      const data = await axios.get(
        `http://localhost:1337/api/todos?filters[ownerId][$eq]=${user_id}`
      );

      return data?.data?.data;
    } catch (error) {
      console.log(error);
    }
  };

  return { getAllTodos };
};
