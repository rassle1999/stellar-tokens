import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function CreateCoinDialog() {
  const [open, setOpen] = useState(false);
  const [coinName, setCoinName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [supply, setSupply] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const { toast } = useToast();

  const handleCreate = () => {
    if (!coinName || !symbol || !supply) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Token Created!",
      description: `${coinName} (${symbol}) has been successfully created.`,
    });

    setCoinName("");
    setSymbol("");
    setSupply("");
    setImage(null);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-primary hover:bg-primary/90 shadow-glow-primary">
          <Plus className="mr-2 h-4 w-4" />
          Create Coin
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-card border-border">
        <DialogHeader>
          <DialogTitle>Create New Token</DialogTitle>
          <DialogDescription>
            Fill in the details to create your new token.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Token Name</Label>
            <Input
              id="name"
              placeholder="e.g., Bitcoin"
              value={coinName}
              onChange={(e) => setCoinName(e.target.value)}
              className="bg-secondary border-border"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="symbol">Symbol</Label>
            <Input
              id="symbol"
              placeholder="e.g., BTC"
              value={symbol}
              onChange={(e) => setSymbol(e.target.value.toUpperCase())}
              className="bg-secondary border-border"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="supply">Total Supply</Label>
            <Input
              id="supply"
              type="number"
              placeholder="e.g., 1000000"
              value={supply}
              onChange={(e) => setSupply(e.target.value)}
              className="bg-secondary border-border"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="image">Token Image</Label>
            <div className="flex items-center gap-2">
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files?.[0] || null)}
                className="bg-secondary border-border"
              />
              {image && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Upload className="h-4 w-4" />
                  {image.name}
                </div>
              )}
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button
            onClick={handleCreate}
            className="w-full bg-primary hover:bg-primary/90 shadow-glow-primary"
          >
            Create Token
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
