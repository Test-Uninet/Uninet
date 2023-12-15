import { ApiResponse } from "@/interface/apiResponse";
import api from "./core";
import {
  UserLoginRegisterResponse,
  UserLoginEmailData,
  UserRegisterData,
  UserData,
} from "@/interface/auth";

export const authService = {
  login(data: UserLoginEmailData) {
    return api.post<ApiResponse<UserLoginRegisterResponse>>(
      "/auth/login",
      data
    );
  },
  
  register(data: UserRegisterData) {
    return api.post<ApiResponse<UserLoginRegisterResponse>>(
      "/auth/register",
      data
    );
  },

  getUserProfile() {
    return api.get<ApiResponse<UserData>>("/auth/user/profile");
  },

  logout() {
    return api.post<ApiResponse<null>>("/auth/logout");
  },
};
