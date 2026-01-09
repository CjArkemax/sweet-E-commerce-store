import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";

import productRoutes from "./routes/productRoutes.js"// important to add .js or else it will crash  
import {sql} from "./config/db.js"

dotenv.config()// after importing use this

const app = express();
const PORT= process.env.PORT;
console.log(PORT);


app.use(express.json());
app.use(cors());
app.use(helmet());// security middleware  that helps us protect our app by setting various http headers
app.use(morgan("dev"));// to log the request


app.use("/api/products",productRoutes)

async function initdb(){
    try {
        await sql`
            CREATE TABLE IF NOT EXISTS products(
                id  SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                image VARCHAR(255) NOT NULL,
                price DECIMAL(10,2) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `
        console.log("database initailized succesfully!!")
    } catch (error) {
        console.log("error while initializing db",error)
    }
}


initdb().then(()=>{
    app.listen(PORT,()=>{
    console.log(`server is running on port http://localhost:${PORT}`)
    });
});
