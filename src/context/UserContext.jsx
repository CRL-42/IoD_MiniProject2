import { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export function UserProvidder(props) {
    const [currentUser, setCurrentUser] = useState({});

    const handleUpdateUser = (user) => {
        setCurrentUser(user);
    };

    return (
        <UserContext.Provider value={{ currentUser, handleUpdateUser }}>
            {props.children}
        </UserContext.Provider>
    );
};

export function useUserContext() {
    return useContext(UserContext);
};