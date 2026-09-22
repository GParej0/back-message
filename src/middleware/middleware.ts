import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken";
function verifyToken(req: Request, res: Response, next: NextFunction) {

    const bearerHeader = req.headers['authorization'];

    if (!bearerHeader || !bearerHeader.startsWith("Bearer ")) {

        return res.status(401).json({ error: "No token o invalid format" });
    }

    const token = bearerHeader.split(" ")[1]

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET!);
        (req as any).user = decoded;

        next()

    } catch (error) {

        return res.status(403).json({ error: "Invalid or expired token" });

    }

}

export default verifyToken