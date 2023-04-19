import { useState, useContext, createContext, useEffect } from "react";

const AuthContext = createContext(null);
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(getUsername());
    const login = (user) => setUser(user);
    const logout = () => setUser(null);

    function getUsername() {
        const temp = localStorage.getItem('username');
        const savedUsername = JSON.parse(temp);
        return savedUsername || '';
    }
    useEffect(() => {
        const temp = JSON.stringify(user);
        localStorage.setItem('username', temp);
    }, [user]);

    return (
        <AuthContext.Provider value={{user, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};
export const useAuthContext = () => useContext(AuthContext);