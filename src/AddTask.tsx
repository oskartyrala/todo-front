import axios from "axios";
import { useState } from "react";

interface AddTaskProps {
  setKey: React.Dispatch<React.SetStateAction<number>>;
}

export default function AddTask({ setKey }: AddTaskProps): JSX.Element {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const baseUrl =
    process.env.NODE_ENV === "production"
      ? "https://oskar-todo-server.onrender.com"
      : "http://localhost:4000";

  const handleAdd = async () => {
    await axios.post(`${baseUrl}/tasks`, {
      title,
      description,
      status: "not done",
    });
    const currentEnv = process.env.NODE_END;
    console.log(`current environment is ${currentEnv}`);
    setKey((prev) => prev + 1);
  };

  return (
    <>
      <input
        type="text"
        value={title}
        placeholder="Task title"
        onChange={(e) => setTitle(e.target.value)}
      ></input>
      <input
        type="text"
        value={description}
        placeholder="Task description"
        onChange={(e) => setDescription(e.target.value)}
      ></input>
      <button onClick={handleAdd}>Add</button>
    </>
  );
}
