import express  from "express";
import connectDB from "./data-source";
import { errorHandler } from "./middlewares/error.middleware";

const app = express();
const port = process.env.PORT ?? 3000;

connectDB.initialize()
.then(()=>{
    console.log("Data Source has been initialized!")
}).catch((err) => {
    console.error("Error during Data Source initialization", err)
})

app.use(errorHandler);

app.use(express.json());

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});