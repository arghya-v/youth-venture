import type { PitchDoc, VoteDoc, ScoreDoc } from '@/types';

interface Props {
  pitches: PitchDoc[];
  votes: VoteDoc[];
  scores: ScoreDoc[];
  eventName: string;
}

export default function DataExport({ pitches, votes, scores, eventName }: Props) {
  const downloadCSV = (data: Record<string, string | number | boolean>[], filename: string) => {
    if (data.length === 0) return;
    
    const headers = Object.keys(data[0]);
    const csvContent = [
      headers.join(','),
      ...data.map(row => headers.map(header => {
        const value = row[header];
        // Escape commas and quotes in CSV
        if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value;
      }).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportPitches = () => {
    const data = pitches.map(p => ({
      productName: p.productName,
      teamName: p.teamName,
      email: p.email,
      description: p.description,
      videoUrl: p.videoUrl,
      isTop10: p.isTop10 || false,
      finalRank: p.finalRank || '',
      winner: p.winner || false,
    }));
    downloadCSV(data, `${eventName}_pitches.csv`);
  };

  const exportVotes = () => {
    const data = votes.map(v => ({
      userID: v.userID,
      pitchID: v.pitchID,
      eventID: v.eventID,
    }));
    downloadCSV(data, `${eventName}_votes.csv`);
  };

  const exportScores = () => {
    const data = scores.map(s => ({
      judgeID: s.judgeID,
      pitchID: s.pitchID,
      description: s.description,
      market: s.market,
      creativity: s.creativity,
      clarity: s.clarity,
      overall: s.overall,
      total: s.total || 0,
    }));
    downloadCSV(data, `${eventName}_scores.csv`);
  };

  const exportSummary = () => {
    // Create vote counts
    const voteCounts = votes.reduce((acc, vote) => {
      acc[vote.pitchID] = (acc[vote.pitchID] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Create score averages
    const scoresByPitch = scores.reduce((acc, score) => {
      if (!acc[score.pitchID]) acc[score.pitchID] = [];
      acc[score.pitchID].push(score.total || 0);
      return acc;
    }, {} as Record<string, number[]>);

    const data = pitches.map(p => ({
      productName: p.productName,
      teamName: p.teamName,
      email: p.email,
      voteCount: voteCounts[p.id] || 0,
      avgScore: scoresByPitch[p.id]?.length 
        ? (scoresByPitch[p.id].reduce((a, b) => a + b, 0) / scoresByPitch[p.id].length).toFixed(2)
        : 0,
      isTop10: p.isTop10 || false,
      finalRank: p.finalRank || '',
      winner: p.winner || false,
    }));
    downloadCSV(data, `${eventName}_summary.csv`);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Data Export</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <button
          onClick={exportPitches}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Export Pitches
        </button>
        <button
          onClick={exportVotes}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Export Votes
        </button>
        <button
          onClick={exportScores}
          className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
        >
          Export Scores
        </button>
        <button
          onClick={exportSummary}
          className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700"
        >
          Export Summary
        </button>
      </div>
    </div>
  );
}
