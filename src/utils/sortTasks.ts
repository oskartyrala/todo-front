import { ITask } from "../App";

export default function sortTasks(
  taskA: ITask,
  taskB: ITask,
  sorting: string
): number {
  switch (sorting) {
    case "createdChronological":
      return taskA.created < taskB.created ? -1 : 1;

    case "createdReverseChronological":
      return taskA.created > taskB.created ? -1 : 1;
  }

  return 0;
}
