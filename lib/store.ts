import { create } from 'zustand';

interface WalletState {
  isConnected: boolean;
  address: string | null;
  balance: string;
  setWallet: (address: string, balance: string) => void;
  setBalance: (balance: string) => void;
  disconnect: () => void;
}

export const useWalletStore = create<WalletState>((set) => ({
  isConnected: false,
  address: null,
  balance: '0',
  setWallet: (address, balance) => set({ isConnected: true, address, balance }),
  setBalance: (balance) => set({ balance }),
  disconnect: () => set({ isConnected: false, address: null, balance: '0' }),
}));

export interface Task {
  id: string;
  title: string;
  description: string;
  reward: string;
  location: { lat: number; lng: number };
  status: 'open' | 'in-progress' | 'completed';
  author: string;
  timestamp: number;
}

interface AppState {
  tasks: Task[];
  currentLocation: { lat: number; lng: number } | null;
  setTasks: (tasks: Task[]) => void;
  addTask: (task: Task) => void;
  setCurrentLocation: (lat: number, lng: number) => void;
}

export const useAppStore = create<AppState>((set) => ({
  tasks: [],
  currentLocation: null,
  setTasks: (tasks) => set({ tasks }),
  addTask: (task) => set((state) => ({ tasks: [task, ...state.tasks] })),
  setCurrentLocation: (lat, lng) => set({ currentLocation: { lat, lng } }),
}));

interface Transaction {
  id: string;
  hash: string;
  from: string;
  to: string;
  amount: string;
  status: 'pending' | 'confirmed' | 'failed';
  timestamp: number;
}

interface TransactionState {
  transactions: Transaction[];
  addTransaction: (tx: Transaction) => void;
  updateTransactionStatus: (id: string, status: Transaction['status']) => void;
}

export const useTransactionStore = create<TransactionState>((set) => ({
  transactions: [],
  addTransaction: (tx) => set((state) => ({ 
    transactions: [tx, ...state.transactions] 
  })),
  updateTransactionStatus: (id, status) => set((state) => ({
    transactions: state.transactions.map((tx) =>
      tx.id === id ? { ...tx, status } : tx
    ),
  })),
}));
