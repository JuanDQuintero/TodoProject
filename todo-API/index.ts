import cors, { CorsOptions } from "cors";
import * as dotenv from "dotenv";
import express, { Express } from "express";
import mongoose from "mongoose";
import 'reflect-metadata';
import { addRoutes } from "./src/config/routes.config";
import { responseFormatter } from "./src/middleware/responseFormatter.middleware";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

let corsOptions: CorsOptions = {
  origin: "http://example.com",
}

app.use(cors());

app.use(express.json());
app.use(responseFormatter);

addRoutes(app);

async function bootstrap() {

  if (!process.env.DATABASE_URL) {
    throw new Error("cannot read enviroment variables")
  }

  try {
    await mongoose.connect(
      process.env.DATABASE_URL, {
      dbName: process.env.DATABASE_NAME
    }
    );
    console.log("Connected to MongoDb");

    app.listen(port, () => {
      console.log(`[server]: Server is running at http://localhost:${port}`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

bootstrap();
