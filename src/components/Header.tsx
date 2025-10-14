import { Search, Wallet } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function Header() {
  const [connected, setConnected] = useState(false);

  return (
    <header className="fixed top-0 left-64 right-0 h-16 bg-card/50 backdrop-blur-lg border-b border-border z-10">
      <div className="h-full px-6 flex items-center justify-between gap-4">
        <div className="flex-1 max-w-md relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search Tokens..."
            className="pl-10 bg-secondary border-border focus:border-primary transition-colors"
          />
        </div>

        <Button
          onClick={() => setConnected(!connected)}
          className={connected ? "bg-success hover:bg-success/90" : "bg-primary hover:bg-primary/90"}
        >
          <Wallet className="mr-2 h-4 w-4" />
          {connected ? "Connected" : "Connect Wallet"}
        </Button>
      </div>
    </header>
  );
}
