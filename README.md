

 ⚖️ VerdictAI: Decentralized AI Dispute Resolution


Live Demo:https://verdict-ai-gen-layer.vercel.app/


Welcome to **VerdictAI**, a premium decentralized protocol built on [GenLayer](https://genlayer.com). VerdictAI leverages the power of Large Language Models (LLMs) and blockchain consensus to provide instantaneous, transparent, and unbiased arbitration for peer-to-peer disputes.

---

 🌟 Introduction to VerdictAI



VerdictAI is more than just a smart contract; it’s an Intelligent Protocol. Traditional arbitration is slow, expensive, and prone to human error. VerdictAI replaces the "judge" with a distributed network of AI-powered validator nodes. 

When a dispute is submitted, the GenLayer network doesn't just store data—it thinks. Multiple independent LLMs evaluate the evidence, debate the outcome, and commit a finalized, consensus-backed ruling directly to the ledger.




 🧠 Core GenLayer Concepts Simplified

To understand how VerdictAI works, you need to understand the two pillars of GenLayer:

 🗳️ Optimistic Democracy Consensus
Traditional blockchains are limited by "Total Determinism"—every node must run the exact same math. GenLayer introduces Optimistic Democracy. 

1. A **Leader Node** is elected to run the non-deterministic LLM task.
2. The leader proposes the result.
3. Other Validator Nodes verify the result. 
This allows us to run complex AI reasoning on-chain without slowing down the network.

 🎭 The Equivalence Principle
AI is non-deterministic. If you ask two different AI models to "summarize this dispute," they will use different words. On a normal blockchain, this would cause a fork. 
GenLayer solve this with the Equivalence Principle. Nodes agree not on the *exact characters* of the output, but on the semantic meaning. If Node A says "Party A wins" and Node B says "Winner: Party A", the Equivalence Principle recognizes these as legally identical, allowing consensus to be reached.




🐍 The Intelligent Python Contract

Our contract is written in Intelligent Python, a subset of Python designed for the GenLayer Virtual Machine.




```python
# { "Depends": "py-genlayer:1jb45aa8ynh2a9c9xn3b7qqh8sm5q93hwfp7jqmwsfhh8jpz09h6" }
from genlayer import *

class VerdictAI(gl.Contract):
    # State tracking using GenLayer native storage wrappers
    disputes: TreeMap[str, str]
    dispute_count: int

    def __init__(self):
        self.disputes = TreeMap()
        self.dispute_count = 0

    @gl.public.write
    def submit_dispute(self, dispute_id: str, party_a: str, party_b: str, evidence: str):
        # The non-deterministic block where the AI reasoning actually happens
        def execute_arbitration() -> str:
            prompt = f"Evaluate this dispute: Party A: {party_a}, Party B: {party_b}. Evidence: {evidence}."
            return gl.nondet.exec_prompt(prompt)

        # Reaching consensus via the Equivalence Principle
        verdict_result = gl.eq_principle.prompt_non_comparative(
            execute_arbitration,
            "Analyze a dispute and output a clear ruling.",
            "The output must name a winner: Party A or Party B."
        )

        self.disputes[dispute_id] = verdict_result
        self.dispute_count += 1
```




 Why `TreeMap` and not `dict`?
In standard Python, a `dict` does not guarantee a deterministic memory layout or iteration order. In a decentralized network, **every node must have an identical byte-for-byte representation of state**. We use `gl.TreeMap`, a native GenLayer wrapper that ensures our storage is perfectly deterministic, gas-efficient, and visible to the entire network.

---


 🎨 The Frontend Layout

VerdictAI features a premium glassmorphic UI that communicates with the blockchain via `genlayer-js`.

*   Connecting: The UI uses the GenLayer provider to connect to a user's wallet.
*   Dispatching Actions: When you click "Submit," the frontend uses `client.writeContract()` to call `submit_dispute`.
*   Consensus Visibility: Because GenLayer transactions involve multiple stages (Leader proposal -> Validator agreement), our UI tracks these steps in real-time, showing the user exactly where their dispute is in the "Optimistic Democracy" pipeline.

---



 🚀 How to Run & Deploy



 1. Push to GitHub
Initialize your repository and push to your favorite provider:
```bash
git init
git add .
git commit -m "Initial VerdictAI commitment"
git remote add origin <your-repo-url>
git push -u origin main
```



 2. Zero-Config Hosting with Vercel
Our frontend is built as a static, high-performance web app. You can deploy it in seconds:
1. Go to [Vercel](https://vercel.com).
2. Import your GitHub repository.
3. Vercel will automatically detect the `index.html` in the `frontend/` directory.
4. Click Deploy.

Local Testing:
Simply host the `frontend/` directory using any local server:
```bash
npx serve frontend
```

---

Built for the future of Decentralized Justice.
 

