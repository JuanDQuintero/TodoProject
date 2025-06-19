import { Model, model, Schema } from 'mongoose';
import { ITask } from './interfaces/task.interface';

const taskSchema: Schema<ITask> = new Schema({
    title: {
        type: String,
        required: [true, "Task title is required"],
        maxlength: [100, "Title cannot be more than 100 chars"],
        trim: true,
    },
    description: {
        type: String,
        required: true,
        maxlength: 500,
        trim: true
    },
    status: {
        type: String,
        required: true,
        enum: ["todo", "inProgress", "completed"],
        default: "todo"
    },
    priority: {
        type: String,
        required: true,
        enum: ["low", "normal", "high"],
        default: "normal"
    },
    dueDate: {
        type: Date,
        required: true,
    },
}, {
    timestamps: true
});

export const Task: Model<ITask> = model("Task", taskSchema);