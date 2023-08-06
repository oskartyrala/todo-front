import { useEffect, useState } from "react";
import TaskList from "./TaskList";
import AddTask from "./AddTask";
import "./App.css";
import axios from "axios";

export interface ITask {
  title: string;
  description: string;
  status: "done" | "not done" | "in progress";
  id: number;
}

function App(): JSX.Element {
  const [taskList, setTaskList] = useState<ITask[]>([]);
  const [key, setKey] = useState(0);

  const baseUrl =
    process.env.NODE_ENV === "production"
      ? "oskar-todo-server.onrender.com"
      : "localhost:4000";

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await axios.get(`http://${baseUrl}/tasks`);
        setTaskList(data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTasks();
  }, [key, baseUrl]);

  const notDoneTasks = taskList.filter((task) => task.status === "not done");
  const doneTasks = taskList.filter((task) => task.status === "done");
  const inProgressTasks = taskList.filter(
    (task) => task.status === "in progress"
  );

  return (
    <>
      <AddTask setKey={setKey} />
      <div className="taskArea">
        <TaskList tasks={notDoneTasks} setKey={setKey} />
        <TaskList tasks={inProgressTasks} setKey={setKey} />
        <TaskList tasks={doneTasks} setKey={setKey} />
      </div>
    </>
  );
}

export default App;
