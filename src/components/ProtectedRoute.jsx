import { Navigate } from "react-router";
import { useAuthStore } from "../store/authStore";

export function ProtectedRoute({ children }){
    const { isLoggedIn } = useAuthStore()

    if(!isLoggedIn){
        return <Navigate to="/login" replace/>
    }

    return children
}