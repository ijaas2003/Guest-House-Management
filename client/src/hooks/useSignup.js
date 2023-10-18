import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
const useSignup = () => {
    const [iserror, setError] = useState(null);
    const [isloading, setLoading] = useState(null);
    const { dispatch } = useAuthContext();
    const location = useNavigate();
    const signups = async ({ Email, Password, action, Name, PhoneNumber, types }) => {
        setError(null);
        setLoading(true);
        const Fetch = await fetch(`http://localhost:4000/${action}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json" 
            },
            body: JSON.stringify({ Email, Password, Name, PhoneNumber, types })
        });

        const JsonData = await Fetch.json();
        if (!Fetch.ok) {
            // Handle the Error because if the user is not available
            setLoading(true);
            setError(JsonData.Error);
            toast.error(JsonData.Error);
            return;
        } else {
            // Save the user to localStorage for authentication purpose
            setLoading(false);
            localStorage.setItem('User', JSON.stringify(JsonData));
            dispatch({ type: "Login", payload: JsonData });
            toast.success("Successfully Loggedin")
            location(`/${types==="user"?"home":"ownerhome"}`);
            return
        }
    }
    return { signups, isloading, iserror };
}

export default useSignup;
