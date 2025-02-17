import jwt from "jsonwebtoken";
const SECRET_KEY = process.env.JWT_SECRET || "mysecretkey"; // Secret key for JWT
import  { Request,Response,NextFunction} from "express";
interface AuthenticatedRequest extends Request {
  user?: { id: string; name: string; email: string }; // Modify according to your user object
}

const verifyToken = (req:AuthenticatedRequest, res:Response, next:NextFunction) => {
    const token = req.header("Authorization")?.split(" ")[1];
  
    if (!token) return res.status(401).json({ error: "Access denied" });
  
    try {
      const decoded = jwt.verify(token, SECRET_KEY);
      req.user = decoded;
      next();
    } catch (err) {
        console.log(err)
      res.status(403).json({ error: "Invalid token" });
    }
  };

  export default verifyToken
  