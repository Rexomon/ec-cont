import express from "express";
import cookieParser from "cookie-parser";
import conToDatabase from "./Database/dataBaseConn.ts";
import contactRouter from "./routes/contactRouting";
import userRouter from "./routes/userRouting";
import itemRouter from "./routes/itemRouting";
import cors from "cors";
import type { Response } from "express";
const app = express();
const port = process.env.PORT || 5000;

conToDatabase();

const corsOptions = {
	origin: "https://riylunz.website",
	credentials: true,
};

app.get("/", (req, res: Response) => {
    res.status(200).json({ test: "Kamu berhasil masuk" });
});

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use("/contact", contactRouter);
app.use("/user", userRouter);
app.use("/item", itemRouter);

app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}/`);
});

export default app;
