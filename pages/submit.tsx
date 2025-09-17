import { FormEvent, useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { db } from '@/lib/firebase';
import { getCurrentEventId, getEvent } from '@/lib/events';
import { addDoc, collection, getDocs, query, serverTimestamp, where } from 'firebase/firestore';
import type { PitchDoc } from '@/types';
import { toast } from 'react-toastify';
import Navbar from '@/components/navbar';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export default function SubmitPage() {
  const { user, profile } = useAuth();
  const [eventID, setEventID] = useState<string | null>(null);
  const [submissionsOpen, setSubmissionsOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    teamName: '',
    email: '',
    productName: '',
    description: '',
    videoUrl: '',
  });

  useEffect(() => {
    (async () => {
      const id = await getCurrentEventId();
      setEventID(id);
      if (!id) {
        setLoading(false);
        return;
      }
      const evt = await getEvent(id);
      setSubmissionsOpen(!!evt?.submissionsOpen);
      setLoading(false);
    })();
  }, []);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!user || !profile) return toast.error('Please sign in');
    if (!eventID) return toast.error('No active event');
    if (!submissionsOpen) return toast.error('Submissions are closed');

    try {
      // Ensure only one pitch per user per event
      const q = query(
        collection(db, 'pitches'),
        where('eventID', '==', eventID),
        where('userID', '==', user.uid)
      );
      const existing = await getDocs(q);
      if (!existing.empty) {
        return toast.info('You already submitted a pitch for this event');
      }

      await addDoc(collection(db, 'pitches'), {
        eventID,
        userID: user.uid,
        teamName: form.teamName,
        email: form.email,
        productName: form.productName,
        description: form.description,
        videoUrl: form.videoUrl,
        isTop10: false,
        winner: false,
        finalRank: null,
        createdAt: serverTimestamp(),
      } as Omit<PitchDoc, 'id'>);
      toast.success('Pitch submitted!');
      setForm({ teamName: '', email: '', productName: '', description: '', videoUrl: '' });
    } catch (e) {
      console.error(e);
      toast.error('Failed to submit');
    }
  };

  if (loading) return (
    <div className={`${poppins.className} relative min-h-screen`}>
      <div className="absolute inset-0 -z-10" style={{
        backgroundImage: "radial-gradient(#d9d9d9 1.55px, transparent 1.55px), radial-gradient(#d9d9d9 1.55px, #f2f2f2 1.55px)",
        backgroundSize: "62px 62px",
        backgroundPosition: "0 0, 31px 31px",
      }} />
      <Navbar />
      <div className="p-6 pt-32">Loading...</div>
    </div>
  );
  
  if (!user) return (
    <div className={`${poppins.className} relative min-h-screen`}>
      <div className="absolute inset-0 -z-10" style={{
        backgroundImage: "radial-gradient(#d9d9d9 1.55px, transparent 1.55px), radial-gradient(#d9d9d9 1.55px, #f2f2f2 1.55px)",
        backgroundSize: "62px 62px",
        backgroundPosition: "0 0, 31px 31px",
      }} />
      <Navbar />
      <div className="p-6 pt-32">Please sign in to submit.</div>
    </div>
  );
  
  if (!profile?.roles?.includes('participant'))
    return (
      <div className={`${poppins.className} relative min-h-screen`}>
        <div className="absolute inset-0 -z-10" style={{
          backgroundImage: "radial-gradient(#d9d9d9 1.55px, transparent 1.55px), radial-gradient(#d9d9d9 1.55px, #f2f2f2 1.55px)",
          backgroundSize: "62px 62px",
          backgroundPosition: "0 0, 31px 31px",
        }} />
        <Navbar />
        <div className="p-6 pt-32">Your account isn&apos;t marked as participant. Ask an admin.</div>
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
      <div className="p-6 pt-32">No active event configured.</div>
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
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-semibold mb-4">Submit your Pitch</h1>
          {!submissionsOpen && (
            <div className="p-3 border rounded bg-yellow-50 text-yellow-700 mb-4">
              Submissions are closed.
            </div>
          )}
          <form onSubmit={onSubmit} className="space-y-3">
            <input className="w-full border p-2 rounded" placeholder="Team/Participant name" value={form.teamName} onChange={(e)=>setForm(f=>({...f, teamName: e.target.value}))} required />
            <input className="w-full border p-2 rounded" type="email" placeholder="Email" value={form.email} onChange={(e)=>setForm(f=>({...f, email: e.target.value}))} required />
            <input className="w-full border p-2 rounded" placeholder="Company/Product name" value={form.productName} onChange={(e)=>setForm(f=>({...f, productName: e.target.value}))} required />
            <textarea className="w-full border p-2 rounded" placeholder="Short description" value={form.description} onChange={(e)=>setForm(f=>({...f, description: e.target.value}))} required />
            <input className="w-full border p-2 rounded" placeholder="YouTube video link" value={form.videoUrl} onChange={(e)=>setForm(f=>({...f, videoUrl: e.target.value}))} required />
            <button disabled={!submissionsOpen} className="px-4 py-2 rounded bg-blue-600 text-white disabled:opacity-50">Submit</button>
          </form>
        </div>
      </main>
    </div>
  );
}
