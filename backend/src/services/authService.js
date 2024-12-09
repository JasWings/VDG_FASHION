import Bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

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
     const token = await  jwt.sign({ email: user.email, role: user.role, uuid: user?.uuid, user_type: "customer"},process.env.JWT_SECRET,{ expiresIn: "24h"}) 
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