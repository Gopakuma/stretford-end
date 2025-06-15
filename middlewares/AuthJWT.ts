import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/utils.js";

interface CustomRequest extends Request {
    user?: any;
}

export const authenticateJWT = (req: CustomRequest, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1]; // Extract token from header

    if (!token) {
        res.status(401).json({ message: "Unauthorized: No token provided" });
        return;
    }


    const decoded = verifyToken(token);
    if (!decoded) {
        res.status(403).json({ message: "Forbidden: Invalid token" });
        return;
    }

    req.user = decoded; // Attach user data to request
    next();
};
