import { toast } from 'react-toastify';

export const showToast = (message: string, type: 'success' | 'error' | 'info' | 'warning' = 'info') => {
  toast[type](message, {
    position: "top-center", 
    autoClose: 1000,       
    closeOnClick: true,
    hideProgressBar:true
  });
};
