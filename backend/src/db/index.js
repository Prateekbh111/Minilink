import mongoose from "mongoose";

async function connectToDatabase(url) {
	try {
		const connectionInstance = await mongoose.connect(url);
		// console.log(connectionInstance.connection);
		console.log(
			`MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`
		);
	} catch (error) {
		console.log("MONGODB connection FAILED ", error);
		process.exit(1);
	}
}

export { connectToDatabase };
