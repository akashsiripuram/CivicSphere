import jwt from 'jsonwebtoken';

export const verifyToken=(req,res,next)=>{
    const token=req.headers.authorization?.split(" ")[1];
    if(!token){
        return res.status(401).json({msg:"Unauthorized"});
    }
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        req.user=decoded;
        next();

    }
    catch(error){
        return res.status(401).json({msg:"Token is invalid"});
    }
}