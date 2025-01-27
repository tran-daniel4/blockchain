import jwt from "jsonwebtoken";

export const authMiddleware = async (req, res, next) => {
    const token = req.header("Authorization").slice(7); // Due to "Bearer " in the token

    if (!token) {
        return res.status(401).json({ message: "Access denied, no token found "});
    }
    try {
        const secret = process.env.JWT_SECRET;
        const verify = jwt.verify(token, secret);
        req.user = verify;
    
        next();

    } catch (error) {
        console.error(error.stack);
        return res.status(400).json({ message: "Unable to verify token"});
    }
}