import type { NextFunction, Response } from "express";
import type AuthenticatedRequest from "../extendedReq";
import { verifyTok } from "../helpers/jwt";

const ValidateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const authenticated = req.cookies.token;
        if (!authenticated){
            res.status(401).json({ message: "Token not found" });
        }

        if (authenticated){
            try {
                const decoded = verifyTok(authenticated);
                req.user = decoded;
                next();
            } catch (error) {
                res.status(401).json({ message: "Token invalid" });
            }
        }
}

export default ValidateToken;
