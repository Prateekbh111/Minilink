import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { router as urlRoute } from "./routes/url.routes.js";
import { router as userRoute } from "./routes/users.routes.js";
import { verifyUser } from "./middlewares/auth.middleware.js";
import { handleGetUserUrls } from "./controllers/user.controller.js";

var corsOptions = {
	origin: "http://localhost:5173",
	credentials: true, // Allow credentials (cookies) to be sent
	optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/api/url", verifyUser, urlRoute);
app.use("/api/user", userRoute);
app.use("/api/getAllUrls", verifyUser, handleGetUserUrls);

export { app };
