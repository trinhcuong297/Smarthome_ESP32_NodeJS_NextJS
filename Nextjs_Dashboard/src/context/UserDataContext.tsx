import { useRouter } from "next/router";
import React, { createContext, useContext, useEffect, useState } from "react";

export const UserDataContext = createContext<any>(undefined);

export function UserDataProvider({ children }: {children: React.ReactNode}) {
    let [userAttributes, setUserAttributes]:[any, any] = useState();
    let [userSession, setUserSession]:[any, any] = useState();
    let router = useRouter();

    useEffect(() => {
        if(!userSession)
        {
            router.replace('/login');
        }
    },[userSession])

    return (
        <UserDataContext.Provider value={{userAttributes, setUserAttributes, userSession, setUserSession}}>
            {children}
        </UserDataContext.Provider>
    )
}

export function useUserDataContext () {
    return useContext(UserDataContext);
}