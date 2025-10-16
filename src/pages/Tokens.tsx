import { useState,useEffect } from "react";
import { TokenCard } from "@/components/TokenCard";
import { CreateCoinDialog } from "@/components/CreateCoinDialog";
import { useTokens } from "@/contexts/TokenContext";
import { getTokensInformation } from "@/lib/tokens/getTokensInformation";
import { Token } from "@/contexts/TokenContext";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { set } from "date-fns";

const ITEMS_PER_PAGE = 6;
const updateTokens = async (setTokens: React.Dispatch<React.SetStateAction<Token[]>>) => {
  try {
    const tokens = await getTokensInformation();
    setTokens(tokens);
    console.log("Fetched tokens:", tokens);
  } catch (error) {
    console.error("Error updating tokens:", error);
  }
};
export default function Tokens() {
  const { tokens ,setTokens } = useTokens();
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    updateTokens(setTokens);
  }, []);
  const totalPages = Math.ceil(tokens.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentTokens = tokens.slice(startIndex, endIndex);

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
        {currentTokens.map((token) => (
          <TokenCard key={token.id} {...token} />
        ))}
      </div>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
            />
          </PaginationItem>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                onClick={() => setCurrentPage(page)}
                isActive={currentPage === page}
                className="cursor-pointer"
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}
          
          <PaginationItem>
            <PaginationNext
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
