import { createContext, useState, useContext, useEffect, useCallback } from "react";
import jwt_decode from "jwt-decode";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const logoutTimerRef = useRef(null);  // Use ref for the timer

    // Memoized logout function
    const logout = useCallback(() => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        if (logoutTimerRef.current) {
            clearTimeout(logoutTimerRef.current);
        }
    }, []);

    // Memoized login function
    const login = useCallback((token) => {
        localStorage.setItem('token', token);
        setIsAuthenticated(true);
        
        try {
            // Decode token to get expiration time
            const decoded = jwt_decode(token);
            const expiresAt = decoded.exp * 1000; // Convert to milliseconds
            const currentTime = Date.now();
            const timeout = expiresAt - currentTime;

            // Clear any existing timer
            if (logoutTimerRef.current) {
                clearTimeout(logoutTimerRef.current);
            }

            // Set new timer only if timeout is positive
            if (timeout > 0) {
                logoutTimerRef.current = setTimeout(logout, timeout);
            } else {
                // Token already expired
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
                const decoded = jwt_decode(token);
                const currentTime = Date.now();
                const expiresAt = decoded.exp * 1000;

                if (expiresAt < currentTime) {
                    // Token expired
                    logout();
                } else {
                    // Token valid
                    setIsAuthenticated(true);
                    
                    // Set timeout to automatically logout when token expires
                    const timeout = expiresAt - currentTime;
                    logoutTimerRef.current = setTimeout(logout, timeout);
                }
            } catch (error) {
                console.error("Invalid token", error);
                logout();
            }
        }
        
        // Cleanup timer on unmount
        return () => {
            if (logoutTimerRef.current) {
                clearTimeout(logoutTimerRef.current);
            }
        };
    }, [logout]);

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