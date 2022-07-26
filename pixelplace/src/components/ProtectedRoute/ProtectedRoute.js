import { Navigate } from "react-router-dom";
import { useUserAuth } from "../../context/UserAuthContext";

const ProtectedRoute = ({ children }) => {
    let { user, isLoading } = useUserAuth();
    console.log(isLoading);
    if (!isLoading) {
        if (!user) {
            return <Navigate to="/login" />;
        }
        return children;
    }
};

export default ProtectedRoute;
