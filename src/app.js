import express from "express";
import cookieParser from "cookie-parser";
import UserRouter from "./routes/user.routes.js";
import GameRouter from ".router/game.router.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use("/api", [UserRouter, GameRouter]);

app.listen(PORT, () => {
    console.log(PORT, "서버 열림");
});