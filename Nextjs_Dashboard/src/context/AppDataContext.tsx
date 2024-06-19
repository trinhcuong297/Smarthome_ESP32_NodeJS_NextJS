import React, { createContext, useContext, useState } from "react";

export const AppDataContext = createContext<any>(undefined);

export function AppDataProvider({ children }: {children: React.ReactNode}) {
    let [appData, setAppData]:[any, any] = useState();
    return (
        <AppDataContext.Provider value={{appData, setAppData}}>
            {children}
        </AppDataContext.Provider>
    )
}

export function useAppDataContext () {
    return useContext(AppDataContext);
}