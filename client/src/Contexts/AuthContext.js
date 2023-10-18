import { createContext, useReducer, useEffect } from 'react'

export const AuthContext = createContext();

export const authReducer = (state, action) => {
    switch(action.type){
        case 'Login':
            return { user: action.payload }
        case 'Logout':
            return { user: null }
        case 'House':
            return { owner: action.payload }
        default:
            return state
    }
}

export const AuthContextProvider = ({ children }) => {
    const [ state, dispatch ] = useReducer(authReducer, {
        user : null,
        owner: null,
    });
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('User'));
        const owner = JSON.parse(localStorage.getItem('OwnerHouse'));
        if(owner){
            dispatch({ type: "House", payload: owner })
        }
        if(user){
            dispatch({ type: "Login", payload: user });
        }
    },[])
    console.log("Authendicate", state);

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            { children }
        </AuthContext.Provider>
    )
}