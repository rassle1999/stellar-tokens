import { Outlet } from "react-router-dom";
import { Sidebar } from "@/components/navbar/Sidebar";
import { Header } from "@/components/navbar/Header";

export default function Layout() {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <Header />
      <main className="ml-64 pt-16">
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
