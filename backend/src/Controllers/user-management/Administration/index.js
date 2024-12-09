import Validations from "../../../Validations/index.js";
import { Role, Tokens, User } from "../../../Models/user-management/administration/index.js";
import { comparePassword, generateToken, hashPassword } from "../../../services/authService.js";

export const createUser = async (req, res) => {
  try {
    const validatedData = Validations.validateUser(req.body);

    const { email, phone_number, first_name, last_name, password, confirm_password } = validatedData;

    const ifExists = await User.findOne({ email: email, phone_number: phone_number})
   
    if(ifExists ){
        throw new Error("Email or Phone number already exists")
    }

    const encrypt_password = await hashPassword(password)

    const role_details = await Role.findOne({ identity: "customer"})

    const user = new User({
      email,
      phone_number,
      first_name,
      last_name,
      password : encrypt_password,
      roleId: role_details?._id
    });

    await user.save();

    const token = await generateToken(user)
    const save_token = new Tokens({ token: token, email: email})
    await save_token.save()
    res.status(201).json({ status: 'sucess', message: "User created successfully", data: { token , uuid: user?._id} });
  } catch (error) {
    res.status(500).json({ status: 'failed' , message: error.message });
  }
};

export const loginUser = async (req,res) => {
    try {
    const value = await Validations.loginValidations(req.body)
    const { email, password } = value 
    
    const user = await User.findOne({ email: email })

    if(!user){
        throw new Error("User not found with this credentials")
    }

    const checkPassword = comparePassword(password,user?.password)

    if(checkPassword){
        const token = await Tokens.findOne({ email: email })
        
        if(token){
           return res.status(200).json({ status: 'success', message: "Login successfully", data : { token: token.token , uuid: user?.uuid}})
        }

        const new_token = await generateToken(user)
        const saved_token = await Tokens.create({ email,token: new_token })
        return res.status(200).json({ status: "success", message: "Login successfully", data: { uuid : user?.uuid , token : saved_token.token }})
    }else{
        throw new Error("Password dosen't match")
    }


    } catch (error) {
      res.status(500).json({ status: "failed", message: error?.message }) 
    }
}
