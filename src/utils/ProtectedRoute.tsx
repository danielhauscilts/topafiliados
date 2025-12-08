import { Navigate, Outlet } from 'react-router-dom'

const ProtectRoute = (props: { children: React.ReactNode, isAuthenticated: boolean }) => {
    if (!props.isAuthenticated) {
        return <Navigate to="/" replace />; 
    }

    return props.children ? props.children : <Outlet />;
}

export default ProtectRoute;