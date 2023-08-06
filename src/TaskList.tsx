import Task from "./Task";
import { ITask } from "./App";

interface ListProps {
  tasks: ITask[];
  setKey: React.Dispatch<React.SetStateAction<number>>;
}

export default function TaskList({ tasks, setKey }: ListProps): JSX.Element {
  return (
    <div className="taskList">
      {tasks.map((task) => (
        <Task {...task} task={task} setKey={setKey} key={task.id} />
      ))}
    </div>
  );
}
