import jwt from 'jsonwebtoken';

export const verifyToken=(req,res,next)=>{
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorised user!",
      });
    }
    try {
      const decoded = jwt.verify(token, "secretkey");
      req.user = decoded;
      next();
    } catch (err) {
      res.status(401).json({
        success: false,
        message: "Unauthorised user!",
      });
    }
}