import { Request, Response } from "express";
import { matchedData } from "express-validator";
import { inject, injectable } from "inversify";
import { Document } from "mongoose";
import { UserController } from "../user/user.controller";
import { IPartialTaskWithId, ITask } from "./interfaces/task.interface";
import { ITaskPagination } from "./interfaces/taskPagination.interface";
import { GetTasksProvider } from "./providers/getTasks.provider";
import { UpdateTaskProvider } from "./providers/updateTask.provider";
import { TaskService } from "./tasks.service";

@injectable()
export class TasksController {
    constructor(@inject(UserController) private userController: UserController,
        @inject(TaskService) private taskService: TaskService,
        @inject(UpdateTaskProvider) private updateTaskProvider: UpdateTaskProvider,
        @inject(GetTasksProvider) private getTasksProvider: GetTasksProvider,
    ) { }

    public async handleGetTask(req: Request, res: Response) {
        const validateData: Partial<ITaskPagination> = matchedData(req);
        try {
            const tasks: {
                data: ITask[]; meta: {}
            } = await this.getTasksProvider.findAllTasks(validateData);
            return tasks;
        } catch (error: any) {
            throw new Error(error);
        }
    }

    public async handlePostTask(req: Request<{}, {}, ITask>, res: Response) {
        const validateData: ITask = matchedData(req);
        try {
            return await this.taskService.createTask(validateData);
        } catch (error: any) {
            throw new Error(error);
        }
    }

    public async handlePatchTask(req: Request<{}, {}, IPartialTaskWithId>, res: Response): Promise<Document> {
        const validateData: IPartialTaskWithId = matchedData(req);
        try {
            return await this.updateTaskProvider.updateTask(validateData);
        } catch (error: any) {
            throw new Error(error)
        }
    }
}