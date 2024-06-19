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

export default function Home() {
  const {userAttributes, setUserAttributes, userSession, setUserSession} = useUserDataContext();
  const {wss, setWss} = useWebSocketContext();

  return (
    <>
      <Head>
      <title>Legend - Smart Home System with AWS</title>
      </Head>
        <MainLayout>
          <main className="flex-1 overflow-hidden">
            <ScrollArea className="h-full">
              <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
                <div className="flex items-center justify-between space-y-2">
                  <h2 className="text-3xl font-bold tracking-tight">
                    Welcome home, Boss
                  </h2>
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
                    <TabsTrigger value="overview">
                      Overview
                    </TabsTrigger>
                    <TabsTrigger value="switch">
                      Light Switch
                    </TabsTrigger>
                    <TabsTrigger value="temperature">
                      Temperature
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="overview" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                      <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-sm font-medium">
                            Total device
                          </CardTitle>
                          <CpuIcon className="h-4 w-4"/>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">100</div>
                          <p className="text-xs text-muted-foreground">
                            All device in home
                          </p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-sm font-medium">
                            Active device
                          </CardTitle>
                          <CircleCheckBigIcon className="w-4 h-4" />
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">+2350</div>
                          <p className="text-xs text-muted-foreground">
                            +1 from last hour
                          </p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-sm font-medium">Device health</CardTitle>
                          <AudioWaveformIcon className="w-4 h-4" />
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">98%</div>
                          <p className="text-xs text-muted-foreground">
                            Almost device is healthy
                          </p>
                        </CardContent>
                      </Card>
                      <Card className="">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-sm font-medium">
                            Scene
                          </CardTitle>
                          <CloudRainIcon className="w-4 h-4" />
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">Rainy Scene</div>
                          <p className="text-xs text-muted-foreground">
                            Air Quality: Good
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                    <div className="grid grid-cols-1 gap-4 xl:grid-cols-7">
                      <Card className="col-span-1 lg:col-span-4">
                        <CardHeader>
                          <CardTitle>Overview</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <Overview />
                        </CardContent>
                      </Card>
                      <Card className="col-span-1 xl:col-span-3">
                        <CardHeader>
                          <CardTitle>Recent Device</CardTitle>
                          <CardDescription>
                            You got 100 device now.
                            <DataTableDemo />
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                  <TabsContent value="switch" className="space-y-4">
                    <SwitchDashboard/>
                  </TabsContent>
                  <TabsContent value="temperature" className="space-y-4">
                    <ResizablePanelGroup direction="horizontal" className="h-full">
                      <ResizablePanel className=" min-w-[360px]">
                        <ScrollArea className="h-full max-h-[700px]">
                        <div className="px-3 space-y-4">
                          <Card className="hover:cursor-pointer active:bg-slate-200">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                              <CardTitle className="text-sm font-medium">
                                Device 1a2a3aaa
                              </CardTitle>
                              <CircleCheckIcon className="h-4 w-4 text-white bg-green-500 rounded-full"/>
                            </CardHeader>
                            <CardContent className="flex justify-between items-center">
                              <p className="text-xs text-muted-foreground">
                              Last modify: 11:02 6/17/2024
                              </p>
                              <div className="flex justify-between items-center space-x-3">
                              <ThermometerSunIcon className="text-xs text-muted-foreground" />
                              <p className="text-md font-semibold "> 27 oC </p>
                              </div>
                            </CardContent>
                          </Card>
                          <Card className="hover:cursor-pointer active:bg-slate-200">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                              <CardTitle className="text-sm font-medium">
                                Device 1a2a3aaa
                              </CardTitle>
                              <CircleCheckIcon className="h-4 w-4 text-white bg-green-500 rounded-full"/>
                            </CardHeader>
                            <CardContent className="flex justify-between items-center">
                              <p className="text-xs text-muted-foreground">
                              Last modify: 11:02 6/17/2024
                              </p>
                              <div className="flex justify-between items-center space-x-3">
                              <ThermometerSunIcon className="text-xs text-muted-foreground" />
                              <p className="text-md font-semibold "> 27 oC </p>
                              </div>
                            </CardContent>
                          </Card>
                          <Card className="hover:cursor-pointer active:bg-slate-200">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                              <CardTitle className="text-sm font-medium">
                                Device 1a2a3aaa
                              </CardTitle>
                              <CircleCheckIcon className="h-4 w-4 text-white bg-green-500 rounded-full"/>
                            </CardHeader>
                            <CardContent className="flex justify-between items-center">
                              <p className="text-xs text-muted-foreground">
                              Last modify: 11:02 6/17/2024
                              </p>
                              <div className="flex justify-between items-center space-x-3">
                              <ThermometerSunIcon className="text-xs text-muted-foreground" />
                              <p className="text-md font-semibold "> 27 oC </p>
                              </div>
                            </CardContent>
                          </Card>
                          <Card className="hover:cursor-pointer active:bg-slate-200">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                              <CardTitle className="text-sm font-medium">
                                Device 1a2a3aaa
                              </CardTitle>
                              <CircleCheckIcon className="h-4 w-4 text-white bg-green-500 rounded-full"/>
                            </CardHeader>
                            <CardContent className="flex justify-between items-center">
                              <p className="text-xs text-muted-foreground">
                              Last modify: 11:02 6/17/2024
                              </p>
                              <div className="flex justify-between items-center space-x-3">
                              <ThermometerSunIcon className="text-xs text-muted-foreground" />
                              <p className="text-md font-semibold "> 27 oC </p>
                              </div>
                            </CardContent>
                          </Card>
                          <Card className="hover:cursor-pointer active:bg-slate-200">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                              <CardTitle className="text-sm font-medium">
                                Device 1a2a3aaa
                              </CardTitle>
                              <CircleCheckIcon className="h-4 w-4 text-white bg-green-500 rounded-full"/>
                            </CardHeader>
                            <CardContent className="flex justify-between items-center">
                              <p className="text-xs text-muted-foreground">
                              Last modify: 11:02 6/17/2024
                              </p>
                              <div className="flex justify-between items-center space-x-3">
                              <ThermometerSunIcon className="text-xs text-muted-foreground" />
                              <p className="text-md font-semibold "> 27 oC </p>
                              </div>
                            </CardContent>
                          </Card>
                          <Card className="hover:cursor-pointer active:bg-slate-200">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                              <CardTitle className="text-sm font-medium">
                                Device 1a2a3aaa
                              </CardTitle>
                              <CircleCheckIcon className="h-4 w-4 text-white bg-green-500 rounded-full"/>
                            </CardHeader>
                            <CardContent className="flex justify-between items-center">
                              <p className="text-xs text-muted-foreground">
                              Last modify: 11:02 6/17/2024
                              </p>
                              <div className="flex justify-between items-center space-x-3">
                              <ThermometerSunIcon className="text-xs text-muted-foreground" />
                              <p className="text-md font-semibold "> 27 oC </p>
                              </div>
                            </CardContent>
                          </Card>
                          <Card className="hover:cursor-pointer active:bg-slate-200">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                              <CardTitle className="text-sm font-medium">
                                Device 1a2a3aaa
                              </CardTitle>
                              <CircleCheckIcon className="h-4 w-4 text-white bg-green-500 rounded-full"/>
                            </CardHeader>
                            <CardContent className="flex justify-between items-center">
                              <p className="text-xs text-muted-foreground">
                              Last modify: 11:02 6/17/2024
                              </p>
                              <div className="flex justify-between items-center space-x-3">
                              <ThermometerSunIcon className="text-xs text-muted-foreground" />
                              <p className="text-md font-semibold "> 27 oC </p>
                              </div>
                            </CardContent>
                          </Card>
                          <Card className="hover:cursor-pointer active:bg-slate-200">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                              <CardTitle className="text-sm font-medium">
                                Device 1a2a3aaa
                              </CardTitle>
                              <CircleCheckIcon className="h-4 w-4 text-white bg-green-500 rounded-full"/>
                            </CardHeader>
                            <CardContent className="flex justify-between items-center">
                              <p className="text-xs text-muted-foreground">
                              Last modify: 11:02 6/17/2024
                              </p>
                              <div className="flex justify-between items-center space-x-3">
                              <ThermometerSunIcon className="text-xs text-muted-foreground" />
                              <p className="text-md font-semibold "> 27 oC </p>
                              </div>
                            </CardContent>
                          </Card>
                          <Card className="hover:cursor-pointer active:bg-slate-200">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                              <CardTitle className="text-sm font-medium">
                                Device 1a2a3aaa
                              </CardTitle>
                              <CircleCheckIcon className="h-4 w-4 text-white bg-green-500 rounded-full"/>
                            </CardHeader>
                            <CardContent className="flex justify-between items-center">
                              <p className="text-xs text-muted-foreground">
                              Last modify: 11:02 6/17/2024
                              </p>
                              <div className="flex justify-between items-center space-x-3">
                              <ThermometerSunIcon className="text-xs text-muted-foreground" />
                              <p className="text-md font-semibold "> 27 oC </p>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                        </ScrollArea>
                      </ResizablePanel>
                      <ResizableHandle withHandle />
                      <ResizablePanel>
                        <Overview />
                      </ResizablePanel>
                    </ResizablePanelGroup>
                  </TabsContent>
                </Tabs>
              </div>
            </ScrollArea>
          </main>
        </MainLayout>
    </>
  );
}
      