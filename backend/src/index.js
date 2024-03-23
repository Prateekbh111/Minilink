import dotenv from "dotenv";
import { connectToDatabase } from "./db/index.js";
import { app } from "./app.js";

dotenv.config({
	path: "./.env",
});

const servingPort = process.env.PORT || 3000;

connectToDatabase(`${process.env.DB_URI}/${process.env.DB_NAME}`)
	.then(
		app.listen(servingPort, () => {
			console.log(`⚙️ Server is running at port : ${process.env.PORT} 🟢`);
		})
	)
	.catch((err) => {
		console.log(
			"Failed to start the server, no connection with database established 🚩",
			err
		);
	});
