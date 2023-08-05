import axios from "axios"
import { useState } from "react"

interface AddTaskProps {
  setKey: React.Dispatch<React.SetStateAction<number>>;
}

export default function AddTask({setKey}: AddTaskProps): JSX.Element {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleAdd = async () => {
    const res = await axios.post("http://localhost:4000/tasks", {title, description, status: "not done"})
    console.log(res);
    setKey(prev => prev + 1)
  }

  return (
    <>
      <input type="text" value={title} placeholder="Task title" onChange={(e) => setTitle(e.target.value)}></input>
      <input type="text" value={description} placeholder="Task description" onChange={(e) => setDescription(e.target.value)}></input>
      <button onClick={handleAdd}>Add</button>
    </>
  )
}