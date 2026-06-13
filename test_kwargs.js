import { createClient } from "genlayer-js";
import { studionet } from "genlayer-js/chains";

const VERDICT_CONTRACT_ADDRESS = "0x0a68976c515fb9D7fB6dedaAB8aCb5c4ED2a4C6e";

const client = createClient({
    chain: studionet,
});

async function main() {
    console.log("Testing with kwargs or nothing...");
    try {
        const total = await client.readContract({
            address: VERDICT_CONTRACT_ADDRESS,
            functionName: "get_total_cases",
            args: []
        });
        console.log("Total (args: []):", total);
    } catch (e) {
        console.error("Error 1:", e.message);
    }
    
    try {
        const total = await client.readContract({
            address: VERDICT_CONTRACT_ADDRESS,
            functionName: "get_total_cases",
            kwargs: {}
        });
        console.log("Total (kwargs: {}):", total);
    } catch (e) {
        console.error("Error 2:", e.message);
    }
}

main();
