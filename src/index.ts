import express from "express";
import { connectDB } from "../database/connection";

const app = express();
const PORT = 3000;

app.use(express.json());

app.listen(PORT, async () => {
 await connectDB();
 console.log(`Running on Port: ${PORT}`);
});