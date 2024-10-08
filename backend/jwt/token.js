import jwt from "jsonwebtoken"
const token=(user,res)=>{
    
        const username=user.username
        
    
    const token = jwt.sign({username},"12345678qwert",{expiresIn:"10days"})
    
    res.cookie("jwt",token,
        {
            httpOnly: false,  // Make it accessible from frontend if needed
            secure: true,     // Ensure secure is set to true if SameSite is None
            sameSite: 'None', // Allow cross-origin
        }
    )
    return res.status(201).json({message:"Token created and User authenticated",
        username:username
    })

}
export default token