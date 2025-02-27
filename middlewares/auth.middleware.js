import jwt from "jsonwebtoken";

// import dotenv from "dotenv";



//to hide secret key process.env used  process.env.JWT_SECRET || 

const SECRET_KEY ="secretkey";

export function authenticateUser(req, res, next) {
    const token = req.header("Authorization");

    if (!token) {
        return res.status(403).json({ message: "Access denied. No token provided." });
    }

    try {
        // .replace("Bearer ", "") part removes the "Bearer " prefix**, leaving only the actual token.
        const decoded = jwt.verify(token.replace("Bearer ", ""), SECRET_KEY);
        req.user = decoded;

        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
}
