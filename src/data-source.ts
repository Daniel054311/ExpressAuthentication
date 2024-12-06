import { DataSource } from "typeorm";



const connectDB = new DataSource({
    type: "postgres",
    host: "localhost",
    url: process.env.DATABASE_URL,
    logging: true,
    ssl: false, 
    synchronize: true,
    entities: [__dirname + "/../src/entities/**/*.ts"],
})


export default connectDB;