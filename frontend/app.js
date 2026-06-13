/**
 * app.js — ES Module bridge
 *
 * Loaded as <script type="module">. Imports the genlayer-js SDK
 * and exposes the contract interaction functions on window.GenLayerBridge
 * so the non-module inline <script> in index.html can call them.
 */
import {
    initWriteClient,
    submitDisputeToChain,
    getVerdictFromChain,
    getTotalCasesFromChain,
    VERDICT_CONTRACT_ADDRESS,
} from "./genlayerclient.js";

window.GenLayerBridge = {
    // Called by the wallet connect handler in index.html once
    // the user's MetaMask account address is known.
    initWriteClient,

    // Core contract interactions
    submitDisputeToChain,
    getVerdictFromChain,
    getTotalCasesFromChain,

    CONTRACT_ADDRESS: VERDICT_CONTRACT_ADDRESS,
};

// Signal to the inline script that the SDK bridge is ready
window.dispatchEvent(new CustomEvent("genlayer:ready"));
console.log(
    "[VerdictAI] GenLayer SDK bridge loaded. Contract:",
    VERDICT_CONTRACT_ADDRESS
);