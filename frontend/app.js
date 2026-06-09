import { client, VERDICT_CONTRACT_ADDRESS } from "./genlayerclient.js";

// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("dispute-form");
    const statusDiv = document.getElementById("status-message");

    if (form) {
        form.addEventListener("submit", async (event) => {
            event.preventDefault(); // Stop page from reloading

            // Get values from the form inputs
            const disputeId = document.getElementById("dispute-id").value;
            const partyA = document.getElementById("party-a").value;
            const partyB = document.getElementById("party-b").value;
            const evidence = document.getElementById("evidence").value;

            statusDiv.className = "status info";
            statusDiv.innerText = "Submitting dispute to GenLayer Intelligent Consensus...";

            try {
                // Execute the contract call
                const txHash = await client.writeContract({
                    address: VERDICT_CONTRACT_ADDRESS,
                    functionName: "submit_dispute",
                    args: [disputeId, partyA, partyB, evidence],
                    value: BigInt(0),
                });

                statusDiv.className = "status success";
                statusDiv.innerText = `Dispute submitted successfully! Tx Hash: ${txHash}`;
                form.reset(); // Clear form fields
            } catch (error) {
                console.error("Transaction failed:", error);
                statusDiv.className = "status error";
                statusDiv.innerText = `Submission failed: ${error.message || error}`;
            }
        });
    }
});