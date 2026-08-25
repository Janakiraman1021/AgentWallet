import { useEffect, useState } from "react";
import { ArrowLeft, ExternalLink, ReceiptText, RefreshCw, Wallet } from "lucide-react";
import { Link } from "react-router-dom";
import { useWallet } from "@/hooks/use-wallet";
import { receiptsForBuyer, type ReceiptHistory } from "@/lib/registry";
import { usePageTitle } from "@/hooks/use-page-title";
import { fadeUp } from "@/lib/motion";
import { motion } from "framer-motion";

function TransactionsTable({ history }: { history: ReceiptHistory }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-sand/60 bg-paper">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[680px] text-left text-sm">
          <thead className="border-b border-sand/60 bg-cream/50 text-xs uppercase tracking-[2px] text-ink/50">
            <tr>
              <th className="px-5 py-4 font-semibold">Agent</th>
              <th className="px-5 py-4 font-semibold">Confirmed</th>
              <th className="px-5 py-4 font-semibold">Total</th>
              <th className="px-5 py-4 font-semibold">Developer</th>
              <th className="px-5 py-4 font-semibold">Verify</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-sand/40">
            {history.receipts.map((receipt) => (
              <tr key={receipt.receiptId} className="text-ink/75">
                <td className="px-5 py-5">
                  <div className="font-medium text-ink">{receipt.toolLabel}</div>
                  <div className="mt-1 font-mono text-xs text-ink/45">#{receipt.receiptId}</div>
                </td>
                <td className="px-5 py-5">
                  <div>{new Date(receipt.paidAt).toLocaleDateString()}</div>
                  <div className="mt-1 text-xs text-ink/45">Round {receipt.confirmedRound}</div>
                </td>
                <td className="px-5 py-5 font-mono text-ink">{receipt.total.algo} ALGO</td>
                <td className="px-5 py-5 font-mono text-xs text-ink/60">{receipt.developer.algo} ALGO</td>
                <td className="px-5 py-5">
                  <a
                    href={receipt.developer.explorer}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-ink underline decoration-sand underline-offset-4 hover:text-ink/60"
                  >
                    Explorer <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {history.truncated && (
        <p className="border-t border-sand/40 px-5 py-3 text-xs text-ink/50">
          Showing the latest {history.count} transactions.
        </p>
      )}
    </div>
  );
}

export function TransactionsPage() {
  usePageTitle("Transactions");
  const { state } = useWallet();
  const [history, setHistory] = useState<ReceiptHistory | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function loadTransactions() {
    if (!state.address) return;
    setLoading(true);
    setError(null);
    const result = await receiptsForBuyer(state.address);
    if (result.ok) setHistory(result.data);
    else setError(result.error.message);
    setLoading(false);
  }

  useEffect(() => {
    void loadTransactions();
  }, [state.address]);

  return (
    <section className="min-h-screen bg-cream px-6 pb-24 pt-32 md:pt-40">
      <div className="mx-auto max-w-6xl">
        <motion.div {...fadeUp(0)}>
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-ink/60 hover:text-ink">
            <ArrowLeft className="h-4 w-4" /> Back to home
          </Link>
        </motion.div>

        <motion.div {...fadeUp(0.08)} className="mt-10 flex items-center gap-3 text-xs uppercase tracking-[3px] text-ink/50">
          <ReceiptText className="h-4 w-4" /> Transaction dashboard
        </motion.div>
        <motion.h1 {...fadeUp(0.14)} className="mt-5 max-w-3xl text-5xl font-normal leading-[1.05] tracking-tight text-ink md:text-7xl">
          Every payment, <em className="accent-serif not-italic">verifiable</em>
        </motion.h1>
        <motion.p {...fadeUp(0.2)} className="mt-6 max-w-2xl text-base leading-relaxed text-ink/65 md:text-lg">
          A wallet-scoped view of settled agent calls. Amounts and confirmation details come from the payments service; verification opens the public Algorand explorer.
        </motion.p>

        {!state.connected ? (
          <div className="mt-14 max-w-xl border-l-2 border-ink bg-paper px-6 py-5 text-ink">
            <div className="flex items-center gap-2 font-medium"><Wallet className="h-4 w-4" /> Connect your wallet</div>
            <p className="mt-2 text-sm text-ink/60">Connect the wallet used for payment to load its transaction history.</p>
          </div>
        ) : (
          <>
            <div className="mt-14 grid gap-4 sm:grid-cols-3">
              <div className="border border-sand/60 bg-paper p-5"><div className="text-xs uppercase tracking-[2px] text-ink/45">Paid</div><div className="mt-2 font-mono text-xl text-ink">{history?.totals.spentAlgo ?? "—"} ALGO</div></div>
              <div className="border border-sand/60 bg-paper p-5"><div className="text-xs uppercase tracking-[2px] text-ink/45">Transactions</div><div className="mt-2 font-mono text-xl text-ink">{history?.count ?? "—"}</div></div>
              <div className="border border-sand/60 bg-paper p-5"><div className="text-xs uppercase tracking-[2px] text-ink/45">Network</div><div className="mt-2 text-xl text-ink">{state.network === "testnet" ? "TestNet" : "MainNet"}</div></div>
            </div>

            <div className="mt-12 flex items-center justify-between gap-4">
              <div><h2 className="text-2xl text-ink">Payment history</h2><p className="mt-1 font-mono text-xs text-ink/45">{state.address}</p></div>
              <button type="button" onClick={() => void loadTransactions()} disabled={loading} className="inline-flex items-center gap-2 border border-ink/20 px-3 py-2 text-sm text-ink hover:border-ink disabled:opacity-50" aria-label="Refresh transactions">
                <RefreshCw className={loading ? "h-4 w-4 animate-spin" : "h-4 w-4"} /> Refresh
              </button>
            </div>

            <div className="mt-5">
              {error ? <p className="border-l-2 border-[#a43d24] bg-paper px-5 py-4 text-sm text-ink">{error}</p> : loading && !history ? <p className="py-10 text-sm text-ink/50">Loading transactions…</p> : history?.receipts.length ? <TransactionsTable history={history} /> : <p className="py-10 text-sm text-ink/50">No settled transactions for this wallet yet.</p>}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
