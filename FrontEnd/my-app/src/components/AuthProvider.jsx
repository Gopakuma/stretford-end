import { createContext, useState, useContext, useEffect, useCallback, useRef } from "react";
import {jwtDecode} from 'jwt-decode'; 

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const logoutTimerRef = useRef(null); 
    const [token, setToken] = useState(null);

    const logout = useCallback(() => {
        localStorage.removeItem('token');
        setToken(null);
        setIsAuthenticated(false);
        if (logoutTimerRef.current) {
            clearTimeout(logoutTimerRef.current);
        }
    }, []);

    const login = useCallback((token) => {
        localStorage.setItem('token', token);
        setToken(token);
        setIsAuthenticated(true);
        
        try {
            const decoded = jwtDecode(token);
            const expiresAt = decoded.exp * 1000;
            const currentTime = Date.now();
            const timeout = expiresAt - currentTime;

            if (logoutTimerRef.current) {
                clearTimeout(logoutTimerRef.current);
            }

            if (timeout > 0) {
                logoutTimerRef.current = setTimeout(logout, timeout);
            } else {
                logout();
            }
        } catch (error) {
            console.error("Failed to decode token", error);
            logout();
        }
    }, [logout]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                const currentTime = Date.now();
                const expiresAt = decoded.exp * 1000;

                if (expiresAt < currentTime) {
                    logout();
                } else {
                    setIsAuthenticated(true);
                    const timeout = expiresAt - currentTime;
                    logoutTimerRef.current = setTimeout(logout, timeout);
                }
            } catch (error) {
                console.error("Invalid token", error);
                logout();
            }
        } else if(isAuthenticated) {
            const decoded = jwtDecode(token);
            const currentTime = Date.now();
            const expiresAt = decoded.exp * 1000;

            if (expiresAt < currentTime) {
                logout();
            } else {
                setIsAuthenticated(true);
                const timeout = expiresAt - currentTime;
                logoutTimerRef.current = setTimeout(logout, timeout);
            }
        }
        
        return () => {
            if (logoutTimerRef.current) {
                clearTimeout(logoutTimerRef.current);
            }
        };
    }, [token ,logout]);

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}