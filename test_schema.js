import { createClient } from "genlayer-js";
import { studionet } from "genlayer-js/chains";

const VERDICT_CONTRACT_ADDRESS = "0x0a68976c515fb9D7fB6dedaAB8aCb5c4ED2a4C6e";

const client = createClient({
    chain: studionet,
});

async function main() {
    try {
        console.log("Fetching contract schema...");
        const schema = await client.getContractSchema({
            address: VERDICT_CONTRACT_ADDRESS,
        });
        console.log("Schema:", JSON.stringify(schema, null, 2));
    } catch (e) {
        console.error("Error get_contract_schema:", e.message);
    }
}

main();
