import { AuthContext } from "../Contexts/AuthContext";
import { useContext } from "react";

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if(!context) {
        throw Error("Use Auth must be inside the AuthProvider")
    }
    return context;
}
