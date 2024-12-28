    import jwt from "jsonwebtoken";
    import userModel from "../src/Models/UserModel.js";

    export const requireSignIn = async (req, res, next) => {
        // const authHeader = req.headers.authorization;

        // if (!authHeader) {
        //     return res.status(401).json({
        //         success: false,
        //         message: 'Authorization header missing or invalid',
        //     });
        // }

        // const token = authHeader.split(' ')[1];

        try {
            const decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
            req.user = decoded;
            next();
        } catch (error) {
            console.error('JWT verification failed:', error);
            return res.status(401).json({
                success: false,
                message: 'Invalid or expired token',
            });
        }
    };

