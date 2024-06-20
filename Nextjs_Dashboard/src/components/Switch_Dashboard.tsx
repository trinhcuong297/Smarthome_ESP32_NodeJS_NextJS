import { LoaderCircleIcon, PlugZap2Icon } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
  } from '@/components/ui/card';
import { useEffect, useState } from "react";
import { useUserDataContext } from "@/context/UserDataContext";



const getOneDevice = async (deviceID : any, userSession: any) => {
    const response = await fetch(`https://smarthome-esp32-nodejs-nextjs.onrender.com/v1/api/device/onedevice/${deviceID}`,
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
    if (data?.status == "success")
        {
            return data?.device
        }
}

const getAllDevice = async (setAllDevice: any, userSession: any) => {
    const response = await fetch("https://smarthome-esp32-nodejs-nextjs.onrender.com/v1/api/device/alldevice",
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
    let allDev: any = [];
    if (await data?.status == "success" && data?.devices)
    {
        allDev = await data?.devices.map(async (e: any) => await getOneDevice(e, userSession))
        allDev = await Promise.all(allDev);
        setAllDevice(await allDev);
    }

}

export default function SwitchDashboard ()
{
    const [allDevice, setAllDevice] = useState([]);
    const [loading, setLoading] = useState(false)
    const {userAttributes, setUserAttributes, userSession, setUserSession} = useUserDataContext();
    useEffect(() => {
        getAllDevice(setAllDevice, userSession);
    },[setAllDevice, userSession])

    const controlDevice = async (userSession: any, deviceID: any, value: any) => {
        setLoading(true)
        const response = await fetch(`https://smarthome-esp32-nodejs-nextjs.onrender.com/v1/api/device/control/${deviceID}`,
            {
                method: "PATCH",
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "CLIENT_ID": userSession?.userId,
                    "ACCESS_TOKEN": userSession?.token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({"value": `${value?1:0}`})
            }
        );
        await setTimeout(async ()=>{
            await getAllDevice(setAllDevice, userSession);
            await setLoading(false)
        }, 1000)
        
    }
    // useEffect(() => {
    //     setInterval(() => {
    //         getAllDevice(setAllDevice, userSession);
    //     },3000)
    // },[])

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {
                allDevice?.map((e: any, index) => {
                    return <>
                    <Card className="hover:cursor-pointer active:bg-slate-200" key={index} onClick={() => loading?{} : controlDevice(userSession,e?.deviceID ,!(e?.value?.state))}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                            Device {e?.name}
                            </CardTitle>
                            <div className="relative">
                            <div className="h-4 w-4 bg-lime-500 rounded-full animate-ping"></div>
                            <div className="h-4 w-4 bg-lime-500 rounded-full absolute top-0"></div>
                            </div>
                        </CardHeader>
                        <CardContent className="flex justify-between">
                            <p className="text-xs text-muted-foreground">
                            Last modify: Unknow
                            </p>
                            {loading ? <LoaderCircleIcon className="w-6 h-6 animate-spin" /> :<Switch 
                                checked = {e?.value?.state}
                            />}
                        </CardContent>
                    </Card>
                    </>
                })
            }
            
        </div>
    )
} 