import { ReactNode, createContext, useCallback, useEffect, useState } from "react";
import { AuthValuesType } from "./types";
import Cookies from "js-cookie";
import { useMutation } from "react-query";
import { authService } from "@/service/auth";
import { UserLoginRegisterResponse } from "@/interface/auth";
import { ErrorResponse } from "@/interface/apiResponse";
import { useRouter } from "next/navigation";
import { randomString } from "@/utility/stringUtils";
import { Router } from "next/router";

// ** Defaults
const defaultProvider: AuthValuesType = {
  auth: null,
  session: null,
  loading: true,
  setAuth: () => null,
  setLoading: () => Boolean,
  initAuth: () => Promise.resolve(),
  loginEmail: () => Promise.resolve(),
  register: () => Promise.resolve(),
  logout: () => Promise.resolve(),
};

const AuthContext = createContext(defaultProvider);

const setCookieAuth = (auth: UserLoginRegisterResponse) => {
  Cookies.set("auth", JSON.stringify(auth));
};

const getCookieAuth = () => {
  const oldCookie = Cookies.get("auth");
  if (oldCookie) {
    try {
      return JSON.parse(oldCookie);
    } catch (error) {
      return null
    }
  } else {
    return null;
  }
};

const setCookieSession = (session: string) => {
  Cookies.set("session", session);
};

const getCookieSession = () => {
  const oldSession = Cookies.get("session");
  if (oldSession) {
    return oldSession;
  } else {
    return null;
  }
};

type Props = {
  children: ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  const cookieAuth = getCookieAuth();
  const cookieSession = getCookieSession();

  const [auth, setAuth] = useState(defaultProvider.auth);
  const [session, setSession] = useState(defaultProvider.session);
  const [loading, setLoading] = useState(defaultProvider.loading);

  const router = useRouter();

  const initAuth = useCallback(async () => {
    if (cookieAuth) {
      setAuth(cookieAuth);
    } else if (cookieSession) {
      setSession(cookieSession);
    } else if (!cookieSession) {
      const _session = randomString(20);
      setSession(_session);
      setCookieSession(_session);
      console.log("session", session);
    }
    setLoading(false);
  }, [cookieAuth, cookieSession, session]);
  
  useEffect(() => {
    initAuth();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { mutate: loginEmail } = useMutation(authService.login, {
    onSuccess: (data) => {
      setCookieAuth(data.data.data);
      
      window.location.href = '/';
    },
    onError: (err: ErrorResponse) => {
      if (err.response && err.response.data && err.response.data.message) {
      }
    },
  });

  

  const { mutate: register } = useMutation(authService.register, {
    onSuccess: (data) => {
      setCookieAuth(data.data.data);

      window.location.reload();
    },
    onError: (err: ErrorResponse) => {
      if (err.response && err.response.data && err.response.data.message) {
        // setMessageError(err.response?.data?.message);
      }
    },
  });

  const { mutate: logout } = useMutation(authService.logout, {
    onSuccess: () => {
      Cookies.remove("auth");
      Cookies.remove("session");

      window.location.reload();
    },
    onError: (err: ErrorResponse) => {
      if (err.response && err.response.data && err.response.data.message) {
        // setMessageError(err.response?.data?.message);
      }
    },
  });

  const values: AuthValuesType = {
      auth,
      session,
      loading,
      initAuth,
      setAuth,
      setLoading,
      loginEmail,
      register,
      logout,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
