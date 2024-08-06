import mongoose from "mongoose";

const conToDatabase = async () => {
	const dbConnectString: string = process.env.DBCONNECT_STRING as string;

	if (!dbConnectString) {
		console.error("Database connection string is not defined");
		process.exit(1);
	}

	try {
		const terkoneksi = await mongoose.connect(dbConnectString);
		console.log("Database connected successfully", terkoneksi.connection.host, terkoneksi.connection.name);
	} catch (error) {
		console.error("Database connection error:", error);
		process.exit(1);
	}
};

export default conToDatabase;
