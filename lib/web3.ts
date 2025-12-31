import { ethers } from 'ethers';

const JPYC_ABI = [
  'function balanceOf(address owner) view returns (uint256)',
  'function transfer(address to, uint256 amount) returns (bool)',
  'function decimals() view returns (uint8)',
  'function symbol() view returns (string)',
];

export async function connectWallet() {
  if (typeof window === 'undefined' || !window.ethereum) {
    throw new Error('MetaMask is not installed');
  }

  try {
    const provider = new ethers.BrowserProvider(window.ethereum);
    await provider.send('eth_requestAccounts', []);
    const signer = await provider.getSigner();
    const address = await signer.getAddress();
    
    return { provider, signer, address };
  } catch (error: any) {
    throw new Error(`Failed to connect wallet: ${error.message}`);
  }
}

export async function getJPYCBalance(address: string) {
  if (typeof window === 'undefined' || !window.ethereum) {
    return '0';
  }

  try {
    const contractAddress = process.env.NEXT_PUBLIC_JPYC_CONTRACT;
    if (!contractAddress) {
      throw new Error('JPYC contract address not configured');
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const contract = new ethers.Contract(contractAddress, JPYC_ABI, provider);
    
    const balance = await contract.balanceOf(address);
    const decimals = await contract.decimals();
    
    return ethers.formatUnits(balance, decimals);
  } catch (error: any) {
    console.error('Failed to get JPYC balance:', error);
    return '0';
  }
}

export async function transferJPYC(toAddress: string, amount: string) {
  if (typeof window === 'undefined' || !window.ethereum) {
    throw new Error('MetaMask is not installed');
  }

  try {
    const contractAddress = process.env.NEXT_PUBLIC_JPYC_CONTRACT;
    if (!contractAddress) {
      throw new Error('JPYC contract address not configured');
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress, JPYC_ABI, signer);
    
    const decimals = await contract.decimals();
    const amountInWei = ethers.parseUnits(amount, decimals);
    
    const tx = await contract.transfer(toAddress, amountInWei);
    await tx.wait();
    
    return tx.hash;
  } catch (error: any) {
    throw new Error(`Transfer failed: ${error.message}`);
  }
}

declare global {
  interface Window {
    ethereum?: any;
  }
}
