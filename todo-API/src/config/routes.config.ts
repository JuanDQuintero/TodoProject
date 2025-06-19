import { Application } from "express";
import { TasksRouter } from "../tasks/tasks.router";
import { container } from "./container.config";

export function addRoutes(app: Application): Application {
    const tasksRouter: TasksRouter = container.get<TasksRouter>(TasksRouter);

    app.use("/tasks", tasksRouter.router);

    return app;
}