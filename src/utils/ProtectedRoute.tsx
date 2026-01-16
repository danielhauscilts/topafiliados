import { Navigate, Outlet } from 'react-router-dom'

interface Props {
    children: React.ReactNode;
}

const ProtectRoute = ({ children }:Props) => {
    const user:any = window.localStorage.getItem('user');
    const userType = JSON.parse(user).type;

    if (!userType && userType !== 'u'  && userType !== 'a') {
        return <Navigate to="/" replace />; 
    }

    return children ? children : <Outlet />;
}

export default ProtectRoute;