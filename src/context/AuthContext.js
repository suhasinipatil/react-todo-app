import { useState, useContext, createContext, useEffect } from "react";
import { useTodosContext } from "./TodosContext";

const AuthContext = createContext(null);
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState('');
    const [currentUser, setCurrentUser] = useState({username: '', id: -1});
    //const { setTodos } = useTodosContext();

    const login = (currentuser, currentuserId) => {
        const newUser = {...user, username: currentuser, id: currentuserId};
        setCurrentUser(newUser);
        setUser(currentuser);
        //console.log("user login " + currentuser);
        //console.log("userid login " + currentuserId);

        // fetch('http://localhost:8889/todos/' + currentuserId, {
        //     method: 'GET',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         },
        //         }).then(res => res.json())
        //         .then(data => {
        //             console.log(data);
        //             if(data)
        //                 setTodos(data);
        //         });
    };

    const logout = () => {
        setUser(null);
        setCurrentUser({username: '', id: -1});
    }

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
        <AuthContext.Provider value={{user, currentUser, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};
export const useAuthContext = () => useContext(AuthContext);