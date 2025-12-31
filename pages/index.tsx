import Head from 'next/head';
import { useEffect } from 'react';
import WalletConnect from '../components/WalletConnect';
import MapPanel from '../components/MapPanel';
import Sidebar from '../components/Sidebar';
import { useAppStore } from '../lib/store';

export default function Home() {
  const { setTasks } = useAppStore();

  useEffect(() => {
    // サンプルデータの生成
    const sampleTasks = [
      {
        id: '1',
        title: '公園の清掃ボランティア',
        description: '代々木公園のゴミ拾いをお手伝いいただける方を募集しています。',
        reward: '500',
        location: { lat: 35.6715, lng: 139.6966 },
        status: 'open' as const,
        author: '0x123...',
        timestamp: Date.now(),
      },
      {
        id: '2',
        title: '地域猫の餌やり',
        description: '旅行中のため、3日間地域猫の餌やりをお願いしたいです。',
        reward: '1000',
        location: { lat: 35.6650, lng: 139.7100 },
        status: 'open' as const,
        author: '0x456...',
        timestamp: Date.now() - 86400000,
      },
      {
        id: '3',
        title: 'お花の植え替え',
        description: '駅前の花壇の植え替え作業を手伝ってください。',
        reward: '300',
        location: { lat: 35.6585, lng: 139.7013 },
        status: 'open' as const,
        author: '0x789...',
        timestamp: Date.now() - 172800000,
      }
    ];
    setTasks(sampleTasks);
  }, [setTasks]);

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-gray-50">
      <Head>
        <title>HyperLocal - 自然とつながるタスクプラットフォーム</title>
        <meta name="description" content="Manage your JPYC tokens and local tasks" />
      </Head>

      {/* Header Area */}
      <header className="bg-green-700 text-white p-4 shadow-md z-20 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🌲</span>
          <h1 className="text-xl font-bold tracking-tight">HyperLocal</h1>
        </div>
        <div className="flex items-center gap-4">
          <WalletConnect />
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <aside className="w-96 hidden lg:block z-10">
          <Sidebar />
        </aside>

        {/* Map Area */}
        <main className="flex-1 relative">
          <MapPanel />
          
          {/* Mobile Sidebar Overlay */}
          <div className="lg:hidden absolute bottom-4 left-4 right-4 z-10">
            <div className="bg-white/90 backdrop-blur shadow-lg rounded-2xl p-4 border border-green-100">
              <h3 className="font-bold text-green-800">近くに3件のタスクがあります</h3>
              <p className="text-xs text-gray-500">PC版では詳細なリストが表示されます</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
