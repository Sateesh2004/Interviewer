import jwt from "jsonwebtoken"
const token=(user,res)=>{
    const signeduser = {
        username:user.username,
        email:user.email
    }
    
    const token = jwt.sign({signeduser},"12345678qwert",{expiresIn:"10days"})
    
    res.cookie("jwt",token,
        {
            httpOnly: false,  // Make it accessible from frontend if needed
            secure: true,     // Ensure secure is set to true if SameSite is None
            sameSite: 'None', // Allow cross-origin
        }
    )
    return res.status(201).json({message:"Token created and User authenticated",
        user:signeduser
    })

}
export default token