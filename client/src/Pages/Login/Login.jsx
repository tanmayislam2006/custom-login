import React, { use, useState } from "react";
import { Link, useLocation } from "react-router";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import SmartBillContext from "../../Context/SmartBillContext";
import { toast } from "react-toastify";

const Login = () => {
  const { googleLogIn, logInAccount } = use(SmartBillContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
const location =useLocation()
  const handleGoogleLogin = () => {
    googleLogIn()
      .then((result) => {
        const user = result?.user;
        if (user) {
          toast.success("Log In successfully");
          // save information in db
        }
      })
      .catch((err) => console.log(err));
  };
  const handleLogin = (e) => {
    e.preventDefault();
    location.state = location.state || { from: { pathname: "/" } };
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    logInAccount(email, password)
      .then((result) => {
        const user = result?.user;
        console.log(user?.metadata?.lastSignInTime);
        if (user) {
          toast.success("Log In successfully");
          // update information in db
          fetch('http://localhost:4000/login',{
            method:"PATCH",
            headers:{
              "content-type":"application/json"
            },
            body: JSON.stringify({
              email: user?.email,
              lastSignInTime: user?.metadata?.lastSignInTime,

            }),
          }).then((res) => res.json())
          .then((data) => {
            
          });
        }
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <>
      <div className="flex items-center justify-center  bg-no-repeat bg-cover bg-center">
        <div className="bg-white shadow-lg rounded-lg my-12 p-8 max-w-md w-full">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Welcome Back
          </h2>
          <form onSubmit={handleLogin}>
            {/* Email Field */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-2"
              >
                Email <span className="text-red-700">*</span>
              </label>
              <input
                name="email"
                type="email"
                id="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 border border-gray-400 rounded-lg focus:outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password Field */}
            <div className="mb-4 relative">
              <label
                htmlFor="password"
                className="block text-gray-700 font-medium mb-2"
              >
                Password <span className="text-red-700">*</span>
              </label>
              <input
                type={showPass ? "text" : "password"}
                id="password"
                placeholder="Enter your password"
                className="w-full px-4 py-2 border border-gray-400 rounded-lg focus:outline-none"
                value={`123456Aa`}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                onClick={() => setShowPass(!showPass)}
                className="absolute right-6 bottom-3 cursor-pointer"
              >
                {showPass ? (
                  <FaRegEyeSlash size={20} />
                ) : (
                  <FaRegEye size={20} />
                )}
              </button>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary-dark transition duration-300 cursor-pointer"
            >
              Login
            </button>
          </form>
          <div className="flex items-center my-6">
            <hr className="flex-grow border-gray-300" />
            <span className="mx-2 text-gray-500">OR</span>
            <hr className="flex-grow border-gray-300" />
          </div>
          {/* Google Login */}
          <button
            onClick={handleGoogleLogin}
            type="button"
            className="btn bg-white text-black border-[#e5e5e5] w-full"
          >
            <svg
              aria-label="Google logo"
              width="16"
              height="16"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <g>
                <path d="m0 0H512V512H0" fill="#fff"></path>
                <path
                  fill="#34a853"
                  d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                ></path>
                <path
                  fill="#4285f4"
                  d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                ></path>
                <path
                  fill="#fbbc02"
                  d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                ></path>
                <path
                  fill="#ea4335"
                  d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                ></path>
              </g>
            </svg>
            Login with Google
          </button>

          <p className="text-center text-gray-600 mt-6">
            Don't have an account?{" "}
            <Link to="/register" className="text-primary font-medium">
              Register
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
