import { useState, useEffect } from "react";
import { TokenCard } from "@/components/card/TokenCard";
import { CreateCoinDialog } from "@/components/CreateCoinDialog";
import { updateCurrentTokens } from "@/lib/Tokens/updateCurrentTokens";
import { updateTokenCount } from "@/lib/Tokens/updateTokenCount";
import { Token, useTokens } from "@/contexts/TokenContext";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Search, Wallet } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
const ITEMS_PER_PAGE = 6;

export default function Tokens() {
  const [currentPage, setCurrentPage] = useState(1);
  const { tokens, setTokens } = useTokens();
  const [tokenCount, setTokenCount] = useState(0);
  const [sortBy, setSortBy] = useState("date");
  const [search, setSearch] = useState("");
  useEffect(() => {
    const fetchTokenData = async () => {
      await updateTokenCount(setTokenCount, search);
      await updateCurrentTokens(setTokens, currentPage, sortBy, search);
    }
    const ws = new WebSocket("ws://localhost:5010");
    ws.onmessage = (msg) => {
      const update = async () => {
        await updateTokenCount(setTokenCount, search);
        await updateCurrentTokens(setTokens, currentPage, sortBy, search);
      }
      update();
    }
    fetchTokenData();
    return () => ws.close();

  }, []);
  const totalPages = Math.ceil(tokenCount / ITEMS_PER_PAGE);
  const handlePage = async (page: number) => {
    setCurrentPage(page);
    await updateCurrentTokens(setTokens, page, sortBy, search);
  }
  const handleValueChange = async (mode: string) => {
    setSortBy(mode);
    await updateTokenCount(setTokenCount, search);
    await updateCurrentTokens(setTokens, currentPage, mode, search);
  }
  const handleClick = async () => {
    await updateTokenCount(setTokenCount, search);
    await updateCurrentTokens(setTokens, currentPage, sortBy, search);
  }
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex-1 max-w-md flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Tokens..."
              className="pl-10 bg-secondary border-border focus:border-primary transition-colors"
            />
          </div>
          <Button variant="default" size="default" onClick={handleClick}>
            <Search className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex justify-center">
          <ToggleGroup type="single" value={sortBy} onValueChange={(value) => handleValueChange(value)}>
            <ToggleGroupItem value="marketCap">Market Cap</ToggleGroupItem>
            <ToggleGroupItem value="volume">Volume</ToggleGroupItem>
            <ToggleGroupItem value="date">Date</ToggleGroupItem>
          </ToggleGroup>
        </div>
        <CreateCoinDialog />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        {tokens.map((token) => (
          <TokenCard key={token.id} {...token} />
        ))}
      </div>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => handlePage(Math.max(1, currentPage - 1))}
              className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
            />
          </PaginationItem>

          <PaginationItem key={currentPage}>
            <PaginationLink
              className="cursor-pointer"
            >
              {currentPage}
            </PaginationLink>
          </PaginationItem>

          <PaginationItem>
            <PaginationNext
              onClick={() => handlePage(Math.max(Math.min(totalPages, currentPage + 1),1))}
              className={currentPage >= totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}