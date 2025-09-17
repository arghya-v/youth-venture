import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { db } from '@/lib/firebase';
import { getCurrentEventId } from '@/lib/events';
import { collection, getDocs, query, where } from 'firebase/firestore';
import type { PitchDoc } from '@/types';
import JudgeScoreForm from '@/components/JudgeScoreForm';
import Navbar from '@/components/navbar';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export default function JudgePage() {
  const { user, profile } = useAuth();
  const [eventID, setEventID] = useState<string | null>(null);
  const [pitches, setPitches] = useState<PitchDoc[]>([]);

  useEffect(() => {
    (async () => {
      const id = await getCurrentEventId();
      setEventID(id);
      if (!id) return;
      const qTop = query(collection(db, 'pitches'), where('eventID', '==', id), where('isTop10', '==', true));
      const snap = await getDocs(qTop);
      setPitches(snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<PitchDoc, 'id'>) })));
    })();
  }, []);

  if (!user) return (
    <div className={`${poppins.className} relative min-h-screen`}>
      <div className="absolute inset-0 -z-10" style={{
        backgroundImage: "radial-gradient(#d9d9d9 1.55px, transparent 1.55px), radial-gradient(#d9d9d9 1.55px, #f2f2f2 1.55px)",
        backgroundSize: "62px 62px",
        backgroundPosition: "0 0, 31px 31px",
      }} />
      <Navbar />
      <div className="p-6 pt-32">Please sign in.</div>
    </div>
  );
  
  if (!profile?.roles?.includes('judge')) return (
    <div className={`${poppins.className} relative min-h-screen`}>
      <div className="absolute inset-0 -z-10" style={{
        backgroundImage: "radial-gradient(#d9d9d9 1.55px, transparent 1.55px), radial-gradient(#d9d9d9 1.55px, #f2f2f2 1.55px)",
        backgroundSize: "62px 62px",
        backgroundPosition: "0 0, 31px 31px",
      }} />
      <Navbar />
      <div className="p-6 pt-32">Access restricted to judges.</div>
    </div>
  );
  
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
        <div className="max-w-3xl mx-auto space-y-6">
          <h1 className="text-2xl font-semibold">Judge Scoring</h1>
          {pitches.length === 0 && <div>No pitches marked Top 10 yet.</div>}
          {pitches.map((p) => (
            <div key={p.id} className="border rounded p-4 bg-white">
              <div className="mb-3">
                <div className="font-medium">{p.productName}</div>
                <div className="text-sm text-gray-600">{p.teamName}</div>
              </div>
              <JudgeScoreForm eventID={eventID} judgeID={user.uid} pitchID={p.id} />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
