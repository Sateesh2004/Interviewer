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

app.use('/auth',routes)


app.get("/validate/:username", async (req, res) => {
    try {
      const { username } = req.params;
      const token = req.cookies.jwt;
      if (!token) {
        return res.status(401).json({ message: "No token provided" });
      }
      const decoded = jwt.verify(token, "12345678qwert");
      console.log("Decoded token:", decoded);
      if (username !== decoded.username) {
        return res.status(401).json({ message: "Unauthorized User" })
      }
      return res.status(200).json({ message: "Token is valid", user: decoded });
    } catch (error) {
      console.error("Token validation error:", error);
      return res.status(401).json({ message: "Invalid token" });
    }
  });
app.listen(port,()=>{
    connect()
    console.log(`http://localhost:${port}`)
})