import { createBrowserRouter, redirect } from "react-router";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import BillPage from "../Pages/BillPage/BillPage";
import CreateBillPage from "../Pages/CreateBillPage/CreateBillPage";
import Loader from "../Components/Loader/Loader";
import BillDetails from "../Components/BillDetails/BillDetails";
import Transiction from "../Components/Transiction/Transiction";
import EditBill from "../Components/EditBill/EditBill";
import SmartPrivateRoute from "./SmartPrivateRoute";
import MyProfile from "../Components/MyProfile/MyProfile";
import axios from "axios";

// Helper function for authenticated loaders
const authLoader = async (url: string) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.get(url, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    return response.data;
  } catch (error: any) {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      // Redirect to login if unauthorized
      return redirect("/login");
    }
    throw error;
  }
};

// Simple error boundary component
const ErrorBoundary = () => (
  <div className="flex flex-col items-center justify-center min-h-[60vh]">
    <h2 className="text-2xl font-bold text-red-600 mb-2">Something went wrong!</h2>
    <p className="text-gray-600">Please try again or contact support.</p>
  </div>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/mybill/:uid",
        element: (
          <SmartPrivateRoute>
            <BillPage />
          </SmartPrivateRoute>
        ),
        loader: ({ params }) => authLoader(`http://localhost:4000/mybill/${params.uid}`),
        hydrateFallbackElement: <Loader />,
        errorElement: <ErrorBoundary />,
      },
      {
        path: "/createbill",
        element: (
          <SmartPrivateRoute>
            <CreateBillPage />
          </SmartPrivateRoute>
        ),
        errorElement: <ErrorBoundary />,
      },
      {
        path: "/billdetails/:id",
        element: (
          <SmartPrivateRoute>
            <BillDetails />
          </SmartPrivateRoute>
        ),
        errorElement: <ErrorBoundary />,
      },
      {
        path: "/transiction/:uid",
        element: (
          <SmartPrivateRoute>
            <Transiction />
          </SmartPrivateRoute>
        ),
        errorElement: <ErrorBoundary />,
      },
      {
        path: "/editbill/:id",
        element: (
          <SmartPrivateRoute>
            <EditBill />
          </SmartPrivateRoute>
        ),
        loader: ({ params }) => authLoader(`http://localhost:4000/bill/${params.id}`),
        hydrateFallbackElement: <Loader />,
        errorElement: <ErrorBoundary />,
      },
      {
        path:'/myprofile',
        element:<SmartPrivateRoute>
          <MyProfile/>
        </SmartPrivateRoute>,

      }
    ],
  },
]);

export default router;
