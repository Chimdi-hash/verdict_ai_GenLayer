import { createClient } from "genlayer-js";
import { studionet } from "genlayer-js/chains";
import { TransactionStatus } from "genlayer-js/types";

// The deployed VerdictAI contract address on studionet
export const VERDICT_CONTRACT_ADDRESS = "0x0a68976c515fb9D7fB6dedaAB8aCb5c4ED2a4C6e";

// ─── READ CLIENT ───────────────────────────────────────────────────────────
// No wallet needed. Talks directly to the GenLayer studionet RPC.
// Used for readContract() calls like get_verdict() and get_total_cases().
const readClient = createClient({
    chain: studionet,
});

// ─── WRITE CLIENT FACTORY ──────────────────────────────────────────────────
// Built lazily once the user connects their wallet.
// Requires provider: window.ethereum and the connected account address.
let _writeClient = null;

export function initWriteClient(accountAddress) {
    _writeClient = createClient({
        chain: studionet,
        account: accountAddress,
        provider: window.ethereum,
    });
    return _writeClient;
}

export function getWriteClient() {
    return _writeClient;
}

/**
 * Switch MetaMask to the GenLayer studionet and then broadcast
 * submit_dispute(dispute_id, party_a, party_b, evidence).
 *
 * Flow:
 *  1. client.connect("studionet") — switches MetaMask network
 *  2. writeContract()             — broadcasts the transaction
 *  3. waitForTransactionReceipt() — polls for FINALIZED status
 *
 * @returns {{ txHash: string, receipt: object }}
 */
export async function submitDisputeToChain(disputeId, partyA, partyB, evidence) {
    const wc = _writeClient;
    if (!wc) throw new Error("Write client not initialized. Connect wallet first.");

    // Ensure MetaMask is on the studionet chain before broadcasting
    await wc.connect("studionet");

    const txHash = await wc.writeContract({
        address: VERDICT_CONTRACT_ADDRESS,
        functionName: "submit_dispute",
        args: [disputeId, partyA, partyB, evidence],
        value: BigInt(0),
    });

    // Poll until GenLayer Optimistic Democracy reaches FINALIZED consensus
    const receipt = await readClient.waitForTransactionReceipt({
        hash: txHash,
        status: TransactionStatus.FINALIZED,
    });

    return { txHash, receipt };
}

/**
 * Read the finalized verdict string for a given dispute ID.
 * Calls: get_verdict(dispute_id) → str  (reads from disputes TreeMap)
 */
export async function getVerdictFromChain(disputeId) {
    const verdict = await readClient.readContract({
        address: VERDICT_CONTRACT_ADDRESS,
        functionName: "get_verdict",
        args: [disputeId],
        stateStatus: "accepted",
    });
    return verdict;
}

/**
 * Read the total number of disputes the contract has processed.
 * Calls: get_total_cases() → int
 */
export async function getTotalCasesFromChain() {
    const total = await readClient.readContract({
        address: VERDICT_CONTRACT_ADDRESS,
        functionName: "get_total_cases",
        args: [],
        stateStatus: "accepted",
    });
    return Number(total);
}