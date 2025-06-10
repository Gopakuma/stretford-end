import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

function ProtectedRoute({ children }) {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? children : navigate("/login");
}

export default ProtectedRoute;
