import { use, useEffect, useMemo } from "react";
import axios from "axios";
import SmartBillContext from "../../Context/SmartBillContext"; // Ensure this path is correct

const useAxiosSecure = () => {
  // Get user objects and logOut function from your context
  const { user, logoutUser, fireBaseUser } = use(SmartBillContext);

  // Memoize the axios instance so it's only created once
  const axiosSecure = useMemo(() => {
    return axios.create({
      baseURL: "http://localhost:4000", // A more common port number
    });
  }, []);

  useEffect(() => {
    // --- Request Interceptor (Simplified and Synchronous) ---
    const reqInterceptor = axiosSecure.interceptors.request.use(
      (config) => {
        // Check if the fireBaseUser object and its accessToken exist
        // if (fireBaseUser?.accessToken) {
        //   // Attach the token directly from the context object.
        //   // Corrected typo from 'authoriztion' to 'Authorization'
        //   config.headers.authoriztion = `Bearer ${fireBaseUser?.accessToken}`;
        // }
        // Always return the config so the request can proceed
        return config;
      },
      (error) => {
        // Handle request setup errors
        return Promise.reject(error);
      }
    );

    // --- Response Interceptor (Handles global errors like 401/403) ---
    const resInterceptor = axiosSecure.interceptors.response.use(
      (response) => response,
      (error) => {
        const status = error.response?.status;
        if (status === 401 || status === 403) {
          console.error("Unauthorized or Forbidden - Logging out");
          logoutUser(); // Call logout from your context
        }
        return Promise.reject(error);
      }
    );

    // --- Cleanup Function ---
    // This removes the interceptors when the component unmounts or the user changes
    return () => {
      axiosSecure.interceptors.request.eject(reqInterceptor);
      axiosSecure.interceptors.response.eject(resInterceptor);
    };

    // The effect should re-apply the interceptors if the user objects change
  }, [user, logoutUser, axiosSecure, fireBaseUser]);

  // Return the fully configured axios instance
  return axiosSecure;
};

export default useAxiosSecure;
