export const BACKEND_URL="http://localhost:5010";
export const FACTORY_ABI =[
    "function buy(address token, uint256 amountOutMin, address to) payable",
    "function sell(address token, uint256 amount, uint256 amountOutMin, address to)",
    `function deployToken(
        string memory name_,
        string memory symbol_,
        string memory uri_,
        uint256 initialSupply_
    ) payable returns (address token)`,
    `event Deployed(address indexed token, address indexed bondingCurve, address indexed creator,uint256 timestamp)`,
    `event Swap(
        address token,
        address indexed swapper,
        uint amountIn,
        uint amountOut,
        uint price,
        bool direction
    )`,
    "function bondingCurveMap(address) view returns (address)",
];
export const BONDING_ABI = [
    "function reserveToken() view returns (uint256)",
    "function reserveEth() view returns (uint256)",
    "function tokenReserveCap() view returns (uint256)",
]
export const TOKEN_ABI =[
    `function approve(address spender, uint256 value) returns (bool)`
]
export const FACTORY_ADDRESS = "0xBF4114D783d96D2205cF5BD71B3CfBFD53E8fF00";