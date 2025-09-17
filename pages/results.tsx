import { useEffect, useMemo, useState } from 'react';
import { getCurrentEventId } from '@/lib/events';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { PitchDoc } from '@/types';
import Navbar from '@/components/navbar';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export default function ResultsPage() {
  const [eventID, setEventID] = useState<string | null>(null);
  const [pitches, setPitches] = useState<PitchDoc[]>([]);

  useEffect(() => {
    (async () => {
      const id = await getCurrentEventId();
      setEventID(id);
      if (!id) return;
      const qAll = query(collection(db, 'pitches'), where('eventID', '==', id));
      const snap = await getDocs(qAll);
      setPitches(snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<PitchDoc, 'id'>) })));
    })();
  }, []);

  const ranked = useMemo(() => {
    const withRank = pitches.filter((p) => p.finalRank && p.finalRank >= 1 && p.finalRank <= 3);
    withRank.sort((a, b) => (a.finalRank! - b.finalRank!));
    return withRank;
  }, [pitches]);

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
          <h1 className="text-2xl font-semibold">Final Results</h1>
          <div className="space-y-2">
            {ranked.map((p) => (
              <div key={p.id} className="border rounded p-3 bg-white">
                <div className="text-lg font-semibold">#{p.finalRank}: {p.productName}</div>
                <div className="text-sm text-gray-600">{p.teamName}</div>
              </div>
            ))}
            {ranked.length === 0 && <div>No final rankings published yet.</div>}
          </div>
        </div>
      </main>
    </div>
  );
}
