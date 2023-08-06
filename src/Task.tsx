import { ITask } from "./App";
import axios from "axios";

interface TaskProps {
  task: ITask;
  setKey: React.Dispatch<React.SetStateAction<number>>;
}

export default function Task({ task, setKey }: TaskProps): JSX.Element {
  const baseUrl =
    process.env.NODE_ENV === "production"
      ? "oskar-todo-server.onrender.com"
      : "localhost:4000";

  const handleButton = async (status: string) => {
    try {
      await axios.patch(`http://${baseUrl}/tasks/${task.id}`, {
        status: status,
      });
      setKey((prev) => prev + 1);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://${baseUrl}/tasks/${task.id}`);
      setKey((prev) => prev + 1);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="task">
      <p>{task.title}</p>
      <p>{task.description}</p>
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
