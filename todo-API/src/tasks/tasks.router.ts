import express, { Request, Response, Router } from "express";
import { validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";
import { inject, injectable } from "inversify";
import { IPartialTaskWithId, ITask } from "./interfaces/task.interface";
import { TasksController } from "./tasks.controller";
import { createTaskValidator } from "./validators/createTask.validator";
import { getTasksValidator } from "./validators/getTasks.validator";
import { updateTaskValidator } from "./validators/updateTask.validator";

@injectable()
export class TasksRouter {
    public router: Router;

    constructor(
        @inject(TasksController) private tasksController: TasksController
    ) {
        this.router = express.Router();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get("/",
            getTasksValidator,
            async (req: Request, res: Response) => {
                const result = validationResult(req);
                if (result.isEmpty()) {
                    const allTasks = await this.tasksController.handleGetTask(req, res);
                    res.status(StatusCodes.OK).json(allTasks);
                } else {
                    res.status(StatusCodes.BAD_REQUEST).json(result.array());
                }
            });

        // Post Route
        this.router.post("/create",
            createTaskValidator,
            async (req: Request<{}, {}, ITask>, res: Response) => {
                const result = validationResult(req);
                if (result.isEmpty()) {
                    const newTask = await this.tasksController.handlePostTask(req, res);
                    res.status(StatusCodes.CREATED).send(newTask).json();
                } else {
                    res.status(StatusCodes.BAD_REQUEST).json(result.array());
                }
            });

        // Patch Route
        this.router.patch("/update",
            updateTaskValidator,
            async (req: Request<{}, {}, IPartialTaskWithId>, res: Response) => {
                const result = validationResult(req);
                if (result.isEmpty()) {
                    const updatedTask = await this.tasksController.handlePatchTask(req, res);
                    res.status(StatusCodes.OK).json(updatedTask)
                } else {
                    res.status(StatusCodes.BAD_REQUEST).json(result.array())
                }
            });
    }
}