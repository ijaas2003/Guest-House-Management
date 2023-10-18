import  { useAuthContext } from './useAuthContext' 
import { useNavigate } from 'react-router-dom';
export const useLogout = () => {
    const navi = useNavigate();
    const { dispatch } = useAuthContext();
    const logout = () => {
        //remove user from storage
        localStorage.removeItem('User');
        dispatch({ type : "Logout" })
        navi('/')
    }
    return { logout };
}