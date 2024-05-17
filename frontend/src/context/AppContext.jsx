import { useRouter } from "next/navigation";

const { createContext, useContext, useState } = require("react");

const AppContext = createContext();

export const AppProvider = ({ children }) => {

    const router = useRouter();
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')));

    const [loggedIn, setLoggedIn] = useState(currentUser !== null);

    const logout = () => {
        localStorage.removeItem('user');
        setLoggedIn(false);
        setCurrentUser(null);
    }

    return <AppContext.Provider value={{
        currentUser,
        setCurrentUser,
        loggedIn,
        setLoggedIn,
        logout
    }} >
        {children}
    </AppContext.Provider>;
}

const useAppContext = () => useContext(AppContext);

export default useAppContext;