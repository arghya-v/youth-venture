import { useEffect, useState } from 'react';
import { getCurrentEventId } from '@/lib/events';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { PitchDoc } from '@/types';
import LeaderboardTable from '@/components/LeaderboardTable';
import Navbar from '@/components/navbar';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export default function LeaderboardPage() {
  const [eventID, setEventID] = useState<string | null>(null);
  const [pitches, setPitches] = useState<PitchDoc[]>([]);
  const [counts, setCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    (async () => {
      const id = await getCurrentEventId();
      setEventID(id);
      if (!id) return;
      const pQ = query(collection(db, 'pitches'), where('eventID', '==', id));
      const pSnap = await getDocs(pQ);
      const list: PitchDoc[] = pSnap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<PitchDoc, 'id'>) }));
      setPitches(list);
      const vQ = query(collection(db, 'votes'), where('eventID', '==', id));
      const vSnap = await getDocs(vQ);
      const c: Record<string, number> = {};
      vSnap.forEach((d) => {
        const { pitchID } = d.data() as { pitchID: string };
        c[pitchID] = (c[pitchID] || 0) + 1;
      });
      setCounts(c);
    })();
  }, []);

  if (!eventID) return (
    <div className={`${poppins.className} relative min-h-screen`}>
      <div className="absolute inset-0 -z-10" style={{
        backgroundImage: "radial-gradient(#d9d9d9 1.55px, transparent 1.55px), radial-gradient(#d9d9d9 1.55px, #f2f2f2 1.55px)",
        backgroundSize: "62px 62px",
        backgroundPosition: "0 0, 31px 31px",
      }} />
      <Navbar />
      <div className="p-6 pt-32">No active event.</div>
    </div>
  );

  return (
    <div className={`${poppins.className} relative min-h-screen`}>
      <div className="absolute inset-0 -z-10" style={{
        backgroundImage: "radial-gradient(#d9d9d9 1.55px, transparent 1.55px), radial-gradient(#d9d9d9 1.55px, #f2f2f2 1.55px)",
        backgroundSize: "62px 62px",
        backgroundPosition: "0 0, 31px 31px",
      }} />
      <Navbar />
      <main className="p-6 pt-32">
        <div className="max-w-3xl mx-auto space-y-4">
          <h1 className="text-2xl font-semibold">Leaderboard</h1>
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <LeaderboardTable counts={counts} pitches={pitches} />
          </div>
        </div>
      </main>
    </div>
  );
}
