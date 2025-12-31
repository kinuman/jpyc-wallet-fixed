import { useTransactionStore } from '../lib/store';

export default function TransactionHistory() {
  const { transactions } = useTransactionStore();

  if (transactions.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-4">Transaction History</h2>
        <p className="text-gray-500">No transactions yet</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-4">Transaction History</h2>
      
      <div className="space-y-3">
        {transactions.map((tx) => (
          <div key={tx.id} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className={`px-2 py-1 rounded text-xs font-semibold ${
                tx.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                tx.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {tx.status.toUpperCase()}
              </span>
              <span className="text-xs text-gray-500">
                {new Date(tx.timestamp).toLocaleString()}
              </span>
            </div>
            
            <div className="space-y-1 text-sm">
              <div>
                <span className="text-gray-600">From:</span>
                <span className="ml-2 font-mono">{tx.from.slice(0, 10)}...{tx.from.slice(-8)}</span>
              </div>
              <div>
                <span className="text-gray-600">To:</span>
                <span className="ml-2 font-mono">{tx.to.slice(0, 10)}...{tx.to.slice(-8)}</span>
              </div>
              <div>
                <span className="text-gray-600">Amount:</span>
                <span className="ml-2 font-semibold">{tx.amount} JPYC</span>
              </div>
              {tx.hash && (
                <div>
                  <span className="text-gray-600">Hash:</span>
                  <a 
                    href={`https://polygonscan.com/tx/${tx.hash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-2 font-mono text-blue-600 hover:underline"
                  >
                    {tx.hash.slice(0, 10)}...{tx.hash.slice(-8)}
                  </a>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
