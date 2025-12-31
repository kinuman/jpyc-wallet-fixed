# HyperLocal Integrated Platform

This project integrates the **HyperLocal Task Platform** with the **JPYC Wallet Manager**, providing a seamless experience for managing local tasks and JPYC token rewards.

## Features

- **Interactive Map**: View local tasks and helpers on a MapLibre GL JS map.
- **Task Management**: Browse and participate in local community tasks.
- **JPYC Wallet**: Integrated MetaMask connection to manage JPYC balances on Polygon.
- **Modern Stack**: Built with Next.js 14, React 18, Tailwind CSS, and ethers.js v6.

## Getting Started

1. Extract the ZIP file.
2. Install dependencies: `npm install`
3. Set up environment variables in `.env.local`:
   - `NEXT_PUBLIC_JPYC_CONTRACT=0x6AE7Dfc73E0dDE900d3o9A9FfC03c8d8617d5274`
   - `NEXT_PUBLIC_POLYGON_RPC=https://polygon-rpc.com`
4. Run development server: `npm run dev`

## Deployment

This project is optimized for Vercel. Simply push to GitHub and import the repository into Vercel, ensuring the environment variables are set in the Vercel dashboard.
