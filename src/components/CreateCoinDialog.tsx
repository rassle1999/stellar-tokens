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
import { useTokens } from "@/contexts/TokenContext";
import { BACKEND_URL } from "@/lib/constant";
import { createToken } from "@/lib/Token/createToken";
import { useProvider } from "@/contexts/ProviderContext";
import { ethers } from "ethers";
export function CreateCoinDialog() {
  const [open, setOpen] = useState(false);
  const [coinName, setCoinName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [supply, setSupply] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const { toast } = useToast();
  const { walletProvider, setWalletProvider } = useProvider();

  const handleCreate = () => {

    const supplyNum = parseFloat(supply);
    const priceNum = Math.random() * 0.1;
    const marketCapNum = supplyNum * priceNum;

    console.log("file:", image);
    const formData = new FormData();
    formData.append('file', image); // ⬅️ Must match .single('file')
    formData.append('name', coinName);
    formData.append('symbol', symbol);
    formData.append('description', description);
    fetch(`${BACKEND_URL}/upload`, {
      method: 'POST',
      body: formData, // No need to set headers for FormData manually
    })
      .then(response => response.json())
      .then(async (data) => {
        const publicUrl = data.publicUrl;
        const urlData = data.urlData;
        console.log('Public URL:', publicUrl);
        let success;
        try {
          success = await createToken(coinName, symbol, publicUrl, ethers.BigNumber.from(supply), walletProvider.getSigner());
        } catch (err) {
          console.log("Create Token Error:", err);
          success = false;
        }
        if (success) {
          toast({
            title: "Token Created!",
            description: `${coinName} (${symbol}) has been successfully created.`,
          });
        }
        else {
          toast({
            title: "Token Create Failed!",
            description: `${coinName} (${symbol}) hasn't been created.`,
          });
        }
      });



    setCoinName("");
    setSymbol("");
    setSupply("");
    setDescription("");
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
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              placeholder="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
