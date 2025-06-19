import type { ITask } from "./task.interface";

export type ITaskCounter = Pick<ITask, "status"> & { count: number };