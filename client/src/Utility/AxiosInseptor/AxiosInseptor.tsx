import { useContext, useEffect, useMemo } from "react";
import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import SmartBillContext from "../../Context/SmartBillContext";

const useAxiosSecure = (): AxiosInstance => {
  // Get user objects and logOut function from your context
  const context = useContext(SmartBillContext);

  if (!context) {
    throw new Error("useAxiosSecure must be used within a SmartBillProvider");
  }

  const { logoutUser } = context;

  // Memoize the axios instance so it's only created once
  const axiosSecure = useMemo(() => {
    return axios.create({
      baseURL: "http://localhost:5000",
    });
  }, []);

  useEffect(() => {
    // --- Request Interceptor ---
    const reqInterceptor = axiosSecure.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem("token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // --- Response Interceptor ---
    const resInterceptor = axiosSecure.interceptors.response.use(
      (response) => response,
      (error) => {
        const status = error.response?.status;
        if (status === 401 || status === 403) {
          console.error("Unauthorized or Forbidden - Logging out");
          logoutUser();
        }
        return Promise.reject(error);
      }
    );

    // --- Cleanup Function ---
    return () => {
      axiosSecure.interceptors.request.eject(reqInterceptor);
      axiosSecure.interceptors.response.eject(resInterceptor);
    };

  }, [logoutUser, axiosSecure]);

  return axiosSecure;
};

export default useAxiosSecure;
