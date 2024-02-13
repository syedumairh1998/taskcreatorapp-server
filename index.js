import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";

import { userRouter } from "./routes/userRoutes.js";
import { taskRouter } from "./routes/taskRoutes.js";
import { createDBConnection } from "./config/createDBConnections.js";

(async () => {
  dotenv.config();
  const app = express();

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  const corsOptions = {
    credentials: true,
    origin: ["http://localhost:3000"], // Whitelist the domains you want to allow
  };

  app.use(cors(corsOptions)); // Use the cors middleware with your options

  console.log("creating database connections ...");
  await createDBConnection();

  app.use("/user", userRouter);
  app.use("/tasks", taskRouter);

  const port = process.env.port || 4000;
  app.listen(port, () => console.log("port running at ", port));
})();
