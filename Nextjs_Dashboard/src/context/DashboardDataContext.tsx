import React, { createContext, useContext, useState } from "react";

export const DashboardDataContext = createContext<any>(undefined);

export function DashboardDataProvider({ children }: {children: React.ReactNode}) {
    let [DashboardData, setDashboardData]:[any, any] = useState();
    return (
        <DashboardDataContext.Provider value={{DashboardData, setDashboardData}}>
            {children}
        </DashboardDataContext.Provider>
    )
}

export function useDashboardDataContext () {
    return useContext(DashboardDataContext);
}