import React, { createContext, useContext, useState } from "react";

export const UserDataContext = createContext<any>(undefined);

export function UserDataProvider({ children }: {children: React.ReactNode}) {
    let [userAttributes, setUserAttributes]:[any, any] = useState();
    let [userSession, setUserSession]:[any, any] = useState();
    return (
        <UserDataContext.Provider value={{userAttributes, setUserAttributes, userSession, setUserSession}}>
            {children}
        </UserDataContext.Provider>
    )
}

export function useUserDataContext () {
    return useContext(UserDataContext);
}