const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.JWT_SECRET || "mysecretkey"; // Secret key for JWT

const verifyToken = (req, res, next) => {
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

  module.exports=verifyToken
  