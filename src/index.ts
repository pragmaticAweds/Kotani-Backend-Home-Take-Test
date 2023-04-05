import Express, { Application } from "express";
import app from "./app";
import { connectDB } from "./services/db";

const server: Application = Express();

server.use(app);

async function startServer() {
  connectDB();
  server.listen(9000, () => {
    console.log("listening to port " + 9000);
  });
}

startServer();
