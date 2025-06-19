import { Container } from "inversify";
import { GetTasksProvider } from "../tasks/providers/getTasks.provider";
import { UpdateTaskProvider } from "../tasks/providers/updateTask.provider";
import { TasksController } from "../tasks/tasks.controller";
import { TasksRouter } from "../tasks/tasks.router";
import { TaskService } from "../tasks/tasks.service";
import { UserController } from "../user/user.controller";

export const container: Container = new Container();
/* Tasks */
container.bind(TasksController).toSelf().inTransientScope();
container.bind(TasksRouter).toSelf().inTransientScope();
/* Users */
container.bind(UserController).toSelf().inTransientScope();

container.bind(TaskService).toSelf().inTransientScope();
container.bind(UpdateTaskProvider).toSelf().inTransientScope();
container.bind(GetTasksProvider).toSelf().inTransientScope();
