import token from "../jwt/token.js";
import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
const register = async  (req,res)=>{
    
        try{
            const {username,email,password}=req.body
            const hashedpassword = await bcrypt.hash(password, 8);
            const user = await User.findOne({username})
            const useremail = await User.findOne({email})
            if(user && !useremail){
                return res.status(403).json({message:"Username already taken try with different username"})
            }
            if(user&&useremail){
                return res.status(402).json({message:"User registered Pls login"})
            }
            if(!user&&useremail){
                return res.status(409).json({message:"User with this email address already exist."})
            }
            const newUser = new User({username,email,password:hashedpassword})
            await newUser.save()
            res.status(201).json({message:"User Registered Successfully"})
        }
        catch(error){
                res.status(500).json({message:error.message})
        }
        

    
}
const signin = async(req,res)=>{
        try{
                const{username,password}=req.body
                const user = await User.findOne({username})
                if(!user){
                        return res.status(404).json({message:"User not found"})
                }
                const is_true = await bcrypt.compare(password, user.password);
                console.log(is_true)
                if(is_true){
                        token(user,res)
                }
                else{
                        return res.status(404).json({message:"Wrong Password"})
                }
        }
        catch(error){
                
                res.status(401).json({message:error.message})
        }
        



}
export {register,signin}