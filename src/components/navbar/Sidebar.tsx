import { LayoutDashboard, Coins, X } from "lucide-react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/basic/utils";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

const navItems = [
  { title: "Dashboard", icon: LayoutDashboard, url: "/" },
  { title: "Tokens", icon: Coins, url: "/tokens" },
];

export function Sidebar({ open, onOpenChange }: { open?: boolean; onOpenChange?: (open: boolean) => void }) {
  const sidebarContent = (
    <>
      <div className="p-6 border-b border-sidebar-border">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          LaunchPad
        </h1>
      </div>
      
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.url}
            to={item.url}
            end
            onClick={() => onOpenChange?.(false)}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
                "hover:bg-sidebar-accent hover:shadow-glow-primary",
                isActive
                  ? "bg-sidebar-accent text-sidebar-primary font-medium shadow-glow-primary"
                  : "text-sidebar-foreground"
              )
            }
          >
            <item.icon className="h-5 w-5" />
            <span>{item.title}</span>
          </NavLink>
        ))}
      </nav>
    </>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex fixed left-0 top-0 h-screen w-64 bg-sidebar border-r border-sidebar-border flex-col">
        {sidebarContent}
      </aside>

      {/* Mobile Sidebar */}
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent side="left" className="w-64 p-0 bg-sidebar border-sidebar-border">
          {sidebarContent}
        </SheetContent>
      </Sheet>
    </>
  );
}
