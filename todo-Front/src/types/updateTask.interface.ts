import type { ITask } from "@/types/task.interface";

export type IUpdateTask = Partial<ITask> & { _id: string };