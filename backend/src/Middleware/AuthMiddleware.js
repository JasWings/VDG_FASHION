import jwt from "jsonwebtoken";

export const requireSignIn = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer")) {
        return res.status(401).json({
            success: false,
            message: "Authorization header missing or invalid",
        });
    }

    const token = authHeader.split(" ")[1];
    console.log(token,"tokennnn")

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded, "des")
        req.user = {
            ...decoded,
            _id: decoded._id
        };
        
        next();
        
    } catch (error) {
        console.error("JWT verification failed:", error.message);
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token",
        });
    }
};


// export const protect = async (req, res, next) => {
//     let token;

//     if (req.headers.authorization && req.headers.authorization.startsWith('Token')) {
//         try {
//             console.log("Authorization Header:", req.headers.authorization);

//             // Extract token
//             token = req.headers.authorization.split(' ')[1];

//             if (!token || token === "null" || token === "undefined") {
//                 return res.status(401).json({ message: "Invalid token provided" });
//             }

//             console.log("Extracted Token:", token);

//             // Validate JWT structure (must have 3 parts separated by dots)
//             if (token.split('.').length !== 3) {
//                 return res.status(401).json({ message: "Malformed token" });
//             }

//             // Verify token
//             const decoded = jwt.verify(token, process.env.JWT_SECRET);
//             console.log("Decoded Token:", decoded);

//             // Fetch user from database
//             req.user = await User.findById(decoded.id || decoded._id).select('-password');

//             if (!req.user) {
//                 return res.status(401).json({ message: "User not found" });
//             }

//             next();
//         } catch (error) {
//             console.error("JWT Verification Error:", error.message);
//             return res.status(401).json({ message: "Not authorized, invalid token" });
//         }
//     } else {
//         return res.status(401).json({ message: "Not authorized, no token" });
//     }
// };




