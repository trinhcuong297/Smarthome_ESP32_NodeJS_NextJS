import { useToast } from "@/components/ui/use-toast";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useUserDataContext } from "./UserDataContext";

export const WebSocketContext = createContext<any>(undefined);


export function WebSocketProvider({ children }: {children: React.ReactNode}) {
    let [wss, setWss]:[any, any] = useState();
    const {userAttributes, setUserAttributes, userSession, setUserSession} = useUserDataContext();

    const { toast } = useToast();
    useEffect(() => {
    if (userSession?.username) {
        const websocket = new WebSocket('wss://438n81ym9e.execute-api.us-east-1.amazonaws.com/production/');
        
        websocket.onopen = async () => {
            await websocket.send(JSON.stringify({"action": "user", "userName": userSession?.username}))
            await toast({
                description: `Connecting to server!`,
            });
        };

        websocket.onmessage = async (event) => {
            const data_parse = await JSON.parse(event.data);
            try{
            switch (data_parse?.type) {
                case 'auth':
                if (data_parse?.status == 1){
                    await setWss(websocket);
                    toast({
                    description: `Connected to server!`,
                    className: "bg-emerald-300"
                    });
                } else {
                    toast({
                    description: `Error while connect to server!`,
                    className: "bg-red-500 text-white"
                    });
                }
                break;
            }
            } 
            catch (err) {
            toast({
                description: `Error message returned!`,
                className: "bg-red-500 text-white"
            });
            }
        };

        websocket.onclose = () => {
            console.log('WebSocket is closed');
        };

        return () => { 
        websocket.close(); 
        toast({
        description: 'Disconnected from server.',
        className: "bg-red-500 text-white"
        });
        }
    }else{
        toast({
        description: 'Getting infomation from server.',
        className: "bg-yellow-500 text-white"
        });
    }
    }, [toast, userSession]);

    return (
        <WebSocketContext.Provider value={{wss, setWss}}>
            {children}
        </WebSocketContext.Provider>
    )
}

export function useWebSocketContext () {
    return useContext(WebSocketContext);
}