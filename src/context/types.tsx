import {
    UserLoginEmailData,
    UserLoginRegisterResponse,
    UserRegisterData,
  } from "@/interface/auth";
  import { AxiosResponse } from "axios";
  import { UseMutationResult } from "react-query";
  
  export type AuthValuesType = {
    auth: UserLoginRegisterResponse | null;
    session: string | null;
    loading: boolean;
    initAuth: () => void;
    setAuth: (data: UserLoginRegisterResponse) => void;
    setLoading: (data: boolean) => void;
    loginEmail: (data: UserLoginEmailData) => void;
    register: (data: UserRegisterData) => void;
    logout: () => void;
  };
  