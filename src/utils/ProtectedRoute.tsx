import { Navigate, Outlet } from 'react-router-dom'

interface Props {
    children: React.ReactNode;
    isAuthenticated: string;
}

const ProtectRoute = ({ children , isAuthenticated }:Props) => {
    const userType = JSON.parse(isAuthenticated)?.type === 'u' || JSON.parse(isAuthenticated)?.type === 'a';

    if (!userType) {
        return <Navigate to="/" replace />; 
    }

    return children ? children : <Outlet />;
}

export default ProtectRoute;