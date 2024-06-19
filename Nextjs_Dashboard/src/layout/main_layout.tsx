import Header from "@/components/layout/header";
import { Toaster } from "@/components/ui/toaster";
import NextTopLoader from "nextjs-toploader";
import Sidebar from "./sidebar";

export default function MainLayout({children}: {children: React.ReactNode}) {
    return <div className="">
        <NextTopLoader />
        <Toaster />
        <Header />
        <div className="flex overflow-hidden pt-16 h-screen">
            <Sidebar />
            {children}
        </div>
        </div>
}