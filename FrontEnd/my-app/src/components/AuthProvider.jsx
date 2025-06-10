import { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export function AuthProvider({children}) {
    const [ isAuthenticated, setIsAuthenticated ] = useState(
        localStorage.getItem('token') ? true : false
    );

    const login = (token) => {
        localStorage.setItem('token', token);
        setIsAuthenticated(true); 
    }

    const logout = () => {
        localStorage.removeItem('token')
        setIsAuthenticated(false);
    }

    return (
        <AuthContext.Provider value= {{isAuthenticated, login, logout}} >
            {children}
        </AuthContext.Provider>
    )
}


export function useAuth() {
    const context = useContext(AuthContext);
    console.log("AuthContext value:", context);
    if (!context) {
      throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
  