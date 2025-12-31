import { useState } from 'react';
import { transferJPYC } from '../lib/web3';
import { useWalletStore, useTransactionStore } from '../lib/store';

export default function TransferForm() {
  const [toAddress, setToAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const { isConnected, address } = useWalletStore();
  const { addTransaction } = useTransactionStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isConnected || !address) {
      setMessage('Please connect your wallet first');
      return;
    }

    if (!toAddress || !amount) {
      setMessage('Please fill in all fields');
      return;
    }

    if (!/^0x[a-fA-F0-9]{40}$/.test(toAddress)) {
      setMessage('Invalid recipient address');
      return;
    }

    try {
      setIsLoading(true);
      setMessage('');

      const txHash = await transferJPYC(toAddress, amount);
      
      addTransaction({
        id: Date.now().toString(),
        hash: txHash || '',
        from: address,
        to: toAddress,
        amount,
        status: 'pending',
        timestamp: Date.now(),
      });

      setMessage(`Transaction sent! Hash: ${txHash}`);
      setToAddress('');
      setAmount('');
    } catch (err: any) {
      setMessage(`Error: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isConnected) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <p className="text-yellow-800">Please connect your wallet to transfer JPYC</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-4">Transfer JPYC</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Recipient Address
          </label>
          <input
            type="text"
            value={toAddress}
            onChange={(e) => setToAddress(e.target.value)}
            placeholder="0x..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Amount (JPYC)
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            step="0.01"
            min="0"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
        >
          {isLoading ? 'Sending...' : 'Send JPYC'}
        </button>
      </form>

      {message && (
        <div className={`mt-4 p-3 rounded-lg ${
          message.startsWith('Error') 
            ? 'bg-red-50 text-red-800 border border-red-200'
            : 'bg-green-50 text-green-800 border border-green-200'
        }`}>
          <p className="text-sm break-all">{message}</p>
        </div>
      )}
    </div>
  );
}
