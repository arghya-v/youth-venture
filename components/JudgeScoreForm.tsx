import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';

interface Props {
  eventID: string;
  judgeID: string;
  pitchID: string;
}

export default function JudgeScoreForm({ eventID, judgeID, pitchID }: Props) {
  const [form, setForm] = useState({ description: 0, market: 0, creativity: 0, clarity: 0, overall: 0 });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      const id = `${eventID}_${judgeID}_${pitchID}`;
      const ref = doc(db, 'scores', id);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        const data = snap.data() as Partial<{
          description: number;
          market: number;
          creativity: number;
          clarity: number;
          overall: number;
        }>;
        setForm({
          description: data.description || 0,
          market: data.market || 0,
          creativity: data.creativity || 0,
          clarity: data.clarity || 0,
          overall: data.overall || 0,
        });
      }
      setLoading(false);
    })();
  }, [eventID, judgeID, pitchID]);

  const total = form.description + form.market + form.creativity + form.clarity + form.overall;

  const save = async () => {
    try {
      setSaving(true);
      const id = `${eventID}_${judgeID}_${pitchID}`;
      const ref = doc(db, 'scores', id);
      await setDoc(ref, { eventID, judgeID, pitchID, ...form, total, createdAt: serverTimestamp() });
      toast.success('Score saved');
    } catch (e) {
      console.error(e);
      toast.error('Failed to save');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="text-sm text-gray-500">Loading score…</div>;

  const field = (key: keyof typeof form, label: string) => (
    <label className="flex items-center gap-2">
      <span className="w-40">{label}</span>
      <input
        type="number"
        min={0}
        max={10}
        step={1}
        className="w-20 border p-1 rounded"
        value={form[key]}
        onChange={(e) => setForm((f) => ({ ...f, [key]: Number(e.target.value) }))}
      />
      <span className="text-xs text-gray-500">/ 10</span>
    </label>
  );

  return (
    <div className="space-y-2">
      {field('description', 'Description')}
      {field('market', 'Market viability')}
      {field('creativity', 'Creativity')}
      {field('clarity', 'Clarity')}
      {field('overall', 'Overall impression')}
      <div className="flex items-center justify-between">
        <span className="font-medium">Total: {total} / 50</span>
        <button onClick={save} disabled={saving} className="px-3 py-1 rounded bg-blue-600 text-white disabled:opacity-50">
          {saving ? 'Saving…' : 'Save Score'}
        </button>
      </div>
    </div>
  );
}
