import { Trophy } from 'lucide-react';

export interface LeaderboardUser {
  id: string;
  name: string;
  xp: number;
  rankPosition: number;
  rankName: string;
  isCurrentUser?: boolean;
}

interface LeaderboardCardProps {
  leaderboard?: LeaderboardUser[];
}

export default function LeaderboardCard({ leaderboard = [] }: LeaderboardCardProps) {
  return (
    <div className="col-span-12 lg:col-span-5 flex flex-col p-6 chunky-card bg-white w-full h-full min-w-0">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-black uppercase tracking-tight flex items-center gap-2">
          <Trophy className="text-yellow-500" size={24} fill="currentColor" />
          User Leaderboard (Top 10)
        </h3>
      </div>

      <div className="overflow-x-auto w-full">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b-4 border-slate-900">
              <th className="p-3 font-black text-slate-700 uppercase">Rank</th>
              <th className="p-3 font-black text-slate-700 uppercase">User</th>
              <th className="p-3 font-black text-slate-700 uppercase">Total XP</th>
              <th className="p-3 font-black text-slate-700 uppercase">Title</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard && leaderboard.length > 0 ? (
              leaderboard.map((user) => (
                <tr 
                  key={user.id} 
                  className={`border-b-2 border-slate-200 transition-colors ${user.isCurrentUser ? 'bg-primary/20 border-primary' : 'hover:bg-slate-50'}`}
                >
                  <td className="p-3 font-bold text-lg whitespace-nowrap">
                    {user.rankPosition === 1 ? '🥇 1' : user.rankPosition === 2 ? '🥈 2' : user.rankPosition === 3 ? '🥉 3' : user.rankPosition}
                  </td>
                  <td className={`p-3 font-bold whitespace-nowrap ${user.isCurrentUser ? 'text-primary' : 'text-slate-800'}`}>
                    {user.name}
                  </td>
                  <td className="p-3 font-black text-yellow-500 whitespace-nowrap">
                    {user.xp} XP
                  </td>
                  <td className="p-3 whitespace-nowrap">
                    <span className={`inline-block px-3 py-1 text-xs font-black uppercase border-2 border-slate-900 rounded-full shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]
                      ${user.rankPosition === 1 ? 'bg-yellow-400 text-slate-900' : 
                        user.rankPosition === 2 ? 'bg-slate-300 text-slate-900' : 
                        user.rankPosition === 3 ? 'bg-orange-400 text-slate-900' : 
                        'bg-slate-100 text-slate-900'}`}>
                      {user.rankName}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="p-4 text-center font-bold text-slate-500">
                  Chưa có dữ liệu bảng xếp hạng
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <button className="w-full mt-6 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 py-3 text-sm font-black border-2 border-slate-200 transition-colors uppercase">
        Xem toàn bộ bảng xếp hạng
      </button>
    </div>
  );
}
