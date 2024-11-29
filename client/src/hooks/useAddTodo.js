import axios from "axios";

export const useAddTodo = () => {
  const addTodo = async (newPost) => {
    try {
      const data = await axios.post("http://localhost:1337/api/todos", newPost);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  return { addTodo };
};
