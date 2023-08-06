import { ITask } from "../App";
import isOverdue from "./isOverdue";

export default function filterTasks(
  task: ITask,
  today: string,
  filterMode: "all" | "overdue"
): boolean {
  if (filterMode === "overdue") {
    return isOverdue(task.due, today);
  }
  return true;
}
