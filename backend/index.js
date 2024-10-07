import express from "express"
import cors from "cors"
import dotenv from 'dotenv'
import jwt from "jsonwebtoken"
import connect from "./config/db.js"
import user from "./models/user.model.js"
import routes from "./routes/userRoutes.js"
import cookieParser from "cookie-parser"

dotenv.config({path:".env.local"})
const app = express()
app.use(cors({
    origin: 'http://localhost:3000',  // Your frontend's origin
    credentials: true,                // Allow credentials (cookies)
}));
app.use(cookieParser())
app.use(express.json());

const port = process.env.PORT
app.get('/',(req,res)=>{
    res.send("Hello")
})
app.get('/profile',(req,res)=>{
    const token = req.cookies.jwt
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, "12345678qwert");
        res.status(200).json({ message: 'Welcome to the profile page', user: decoded });
    } catch (err) {
        console.log(err)
        res.status(403).json({ message: "err" });
    }
})
app.use('/auth',routes)
app.listen(port,()=>{
    connect()
    console.log(`http://localhost:${port}`)
})