import React, { use } from 'react';
import { useLocation, Navigate } from 'react-router';
import Loader from '../Components/Loader/Loader';
import SmartBillContext from '../Context/SmartBillContext';

const SmartPrivateRoute = ({ children }) => {
    const { fireBaseUser, loading } = use(SmartBillContext);
    const location = useLocation();

    if (loading) {
        return <Loader />;
    }

    if (!fireBaseUser) {
        // Redirect to login if not authenticated
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};

export default SmartPrivateRoute;