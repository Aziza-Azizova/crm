import express from "express";
import { connectDB } from "../database/connection";
import dotenv from 'dotenv';
import { userRoutes } from "./routes/users.route";
import { projectRoutes } from "./routes/projects.route";
import { tasksRoutes } from "./routes/tasks.route";

dotenv.config();

const app = express();
const PORT = process.env.APP_PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({
 extended: true
}));

app.use('/', userRoutes);
app.use('/', projectRoutes);
app.use('/', tasksRoutes);

connectDB();

app.listen(PORT, () => {
 console.log(`Running on Port: ${PORT}`);
});