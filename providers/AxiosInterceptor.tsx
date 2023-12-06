import { useEffect } from "react";
import { axiosInstance } from "./Api";
import {
  getApiToken,
  getIdPerfilFromLocalStorage,
  saveApiToken,
} from "../utilities/localStorage.utility";
import { checkTokenExpired } from "../utilities/apiToken.utility";
import appConfiguration from "./AppConfiguration";
import { AxiosError } from "axios";

const API_KEY = "9391e1c2-1e52-4ee5-bd71-5e46c85d53f3";

const AxiosInterceptor = ({ children }: any) => {
  useEffect(() => {
    const resInterceptor = (response: any) => {
      return response;
    };
    const errInterceptor = (error: any) => {
      if (error.response.status === 401) {
        error.response.data.message = "Usuario no autorizado";
      }
      return Promise.reject(error);
    };
    const useToken = async (config: any) => {
      let token = getApiToken();
      let idPerfil = getIdPerfilFromLocalStorage();
      if (!token || checkTokenExpired(token)) {
        const response = await fetch(
          `${appConfiguration.API.URL}api/v1/Seguridad/generarToken`,
          {
            headers: {
              "Content-Type": "application/json",
              country: "CL",
              provider: "progreso",
              "x-api-key": API_KEY,
            },
          }
        );
        const data = await response.json();
        saveApiToken(data.token);
        token = data.token;
      }
      config.headers.Authorization = token ? `Bearer ${token}` : "";
      config.headers["idperfil"] = idPerfil;
      return config;
    };
    const interceptor = axiosInstance.interceptors.response.use(
      resInterceptor,
      errInterceptor
    );
    const responseInterceptor =
      axiosInstance.interceptors.request.use(useToken);
    return () => {
      axiosInstance.interceptors.response.eject(interceptor);
      axiosInstance.interceptors.request.eject(responseInterceptor);
    };
  }, []);
  return children;
};
export default axiosInstance;
export { AxiosInterceptor };
