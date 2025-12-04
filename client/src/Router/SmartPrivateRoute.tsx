import React, { ReactNode } from 'react';
import { useLocation, Navigate } from 'react-router';
import Loader from '../Components/Loader/Loader';
import { useSmartBill } from '../Context/SmartBillContext';

interface SmartPrivateRouteProps {
    children: ReactNode;
}

const SmartPrivateRoute = ({ children }: SmartPrivateRouteProps) => {
    const { user, loading } = useSmartBill();
    const location = useLocation();

    if (loading) {
        return <Loader />;
    }

    if (!user) {
        // Redirect to login if not authenticated
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <>{children}</>;
};

export default SmartPrivateRoute;
