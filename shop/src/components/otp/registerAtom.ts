import { atom } from 'jotai';
interface RegisterState {
  step:  'RegisterForm' | 'OtpForm';
}
export const initialOtpState: RegisterState = {
  step: 'RegisterForm',
};
export const RegisterAtom = atom<RegisterState>(initialOtpState);
