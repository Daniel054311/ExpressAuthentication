import express  from "express";
import connectDB from "./data-source";
import { errorHandler } from "./middlewares/error.middleware";
import authRouter from "./routes/auth.routes";
import cors from "cors";
import helmet from "helmet";
import productRouter from "./routes/product.routes";
import cookieParser from 'cookie-parser';

const app = express();
const port = process.env.PORT ?? 3000;

connectDB

app.use(errorHandler);
app.use(cookieParser()); 
app.use(helmet());
app.use(cors({
    origin: "http://localhost:4200",
    methods: ["GET", "POST", "PUT", "DELETE"],
}));

app.use(express.json());

app.use("/api/v1", authRouter);
app.use("/api/v1",productRouter);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});