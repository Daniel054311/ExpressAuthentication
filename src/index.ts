import express  from "express";
import connectDB from "./data-source";
import { errorHandler } from "./middlewares/error.middleware";
import authRouter from "./routes/auth.routes";

const app = express();
const port = process.env.PORT ?? 3000;

connectDB

app.use(errorHandler);

app.use(express.json());
app.use("/api/auth",authRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});