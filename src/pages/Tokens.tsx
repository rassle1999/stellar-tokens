import { useState, useEffect } from "react";
import { TokenCard } from "@/components/TokenCard";
import { CreateCoinDialog } from "@/components/CreateCoinDialog";
import { updateCurrentTokens } from "@/lib/Tokens/updateCurrentTokens";
import { updateTokenCount } from "@/lib/Tokens/updateTokenCount";
import { Token,useTokens } from "@/contexts/TokenContext";
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
  const {tokens,setTokens} = useTokens();
  const [tokenCount, setTokenCount] = useState(0);
  useEffect(() => {
    const fetchTokenData = async () => {
      await updateTokenCount(setTokenCount);
      await updateCurrentTokens(setTokens, currentPage);
    }
    fetchTokenData();
  }, []);
  const totalPages = Math.ceil(tokenCount / ITEMS_PER_PAGE);
  const handlePage = async (page:number) =>{
    setCurrentPage(page);
    await updateCurrentTokens(setTokens, page);
  }
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">All Tokens</h1>
          <p className="text-muted-foreground">Browse and manage all available tokens</p>
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
              onClick={()=>handlePage(Math.max(1, currentPage - 1))}
              className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
            />
          </PaginationItem>

          {/* {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => ( */}
            <PaginationItem key={currentPage}>
              <PaginationLink
                className="cursor-pointer"
              >
                {currentPage}
              </PaginationLink>
            </PaginationItem>
          {/* ))} */}

          <PaginationItem>
            <PaginationNext
              onClick={() => handlePage(Math.min(totalPages, currentPage + 1))}
              className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
//Changed