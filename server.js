import express from "express";
import cors from "cors"
import { configDotenv } from "dotenv";
configDotenv();
import productRoutes from "./routes/product.route.js"
import mongoose from "mongoose";
import { registerUser, loginUser, logoutUser } from "./controllers/user.controllers.js";
import  handler  from "./app/api/checkout.js";


const app = express()
app.use(express.json())
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}))
app.use(express.urlencoded({ extended: true }));

app.get("/", (req,res)=>{
 res.send("main page")
})
app.use("/api/products", productRoutes)
app.use("/user/register", registerUser)
app.use("/api/checkout", handler)
app.use("/user/login", loginUser)
app.use("/user/logout", logoutUser)
const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log("server is run on " + PORT);
    
})
 const db = mongoose.connect(process.env.MONGO_URI)
console.log(`db connected`+ process.env.MONGO_URI);
