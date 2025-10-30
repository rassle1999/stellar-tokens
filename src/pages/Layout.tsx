import { Outlet } from "react-router-dom";
import { Sidebar } from "@/components/navbar/Sidebar";
import { Header } from "@/components/navbar/Header";
import { useState } from "react";

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Sidebar open={sidebarOpen} onOpenChange={setSidebarOpen} />
      <Header onMenuClick={() => setSidebarOpen(true)} />
      <main className="md:ml-64 pt-16">
        <div className="p-4 md:p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
