import { db } from '@/lib/firebase';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { useState } from 'react';
import { toast } from 'react-toastify';

export default function VoteButton({ eventID, userID, pitchID, disabled }: { eventID: string; userID: string; pitchID: string; disabled?: boolean }) {
  const [loading, setLoading] = useState(false);
  const voteId = `${eventID}_${userID}`;

  const castVote = async () => {
    if (disabled) return;
    try {
      setLoading(true);
      const ref = doc(db, 'votes', voteId);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        toast.info('You already voted');
      } else {
        await setDoc(ref, { eventID, userID, pitchID, createdAt: serverTimestamp() });
        toast.success('Vote cast!');
      }
    } catch (e) {
      console.error(e);
      toast.error('Failed to vote');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={castVote} disabled={disabled || loading} className="px-3 py-1 rounded bg-green-600 text-white disabled:opacity-50">
      {loading ? 'Voting...' : 'Vote'}
    </button>
  );
}
