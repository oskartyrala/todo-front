import { ITask } from "./App";
import axios from "axios";

interface TaskProps {
  task: ITask;
  setKey: React.Dispatch<React.SetStateAction<number>>;
}

export default function Task({ task, setKey }: TaskProps): JSX.Element {
  const baseUrl =
    process.env.NODE_ENV === "production"
      ? "https://oskar-todo-server.onrender.com"
      : "http://localhost:4000";

  const handleButton = async (status: string) => {
    try {
      await axios.patch(`${baseUrl}/tasks/${task.id}`, {
        status: status,
      });
      setKey((prev) => prev + 1);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${baseUrl}/tasks/${task.id}`);
      setKey((prev) => prev + 1);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="task">
      <p>Title: {task.title}</p>
      <p>Description: {task.description}</p>
      {task.due && <p>Due: {task.due}</p>}
      {task.status !== "in progress" && (
        <button
          value="in progress"
          onClick={(e) => handleButton(e.currentTarget.value)}
        >
          In progress
        </button>
      )}
      {task.status !== "done" && (
        <button
          value="done"
          onClick={(e) => handleButton(e.currentTarget.value)}
        >
          Done
        </button>
      )}
      {task.status !== "not done" && (
        <button
          value="not done"
          onClick={(e) => handleButton(e.currentTarget.value)}
        >
          Not done
        </button>
      )}
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}
