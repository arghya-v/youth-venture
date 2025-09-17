import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { db } from '@/lib/firebase';
import { getCurrentEventId, getEvent } from '@/lib/events';
import { collection, getDocs, query, where } from 'firebase/firestore';
import type { PitchDoc } from '@/types';
import PitchCard from '@/components/PitchCard';
import VoteButton from '@/components/VoteButton';
import Navbar from '@/components/navbar';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export default function PitchesPage() {
  const { user } = useAuth();
  const [eventID, setEventID] = useState<string | null>(null);
  const [votingOpen, setVotingOpen] = useState(false);
  const [pitches, setPitches] = useState<PitchDoc[]>([]);

  useEffect(() => {
    (async () => {
      const id = await getCurrentEventId();
      setEventID(id);
      if (!id) return;
      const evt = await getEvent(id);
      setVotingOpen(!!evt?.votingOpen);
      const q = query(collection(db, 'pitches'), where('eventID', '==', id));
      const snap = await getDocs(q);
      setPitches(snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<PitchDoc, 'id'>) })));
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
        <div className="max-w-4xl mx-auto space-y-4">
          <h1 className="text-2xl font-semibold">Pitches</h1>
          <div className="grid md:grid-cols-2 gap-4">
            {pitches.map((p) => (
              <div key={p.id} className="space-y-2">
                <PitchCard pitch={p} />
                <div>
                  <VoteButton eventID={eventID} userID={user?.uid || 'anon'} pitchID={p.id} disabled={!user || !votingOpen} />
                </div>
              </div>
            ))}
          </div>
          {!user && <div className="text-sm text-gray-600">Sign in to vote.</div>}
          {!votingOpen && <div className="text-sm text-yellow-700">Voting is closed.</div>}
        </div>
      </main>
    </div>
  );
}
