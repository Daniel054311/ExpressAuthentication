

import { DataSource } from "typeorm";
import * as dotenv from "dotenv";


dotenv.config();

const connectDB = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST, 
    port: Number(process.env.DB_PORT ?? 5432),       
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD, 
    database: process.env.DB_NAME,
    ssl: false,
    synchronize: true,
    entities: [__dirname + "/../src/entities/**/*.ts"],
})



connectDB.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })

    export default connectDB