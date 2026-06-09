import { createClient } from "genlayer-js";
import { studionet } from "genlayer-js/chains";

// 1. Initialize the client to talk to the Studio sandbox network
export const client = createClient({
    chain: studionet,
});

// 2. Lock in your exact contract address from the sandbox deployment
export const VERDICT_CONTRACT_ADDRESS = "0x0a68976c515fb9D7fB6dedaAB8aCb5c4ED2a4C6e"; // Replace with your exact full address if truncated