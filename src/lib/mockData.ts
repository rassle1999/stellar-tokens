export interface Token {
  id: string;
  name: string;
  symbol: string;
  image: string;
  marketCap: string;
  price: string;
  priceChange: number;
  createdAt: string;
  address: string;
  ethReserveCap: number;
  currentReserve: number;
}

export const mockTokens: Token[] = [
  {
    id: "1",
    name: "Moonshot",
    symbol: "MOON",
    image: "https://api.dicebear.com/7.x/shapes/svg?seed=moonshot",
    marketCap: "$2.5M",
    price: "$0.025",
    priceChange: 15.3,
    createdAt: "2024-01-15",
    address: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
    ethReserveCap: 100,
    currentReserve: 65,
  },
  {
    id: "2",
    name: "RocketFuel",
    symbol: "FUEL",
    image: "https://api.dicebear.com/7.x/shapes/svg?seed=rocketfuel",
    marketCap: "$1.8M",
    price: "$0.018",
    priceChange: -5.2,
    createdAt: "2024-01-14",
    address: "0x853d955aCEf822Db058eb8505911ED77F175b99e",
    ethReserveCap: 100,
    currentReserve: 42,
  },
  {
    id: "3",
    name: "StarDust",
    symbol: "STAR",
    image: "https://api.dicebear.com/7.x/shapes/svg?seed=stardust",
    marketCap: "$3.2M",
    price: "$0.032",
    priceChange: 22.7,
    createdAt: "2024-01-13",
    address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    ethReserveCap: 100,
    currentReserve: 78,
  },
  {
    id: "4",
    name: "GalaxySwap",
    symbol: "GLXY",
    image: "https://api.dicebear.com/7.x/shapes/svg?seed=galaxyswap",
    marketCap: "$1.2M",
    price: "$0.012",
    priceChange: 8.5,
    createdAt: "2024-01-12",
    address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    ethReserveCap: 100,
    currentReserve: 33,
  },
  {
    id: "5",
    name: "CosmicCoin",
    symbol: "COSM",
    image: "https://api.dicebear.com/7.x/shapes/svg?seed=cosmiccoin",
    marketCap: "$4.1M",
    price: "$0.041",
    priceChange: -3.1,
    createdAt: "2024-01-11",
    address: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
    ethReserveCap: 100,
    currentReserve: 55,
  },
  {
    id: "6",
    name: "NebulaPay",
    symbol: "NEBL",
    image: "https://api.dicebear.com/7.x/shapes/svg?seed=nebulapay",
    marketCap: "$890K",
    price: "$0.0089",
    priceChange: 12.8,
    createdAt: "2024-01-10",
    address: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
    ethReserveCap: 100,
    currentReserve: 28,
  },
  {
    id: "7",
    name: "OrbitToken",
    symbol: "ORBT",
    image: "https://api.dicebear.com/7.x/shapes/svg?seed=orbittoken",
    marketCap: "$5.6M",
    price: "$0.056",
    priceChange: 18.9,
    createdAt: "2024-01-09",
    address: "0x514910771AF9Ca656af840dff83E8264EcF986CA",
    ethReserveCap: 100,
    currentReserve: 82,
  },
  {
    id: "8",
    name: "AstroVault",
    symbol: "ASTR",
    image: "https://api.dicebear.com/7.x/shapes/svg?seed=astrovault",
    marketCap: "$2.9M",
    price: "$0.029",
    priceChange: -7.4,
    createdAt: "2024-01-08",
    address: "0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9",
    ethReserveCap: 100,
    currentReserve: 48,
  },
];
