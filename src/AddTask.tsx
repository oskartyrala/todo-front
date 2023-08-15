import axios from "axios";
import { useState } from "react";
// import getYYMMDD from "./utils/getYYYYMMDD";

interface AddTaskProps {
  setKey: React.Dispatch<React.SetStateAction<number>>;
}

export default function AddTask({ setKey }: AddTaskProps): JSX.Element {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  const baseUrl =
    process.env.NODE_ENV === "production"
      ? "https://todo-server-476z.onrender.com"
      : "http://localhost:4000";

  const handleAdd = async () => {
    const res = await axios.post(`${baseUrl}/tasks`, {
      title,
      description,
      due: dueDate,
    });
    console.log(res);
    setKey((prev) => prev + 1);
    setTitle("");
    setDescription("");
    setDueDate("");
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
      <input
        type="date"
        value={dueDate}
        onChange={(e) => {
          console.log(e.target.value);
          setDueDate(e.target.value);
        }}
      ></input>
      <button onClick={handleAdd}>Add</button>
    </>
  );
}
