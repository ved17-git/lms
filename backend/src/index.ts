import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import mongoose from 'mongoose'
import router from './routes/route.js'
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const app=express()
const PORT=process.env.PORT


app.use(express.json())
app.use(cors())

// Serve uploaded files statically
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
 
app.use("/api", router);
 

async function connectDB() {
    try {
        const res=  await mongoose.connect(process.env.MONGODB_URL as string)

        if(res){
            console.log(`connected to db`);
        }
    
    } catch (error) {
        console.log("db connection err", error);
        return
    }
}
connectDB()

app.get('/',(req,res)=>{
    res.json({
        msg:"test /"
    })
})

app.listen(PORT,()=>{
    console.log(`listenting on ${PORT}`);
})

