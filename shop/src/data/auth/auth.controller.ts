import { RegisterDto, LoginDto, SocialLoginDto, OtpLoginDto, OtpDto, VerifyOtpDto, ForgetPasswordDto, ResetPasswordDto, ChangePasswordDto, VerifyForgetPasswordDto } from './dto/create-auth.dto';
import { register, login, socialLogin, otpLogin, sendOtpCode, verifyOtpCode, forgetPassword, resetPassword, changePassword, verifyForgetPasswordToken, me } from './auth.service';

export function createAccount(registerDto: RegisterDto) {
  return register(registerDto);
}

export function loginRoute(loginDto: LoginDto) {
  return login(loginDto);
}

export function socialLoginRoute(socialLoginDto: SocialLoginDto) {
  return socialLogin(socialLoginDto);
}

export function otpLoginRoute(otpLoginDto: OtpLoginDto) {
  return otpLogin(otpLoginDto);
}

export function sendOtpCodeRoute(otpDto: OtpDto) {
  return sendOtpCode(otpDto);
}

export function verifyOtpCodeRoute(verifyOtpDto: VerifyOtpDto) {
  return verifyOtpCode(verifyOtpDto);
}

export function forgetPasswordRoute(forgetPasswordDto: ForgetPasswordDto) {
  return forgetPassword(forgetPasswordDto);
}

export function resetPasswordRoute(resetPasswordDto: ResetPasswordDto) {
  return resetPassword(resetPasswordDto);
}

export function changePasswordRoute(changePasswordDto: ChangePasswordDto) {
  return changePassword(changePasswordDto);
}

export function verifyForgetPasswordRoute(verifyForgetPasswordDto: VerifyForgetPasswordDto) {
  return verifyForgetPasswordToken(verifyForgetPasswordDto);
}

export function logout() {
  return Promise.resolve(true);
}

export function meRoute() {
  return me();
}

export function addWalletPoints(addPointsDto: any) {
  return me();
}

export function contactUs(addPointsDto: any) {
  return {
    success: true,
    message: 'Thank you for contacting us. We will get back to you soon.',
  };
}
