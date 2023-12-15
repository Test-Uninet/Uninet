import * as yup from "yup";

export type UserLoginEmailData = {
  session_id?: string | null;
  email: string;
  password: string;
};



export type UserRegisterData = {
  session_id?: string | null;
  name: string;
  email: string;
  phone: string;
  password: string;
  password_confirmation : string;
};

export interface UserData {
  id: number;
  name: string;
  email: string;
  address: string;
  phone: string;
  created_at: string;
  updated_at: string;
}

export type UserLoginRegisterResponse = {
  token: string;
  user: UserData;
};

export const LoginAuth:any = yup.object({
    email: yup.string().email().required('Email is required'),
    password: yup.string().required('Password is required'),
  });
  


  export const RegisAuth = yup.object({
    name: yup.string().required('name is required'),
    email: yup
      .string()
      .required('Email is required')
      .matches(
        /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
        'Emails must contain symbols @ and (.)'
      ),
    phone: yup
      .string()
      .required('Phone number is required')
      .matches(
        /^08[0-9]{8,12}$/,
        'Invalid phone number format. Please use a valid Indonesian phone number format, e.g., 081234567890'
      ),
    password: yup.string().required('Password is required'),
    password_confirmation: yup
      .string()
      .oneOf([yup.ref('password'), ""], 'Passwords must match')
      .required('Password confirmation is required'),
  });

