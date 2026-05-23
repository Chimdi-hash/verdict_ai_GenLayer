# { "Depends": "py-genlayer:1jb45aa8ynh2a9c9xn3b7qqh8sm5q93hwfp7jqmwsfhh8jpz09h6" }
from genlayer import *
import typing

class VerdictAI(gl.Contract):
    # State tracking variables using GenLayer native storage wrappers
    disputes: TreeMap[str, str]
    dispute_count: int

    def __init__(self):
        # Initializing our contract state
        self.disputes = TreeMap()
        self.dispute_count = 0

    @gl.public.write
    def submit_dispute(self, dispute_id: str, party_a: str, party_b: str, evidence: str):
        """
        Accepts claim parameters and runs them through the GenLayer LLM validator
        consensus loop using the Non-Comparative Equivalence Principle.
        """

        # Non-deterministic block: This is the isolated routine where LLM execution lives
        def execute_arbitration() -> str:
            prompt = (
                f"You are an elite decentralized arbiter. Evaluate this dispute objectively.\n"
                f"Party A: {party_a}\n"
                f"Party B: {party_b}\n"
                f"Evidence provided: {evidence}\n\n"
                f"Analyze the scenario, determine who is fundamentally in the right based on the facts, "
                f"and provide a short, clear single-paragraph verdict indicating the winner."
            )
            # The leader node triggers the LLM generation here
            return gl.nondet.exec_prompt(prompt)

        # The Equivalence Principle handles consensus validation across non-deterministic outputs.
        verdict_result = gl.eq_principle.prompt_non_comparative(
            execute_arbitration,
            "Analyze a peer-to-peer or commercial dispute and output a clear ruling.",
            "The output must explicitly evaluate the evidence text, name either Party A or Party B, and dictate a winner."
        )

        # Write the finalized consensus verdict directly to the blockchain state
        self.disputes[dispute_id] = verdict_result
        self.dispute_count += 1

    @gl.public.view
    def get_verdict(self, dispute_id: str) -> str:
        """
        A read-only method to fetch the official consensus verdict for any given case ID.
        """
        return self.disputes.get(dispute_id, "Dispute case file not found.")

    @gl.public.view
    def get_total_cases(self) -> int:
        """
        Returns the overall number of disputes processed.
        """
        return self.dispute_count
