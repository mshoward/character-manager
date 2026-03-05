import { Outlet } from "react-router-dom"
import {ThemeProvider } from "@/components/theme-provider"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Link } from "react-router-dom";
 
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="flex min-h-screen bg-background">
        <SidebarProvider>
          <AppSidebar />
          <main>
            <SidebarTrigger />
            {children}
          </main>
        </SidebarProvider>
        <div className="w-64 border-r p-6">
          <h1 className="text-2xl font-bold">Character Manager</h1>
          {/* Navigation links will go here */}
        </div>
        {/* Main content area - new pages load here! */}
        <div className="flex-1 p-8">
          <Outlet />
        </div>
      </div>
    </ThemeProvider>
  )
};
