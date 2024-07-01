import { Card } from "@aws-amplify/ui-react"
import { ScrollArea } from "@radix-ui/react-scroll-area"
import { CircleCheckIcon, ThermometerSunIcon } from "lucide-react"
import { Overview } from "./overview"
import { CardHeader, CardTitle, CardContent } from "./ui/card"
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "./ui/resizable"
import { useEffect, useState } from "react";
import { useUserDataContext } from "@/context/UserDataContext";

const getAllSensor = async (setAllSensor: any, userSession: any) => {
    const response = await fetch("https://smarthome-esp32-nodejs-nextjs.onrender.com/v1/api/device/sensor",
        {
            method: "GET",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "CLIENT_ID": userSession?.userId,
                "ACCESS_TOKEN": userSession?.token
            }
        }
    );
    const data = await response.json();
    console.log(await data);
    setAllSensor(await data?.all);
}

const Temperature_Dashboard = () => {
    const [allSensor, setAllSensor] = useState([]);
    const [loading, setLoading] = useState(false)
    const {userAttributes, setUserAttributes, userSession, setUserSession} = useUserDataContext();
    useEffect(() => {
        getAllSensor(setAllSensor, userSession);
    },[setAllSensor, userSession])

    return (
        <ResizablePanelGroup direction="horizontal" className="h-full">
        <ResizablePanel className=" min-w-[360px]">
        <ScrollArea className="h-full max-h-[700px]">
        {
            allSensor?.map((e: any, index: any) => {
                return <div className="px-3 space-y-4" key={index}>
                    <Card className="hover:cursor-pointer active:bg-slate-200">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                        {e?.mac}
                        </CardTitle>
                        <CircleCheckIcon className="h-4 w-4 text-white bg-green-500 rounded-full"/>
                    </CardHeader>
                    <CardContent className="flex justify-between items-center">
                        <p className="text-xs text-muted-foreground">
                        Last modify: {e?.updatedAt}
                        </p>
                        <div className="flex justify-between items-center space-x-3">
                        <ThermometerSunIcon className="text-xs text-muted-foreground" />
                        <p className="text-md font-semibold "> {e?.temperature} oC </p>
                        </div>
                    </CardContent>
                    </Card>
                </div>
            })
        }
        </ScrollArea>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel>
        <Overview />
        </ResizablePanel>
    </ResizablePanelGroup>
    )
}

export default Temperature_Dashboard;