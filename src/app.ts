import Express, { Application, json } from "express";

import helmet from "helmet";

import morgan from "morgan";

import componentRouter from "./components/components-route.routes";

import { errorHandler } from "./utils/helpers";

const app: Application = Express();

app.use(json());

app.use(helmet());

app.use(morgan("combined"));

app.use(componentRouter);

app.use(errorHandler);

export default app;
