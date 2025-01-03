import { config, parse } from "dotenv";
config();

import fastify from "fastify";
import cors from "@fastify/cors";
import { userRoutes } from "./routes/users.js";

const app = fastify();

app.register(cors, { origin: true }); // change later
app.register(userRoutes);

app.listen({ port: parseInt(process.env.PORT) });
