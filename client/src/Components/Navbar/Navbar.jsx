import React, { use } from "react";
import { Link, NavLink } from "react-router";
import Loader from "../Loader/Loader";
import SmartBillContext from "../../Context/SmartBillContext";
const Navbar = () => {
  const { fireBaseUser, logoutUser,user } = use(SmartBillContext);

  const link = (
    <>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive ? "font-bold text-primary underline" : "text-gray-600"
          }
          to={"/"}
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive ? "font-bold text-primary underline" : "text-gray-600"
          }
          to={`/mybill/${fireBaseUser?.uid}`}
        >
          My Bill
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive ? "font-bold text-primary underline" : "text-gray-600"
          }
          to={"/myprofile"}
        >
          My Profile
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive ? "font-bold text-primary underline" : "text-gray-600"
          }
          to={"/createbill"}
        >
          Create Bill
        </NavLink>
      </li>
      {fireBaseUser && (
        <>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? "font-bold text-primary underline" : "text-gray-600"
              }
              to={`/transiction/${fireBaseUser?.uid}`}
            >
              Transiction
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? "font-bold text-primary underline" : "text-gray-600"
              }
              to={"/dashboard"}
            >
              Dashboard
            </NavLink>
          </li>
        </>
      )}
    </>
  );
  const linkForPopUp = (
    <>
      {" "}
      <li className="font-bold text-xl">Balance : ৳10000 </li>
      <li>{fireBaseUser?.email}</li>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/mybill">Bill Page</Link>
      </li>
      <li>
        <Link to="/myprofile">My Profile</Link>
      </li>
      <li>
        <Link to="/transiction">Transiction</Link>
      </li>
      <li>
        <Link to="/dashboard">DashBoard</Link>
      </li>
      {fireBaseUser && (
        <li>
          <button className="btn" onClick={logoutUser}>
            Log out
          </button>
        </li>
      )}
    </>
  );
  return (
    <nav className="navbar justify-between  bg-base-100 max-w-7xl mx-auto sticky top-0 z-10 shadow-sm">
      <Link to="/" className="flex items-center">
        <div className="w-16 rounded-full">
          {/* <img alt="payPoint" src="" className="" /> */}
        </div>
        <p className="font-bold text-xl">Pay Point</p>
      </Link>
      <div className="">
        <ul className="hidden md:flex gap-6">{link}</ul>
      </div>
      <div className="dropdown dropdown-end">
        <div
          tabIndex={0}
          role="button"
          className="btn btn-ghost btn-circle avatar"
        >
          <div className="w-10 rounded-full">
            <img
              alt="USER PHOTO"
              src={
                user?.photoURL ||
                "https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg"
              }
            />
          </div>
        </div>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-64 p-2 shadow space-y-4"
        >
          {linkForPopUp}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
