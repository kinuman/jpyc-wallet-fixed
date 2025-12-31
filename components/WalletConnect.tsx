import { useState, useEffect } from 'react';
import { connectWallet, getJPYCBalance } from '../lib/web3';
import { useWalletStore } from '../lib/store';
import { Wallet, LogOut } from 'lucide-react';

export default function WalletConnect() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { isConnected, address, balance, setWallet, setBalance, disconnect } = useWalletStore();

  useEffect(() => {
    if (isConnected && address) {
      const interval = setInterval(async () => {
        try {
          const newBalance = await getJPYCBalance(address);
          setBalance(newBalance);
        } catch (err) {
          console.error('Failed to update balance:', err);
        }
      }, 10000);

      return () => clearInterval(interval);
    }
  }, [isConnected, address, setBalance]);

  const handleConnect = async () => {
    setIsLoading(true);
    setError('');

    try {
      const { address: walletAddress } = await connectWallet();
      const jpycBalance = await getJPYCBalance(walletAddress);
      setWallet(walletAddress, jpycBalance);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isConnected && address) {
    return (
      <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-1.5">
        <div className="text-right hidden sm:block">
          <p className="text-[10px] uppercase tracking-wider opacity-70 leading-none">Balance</p>
          <p className="text-sm font-bold leading-tight">{balance} JPYC</p>
        </div>
        <div className="h-8 w-px bg-white/20 hidden sm:block" />
        <div className="flex items-center gap-2">
          <div className="bg-green-400 w-2 h-2 rounded-full animate-pulse" />
          <p className="text-xs font-mono">{address.slice(0, 6)}...{address.slice(-4)}</p>
          <button
            onClick={disconnect}
            className="p-1 hover:bg-white/10 rounded-full transition-colors"
            title="Disconnect"
          >
            <LogOut size={14} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={handleConnect}
        disabled={isLoading}
        className="flex items-center gap-2 bg-white text-green-700 px-4 py-2 rounded-full font-bold text-sm hover:bg-green-50 transition-all shadow-sm disabled:opacity-50"
      >
        <Wallet size={16} />
        {isLoading ? '接続中...' : 'ウォレット接続'}
      </button>

      {error && (
        <div className="absolute top-full right-0 mt-2 w-64 p-2 bg-red-500 text-white text-[10px] rounded shadow-lg z-50">
          {error}
        </div>
      )}
    </div>
  );
}
