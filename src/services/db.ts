import mongoose from "mongoose";
import { appConfig } from "../../src/utils/config";

mongoose.connection.once("open", () => {
  console.log("MongoDB connection ready!");
});

mongoose.connection.on("error", (err) => console.error(err));
mongoose.set("strictQuery", false);

async function connectDB() {
  await mongoose.connect(appConfig.MONGODB_URI as string);
}

async function closeDB() {
  await mongoose.disconnect();
}

export { connectDB, closeDB };
