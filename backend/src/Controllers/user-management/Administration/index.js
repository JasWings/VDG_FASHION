import Validations from "../../../Validations/index.js";
import { Otps, Role, Tokens, User } from "../../../Models/user-management/administration/index.js";
import { comparePassword, generateToken, hashPassword } from "../../../services/authService.js";
import { generateOtp, sentOtpEmail } from "../../../utils/helpers.js";

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

    const find_otp = await Otps.findOne({ email: email })


    const new_token = await generateToken(user)
    const save_token = new Tokens({ token: new_token, email: user?.email})
    await save_token.save()
    res.status(201).json({ status: 'sucess', message: "User created successfully", data: { new_token , uuid: user?._id} });

    
    // const new_token = await generateToken(user)
    // const save_token = new Tokens({ token: new_token, email: email})
    // await save_token.save()
    // res.status(201).json({ status: 'sucess', message: "User created successfully", data: { token , uuid: user?._id} });
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

    const checkPassword = await comparePassword(password,user?.password)
    
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

export const verifyOtp = async (req,res) => {
  try {
   const value = Validations.OtpValidation(req.body)
   const otp_details = await Otps.findOne({  otp: value?.otp, token: value?.token, validated: false }) 

   if(!otp_details){
    throw new Error("Invalid OTP or token or OTP expired");
   }

    await Otps.findOneAndUpdate({ email: otp_details?.email },{ validated: true})
    
    const user = await User.findOne({ email: otp_details?.email })
    const new_token = await generateToken(user)
    const save_token = new Tokens({ token: new_token, email: user?.email})
    await save_token.save()
    res.status(201).json({ status: 'sucess', message: "User created successfully", data: { new_token , uuid: user?._id} });
  } catch (error) {
    res.status(500).json({ status: "failed", message: error?.message })
  }
}

export const getUserInfo = async (req,res) => {
  try {
   const user = req.user 
   res.status(200).json({ status: "success", message: "User details retrieved successfully",data: user}) 
  } catch (error) {
    res.status(500).json({ status: "failed", message: error?.message })
  }
}

export const ChangePassword = async (req,res) => {
  try {
  const value = await Validations.ChangePasswordValidation(req.body)
  const user = req.user
  const userDetails = await User.findOne({ email: user?.email })
  
  const isMatch = await comparePassword(value.old_password,userDetails?.password)
  
  if(!isMatch){
    throw new Error("old password dosent match")
  }
  const hashedPassword = await hashPassword(value.confirm_password)
  const updated_password = await User.findOneAndUpdate({ email: user?.email },{ password: hashedPassword })
  res.status(200).json({ status: "success", message: "Password changed successfully",data: updated_password})
  } catch (error) {
    res.status(500).json({ status: 'failed', message: error?.message })
  }
}

export const forgotPassword = async (req, res) => {
  try {
    const value = await Validations.validateForgotPassword(req.body);
    const { email } = value
    console.log(email,"email",value)
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("User not found with this email");
    }

    const existingOtp = await Otps.findOne({ email, validated: false });

    if (existingOtp) {
      await sentOtpEmail(existingOtp.email, existingOtp.otp);
      return res.status(200).json({
        status: "success",
        message: "OTP already sent to your email",
        data: { token: existingOtp.token ,email},
      });
    }

    const { otp, token } = await generateOtp();
    const newOtp = new Otps({ email, otp, token });
    await newOtp.save();

    await sentOtpEmail(email, otp);

    res.status(200).json({
      status: "success",
      message: "OTP sent successfully",
      data: { token, email},
    });
  } catch (error) {
    res.status(500).json({ status: "failed", message: error.message });
  }
};

export const verifyForgotPasswordOtp = async (req, res) => {
  try {
    const value = await Validations.validateOtp(req.body);

    const { otp, token } = value 

    const otpDetails = await Otps.findOne({ otp, token, validated: false });
   
    if (!otpDetails) {
      throw new Error("Invalid or expired OTP");
    }

    await Otps.findOneAndUpdate(
      { email: otpDetails.email },
      { validated: true }
    );

    res.status(200).json({
      status: "success",
      message: "OTP verified successfully",
      data: { email: otpDetails.email },
    });
  } catch (error) {
    res.status(500).json({ status: "failed", message: error.message });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const value = await Validations.validateResetPassword(req.body);

      const { email, new_password, confirm_password } = value

    if (new_password !== confirm_password) {
      throw new Error("Passwords do not match");
    }

    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("User not found with this email");
    }

    const hashedPassword = await hashPassword(new_password);
    await User.findOneAndUpdate({ email }, { password: hashedPassword });

    res.status(200).json({
      status: "success",
      message: "Password reset successfully",
    });
  } catch (error) {
    res.status(500).json({ status: "failed", message: error.message });
  }
};
