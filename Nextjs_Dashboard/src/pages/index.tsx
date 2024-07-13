import Head from "next/head";
import { Overview } from '@/components/overview';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MainLayout from "@/layout/main_layout";
import { DashboardDataProvider } from "@/context/DashboardDataContext";
import { useEffect, useState } from "react";
import { fetchUserAttributes } from "aws-amplify/auth";
import { toast, useToast } from '@/components/ui/use-toast';
import { useUserDataContext } from "@/context/UserDataContext";
import { Button } from "@/components/ui/button";
import { DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ClaimDevice } from "@/components/ClaimDevice";
import { AudioWaveformIcon, CircleCheckBigIcon, CircleCheckIcon, CloudRainIcon, CpuIcon, PlugZap2Icon, ShirtIcon, ThermometerSunIcon } from "lucide-react";
import { useWebSocketContext } from "@/context/WebSocketContext";
import { DataTableDemo } from "@/components/DataTable";
import { Switch } from "@/components/ui/switch";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import SwitchDashboard from "@/components/Switch_Dashboard";
import { RemoveDevice } from "@/components/RemoveDevice";
import Temperature_Dashboard from "@/components/Temperature_Dashboard";

export default function Home() {
  const {userAttributes, setUserAttributes, userSession, setUserSession} = useUserDataContext();
  const {wss, setWss} = useWebSocketContext();

  return (
    <>
      {/* Tiêu đề web */}
      <Head>
      <title>Legend - Smart Home System with AWS</title>
      </Head>

      {/* Layout bao gồm sidebar, navbar */}
      <MainLayout>

        {/* Giao diện điều khiển home page */}
        <main className="flex-1 overflow-hidden">
          <ScrollArea className="h-full">
            <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
              <div className="flex items-center justify-between space-y-2">
                
                {/* Lời chào */}
                <h2 className="text-3xl font-bold tracking-tight">
                  Welcome home, Boss
                </h2>

                {/* Nút nhấn thêm bớt thiết bị */}
                <div className="items-center space-x-2 md:flex">
                  <Dialog>
                    <DialogTrigger>
                      <Button>Add device</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>
                          Claim your device
                        </DialogTitle>
                        <DialogDescription>
                          Scan QR code on your device / Enter your device ID
                        </DialogDescription>
                        <ClaimDevice />
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                  <Dialog>
                    <DialogTrigger>
                      <Button className="bg-red-500">Remove device</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>
                          Remove device
                        </DialogTitle>
                        <DialogDescription>
                          Scan QR code on your device / Enter your device ID
                        </DialogDescription>
                        <RemoveDevice />
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
              <Tabs defaultValue="switch" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="switch">
                    Light Switch
                  </TabsTrigger>
                  <TabsTrigger value="temperature">
                    Temperature
                  </TabsTrigger>
                </TabsList>

                {/* Khối điều khiển đèn */}
                <TabsContent value="switch" className="space-y-4">
                  <SwitchDashboard/>
                </TabsContent>
                
                <TabsContent value="temperature" className="space-y-4">
                  <Temperature_Dashboard />
                </TabsContent>
              </Tabs>
            </div>
          </ScrollArea>
        </main>
      </MainLayout>
    </>
  );
}
      