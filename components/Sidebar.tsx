import { useAppStore, useWalletStore } from '../lib/store';
import { MapPin, Coins, Clock, PlusCircle } from 'lucide-react';

export default function Sidebar() {
  const { tasks } = useAppStore();
  const { isConnected } = useWalletStore();

  return (
    <div className="h-full flex flex-col bg-white border-r border-gray-200 overflow-hidden">
      <div className="p-6 border-bottom border-gray-100">
        <h2 className="text-2xl font-bold text-green-800 flex items-center gap-2">
          🌲 HyperLocal
        </h2>
        <p className="text-sm text-gray-500 mt-1">自然とつながるタスクプラットフォーム</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-gray-700">近くのタスク</h3>
          <button className="text-green-600 hover:text-green-700 text-sm font-medium flex items-center gap-1">
            <PlusCircle size={16} />
            新規作成
          </button>
        </div>

        {tasks.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
            <p className="text-gray-400 text-sm">現在募集中のタスクはありません</p>
          </div>
        ) : (
          tasks.map((task) => (
            <div key={task.id} className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow cursor-pointer group">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-bold text-gray-800 group-hover:text-green-700 transition-colors">
                  {task.title}
                </h4>
                <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded-full">
                  {task.reward} JPYC
                </span>
              </div>
              <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                {task.description}
              </p>
              <div className="flex items-center gap-4 text-xs text-gray-400">
                <div className="flex items-center gap-1">
                  <MapPin size={12} />
                  <span>近く</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={12} />
                  <span>{new Date(task.timestamp).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {!isConnected && (
        <div className="p-4 bg-yellow-50 border-t border-yellow-100">
          <p className="text-xs text-yellow-800 text-center">
            タスクに参加するにはウォレットを接続してください
          </p>
        </div>
      )}
    </div>
  );
}
