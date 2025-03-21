import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'
import listingRouter from './routes/listing.route.js'
import cookieParser from 'cookie-parser';
import path from 'path'
dotenv.config();

console.log("MongoDB URI:", process.env.MONGO); // Debugging line

if (!process.env.MONGO) {
    console.error("Error: MONGO URI is not defined in .env file!");
    process.exit(1);
}

mongoose.connect(process.env.MONGO)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Error connecting to MongoDB:", err));

 const __dirname=path.resolve();

const app = express();
app.use(express.json())
app.use(cookieParser())
app.listen(3000, () => console.log("Server is running on port 3000!!!"));


app.use("/api/user",userRouter);
app.use("/api/auth",authRouter);
app.use("/api/listing",listingRouter)

app.use(express.static(path.join(__dirname,'/client/dist')))

app.get('*',(req,res,next)=>{
    res.sendFile(path.join(__dirname,'client','dist','index.html'))
})
app.use((err,req,res,next)=>{
    const statusCode=err.statusCode||500;
    const message=err.message||"internal server error"
    return res.status(statusCode).json({
        success:false,
        statusCode,
        message
    });
});
