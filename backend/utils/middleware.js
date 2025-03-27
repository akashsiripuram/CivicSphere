import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.token; // ✅ Make sure token is being received correctly
  console.log("Token Received:", token); // Debugging purpose

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized user!",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // ✅ Use environment variable for secret
    req.user = decoded;
    next();
  } catch (err) {
    res.clearCookie("token"); // ✅ Remove invalid token
    res.status(401).json({
      success: false,
      message: "Unauthorized user! Token expired or invalid.",
    });
  }
};
