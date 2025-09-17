import type { PitchDoc } from '@/types';

export default function LeaderboardTable({ counts, pitches }: { counts: Record<string, number>; pitches: PitchDoc[] }) {
  const enriched = pitches.map((p) => ({ ...p, votes: counts[p.id] || 0 })).sort((a, b) => b.votes - a.votes);
  return (
    <table className="w-full text-left border">
      <thead>
        <tr className="bg-gray-50">
          <th className="p-2 border">Rank</th>
          <th className="p-2 border">Pitch</th>
          <th className="p-2 border">Team</th>
          <th className="p-2 border">Votes</th>
        </tr>
      </thead>
      <tbody>
        {enriched.map((p, idx) => (
          <tr key={p.id} className="border-b">
            <td className="p-2 border">{idx + 1}</td>
            <td className="p-2 border">{p.productName}</td>
            <td className="p-2 border">{p.teamName}</td>
            <td className="p-2 border">{p.votes}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
