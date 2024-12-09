import {
  AuthResponse,
  ChangePasswordDto,
  ForgetPasswordDto,
  LoginDto,
  CoreResponse,
  RegisterDto,
  ResetPasswordDto,
  VerifyForgetPasswordDto,
  SocialLoginDto,
  OtpLoginDto,
  OtpResponse,
  VerifyOtpDto,
  OtpDto,
} from './dto/create-auth.dto';
import { v4 as uuidv4 } from "uuid4";
import { plainToClass } from 'class-transformer';
import { User } from '../users/entities/user.entity';
import usersJson from '../db/pickbazar/users.json';

const users = plainToClass(User, usersJson);

export function register(registerDto: RegisterDto): Promise<AuthResponse> {
  return Promise.resolve({
    token: 'jwt token',
    permissions: ['super_admin', 'customer'],
  });
}

export function login(loginDto: LoginDto): Promise<AuthResponse> {
  if (loginDto.email === 'store_owner@demo.com') {
    return Promise.resolve({
      token: 'jwt token',
      permissions: ['store_owner', 'customer'],
    });
  } else {
    return Promise.resolve({
      token: 'jwt token',
      permissions: ['super_admin', 'customer'],
    });
  }
}

export function changePassword(changePasswordDto: ChangePasswordDto): Promise<CoreResponse> {
  return Promise.resolve({
    success: true,
    message: 'Password change successful',
  });
}

export function forgetPassword(forgetPasswordDto: ForgetPasswordDto): Promise<CoreResponse> {
  return Promise.resolve({
    success: true,
    message: 'Password change successful',
  });
}

export function verifyForgetPasswordToken(verifyForgetPasswordTokenDto: VerifyForgetPasswordDto): Promise<CoreResponse> {
  return Promise.resolve({
    success: true,
    message: 'Password change successful',
  });
}

export function resetPassword(resetPasswordDto: ResetPasswordDto): Promise<CoreResponse> {
  return Promise.resolve({
    success: true,
    message: 'Password change successful',
  });
}

export function socialLogin(socialLoginDto: SocialLoginDto): Promise<AuthResponse> {
  return Promise.resolve({
    token: 'jwt token',
    permissions: ['super_admin', 'customer'],
  });
}

export function otpLogin(otpLoginDto: OtpLoginDto): Promise<AuthResponse> {
  return Promise.resolve({
    token: 'jwt token',
    permissions: ['super_admin', 'customer'],
  });
}

export function verifyOtpCode(verifyOtpDto: VerifyOtpDto): Promise<CoreResponse> {
  return Promise.resolve({
    message: 'success',
    success: true,
  });
}

export function sendOtpCode(otpDto: OtpDto): Promise<OtpResponse> {
  return Promise.resolve({
    message: 'success',
    success: true,
    id: '1',
    provider: 'google',
    phone_number: '+919494949494',
    is_contact_exist: true,
  });
}

export function me(): User {
  return users[0];
}
