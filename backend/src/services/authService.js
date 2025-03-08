import Bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { User } from "../Models/user-management/administration/index.js"

export const hashPassword = async (password) => {
    try {
    const saltRounds = 10
    const hashedPassword = await Bcrypt.hash(password,saltRounds)  
    return hashedPassword
    } catch (error) {
       throw new Error(error)
    }
}

export const comparePassword = async (password,hashedPassword) => {
    try {
     const password_match_status = await Bcrypt.compare(password,hashedPassword) 
     return password_match_status
    } catch (error) {
      throw new Error(error)  
    }
}

export const generateToken = async (user) => {
    try {
        const token = await jwt.sign({ _id: user?._id, email: user.email, role: user.role, uuid: user?.uuid, user_type: "customer"},process.env.JWT_SECRET,{ expiresIn: "24h"}) 
        
     return token  
    
    } catch (error) {
      throw new Error(error)  
    }

    
}

export const decodeToken = (token) => {
    try {
        const decode = jwt.verify(token,process.env.JWT_SECRET)
        return decode 
    } catch (error) {
      if(error.message==="jwt expired"){
        return {status:"failed",message:error.message}
      }
      return {status:"failed",message:error.message,data:null}
    }

}

export const VerifyToken = async (req, res, next) => {
    try {
        const token = req.headers['authorization'];
        if (!token) {
            return res.status(500).json({ status: "failed", message: "Authentication credentials not provided" });
        }
        
        if (!token.split(" ").includes("Token")) {
            return res.status(500).json({ status: "failed", message: "Token not in the correct format" });
        }
  
        const decoded = decodeToken(String(token.split(" ").slice(-1)[0]));
        
        if (decoded.status === "failed" && decoded.message === "jwt expired") {
            return res.status(401).json({ 
                status: "failed", 
                message: "Your session has expired. Please log in again", 
                status: "session_expired" 
            });
        } 
        
        if (decoded.status === "failed") {
            return res.status(401).json({ status: "failed", message: decoded.message });
        }
  
        const user = await User.findOne({ email: decoded?.email });
        if (!user) {
            return res.status(404).json({ status: "failed", message: "User not found" });
        }
  
        req.user = user;
        next();
    } catch (error) {
        return res.status(500).json({ status: "failed", message: error.message, data: null });
    }
  };
  