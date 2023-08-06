import { useEffect, useState } from "react";
import TaskList from "./TaskList";
import AddTask from "./AddTask";
import "./App.css";
import axios from "axios";
import sortTasks from "./utils/sortTasks";
import Sorting from "./Sorting";
import filterTasks from "./utils/filterTasks";

export interface ITask {
  title: string;
  description: string;
  status: "done" | "not done" | "in progress";
  id: number;
  due: string;
  created: number;
}

function App(): JSX.Element {
  const [taskList, setTaskList] = useState<ITask[]>([]);
  const [key, setKey] = useState(0);
  const [sorting, setSorting] = useState("createdChronological");
  const [filterMode, setFilterMode] = useState<"all" | "overdue">("all");

  const baseUrl =
    process.env.NODE_ENV === "production"
      ? "https://oskar-todo-server.onrender.com"
      : "http://localhost:4000";

  const today = new Date();
  const formattedToday = today
    .toLocaleDateString("en-GB", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .split("/")
    .reverse()
    .join("-");

  console.log(`today is ${formattedToday}`);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await axios.get(`${baseUrl}/tasks`);
        setTaskList(data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTasks();
  }, [key, baseUrl]);

  const filteredTasks = taskList.filter((task) =>
    filterTasks(task, formattedToday, filterMode)
  );

  const sortedTasks = filteredTasks.sort((a, b) => sortTasks(a, b, sorting));

  const notDoneTasks = sortedTasks.filter((task) => task.status === "not done");
  const doneTasks = sortedTasks.filter((task) => task.status === "done");
  const inProgressTasks = sortedTasks.filter(
    (task) => task.status === "in progress"
  );

  return (
    <>
      <AddTask setKey={setKey} />
      <Sorting setSorting={setSorting} setFilterMode={setFilterMode} />
      <div className="taskArea">
        <TaskList tasks={notDoneTasks} setKey={setKey} />
        <TaskList tasks={inProgressTasks} setKey={setKey} />
        <TaskList tasks={doneTasks} setKey={setKey} />
      </div>
    </>
  );
}

export default App;
