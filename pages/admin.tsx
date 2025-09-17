import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { db } from '@/lib/firebase';
import { collection, doc, getDocs, updateDoc, addDoc, serverTimestamp, query, where } from 'firebase/firestore';
import type { EventDoc, PitchDoc, VoteDoc, ScoreDoc } from '@/types';
import Navbar from '@/components/navbar';
import UserManagement from '@/components/UserManagement';
import DataExport from '@/components/DataExport';
import { Poppins } from 'next/font/google';
import { toast } from 'react-toastify';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export default function AdminPage() {
  const { user, profile } = useAuth();
  const [events, setEvents] = useState<EventDoc[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<EventDoc | null>(null);
  const [pitches, setPitches] = useState<PitchDoc[]>([]);
  const [votes, setVotes] = useState<VoteDoc[]>([]);
  const [scores, setScores] = useState<ScoreDoc[]>([]);
  const [loading, setLoading] = useState(true);
  
  // New event form
  const [newEventName, setNewEventName] = useState('');

  useEffect(() => {
    loadEvents();
  }, []);

  useEffect(() => {
    if (selectedEvent) {
      loadEventData(selectedEvent.id);
    }
  }, [selectedEvent]);

  const loadEvents = async () => {
    try {
      const snap = await getDocs(collection(db, 'events'));
      const eventList = snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<EventDoc, 'id'>) }));
      setEvents(eventList);
      
      // Auto-select active event
      const active = eventList.find(e => e.isActive);
      if (active) setSelectedEvent(active);
      
      setLoading(false);
    } catch (e) {
      console.error(e);
      toast.error('Failed to load events');
      setLoading(false);
    }
  };

  const loadEventData = async (eventId: string) => {
    try {
      const [pitchSnap, voteSnap, scoreSnap] = await Promise.all([
        getDocs(query(collection(db, 'pitches'), where('eventID', '==', eventId))),
        getDocs(query(collection(db, 'votes'), where('eventID', '==', eventId))),
        getDocs(query(collection(db, 'scores'), where('eventID', '==', eventId)))
      ]);

      setPitches(pitchSnap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<PitchDoc, 'id'>) })));
      setVotes(voteSnap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<VoteDoc, 'id'>) })));
      setScores(scoreSnap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<ScoreDoc, 'id'>) })));
    } catch (e) {
      console.error(e);
      toast.error('Failed to load event data');
    }
  };

  const createEvent = async () => {
    if (!newEventName.trim()) return;
    try {
      const newEvent = {
        name: newEventName,
        isActive: false,
        submissionsOpen: false,
        votingOpen: false,
        createdAt: serverTimestamp(),
      };
      await addDoc(collection(db, 'events'), newEvent);
      setNewEventName('');
      toast.success('Event created');
      loadEvents();
    } catch (e) {
      console.error(e);
      toast.error('Failed to create event');
    }
  };

  const toggleEventFlag = async (flag: keyof EventDoc, value: boolean) => {
    if (!selectedEvent) return;
    try {
      await updateDoc(doc(db, 'events', selectedEvent.id), { [flag]: value });
      setSelectedEvent({ ...selectedEvent, [flag]: value });
      toast.success(`${flag} ${value ? 'enabled' : 'disabled'}`);
      loadEvents();
    } catch (e) {
      console.error(e);
      toast.error('Failed to update event');
    }
  };

  const togglePitchTop10 = async (pitchId: string, isTop10: boolean) => {
    try {
      await updateDoc(doc(db, 'pitches', pitchId), { isTop10 });
      setPitches(pitches.map(p => p.id === pitchId ? { ...p, isTop10 } : p));
      toast.success(`Pitch ${isTop10 ? 'added to' : 'removed from'} Top 10`);
    } catch (e) {
      console.error(e);
      toast.error('Failed to update pitch');
    }
  };

  const setFinalRank = async (pitchId: string, rank: number | null) => {
    try {
      const updates: Partial<PitchDoc> = { 
        finalRank: rank as (1 | 2 | 3 | null), 
        winner: rank !== null && rank <= 3 
      };
      await updateDoc(doc(db, 'pitches', pitchId), updates);
      setPitches(pitches.map(p => p.id === pitchId ? { ...p, ...updates } : p));
      toast.success(rank ? `Set rank ${rank}` : 'Removed ranking');
    } catch (e) {
      console.error(e);
      toast.error('Failed to set ranking');
    }
  };

  // Analytics
  const voteCounts = votes.reduce((acc, vote) => {
    acc[vote.pitchID] = (acc[vote.pitchID] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const scoreTotals = scores.reduce((acc, score) => {
    if (!acc[score.pitchID]) acc[score.pitchID] = [];
    acc[score.pitchID].push(score.total || 0);
    return acc;
  }, {} as Record<string, number[]>);

  const pitchAnalytics = pitches.map(p => ({
    ...p,
    voteCount: voteCounts[p.id] || 0,
    judgeScores: scoreTotals[p.id] || [],
    avgScore: scoreTotals[p.id]?.length ? scoreTotals[p.id].reduce((a, b) => a + b, 0) / scoreTotals[p.id].length : 0,
  })).sort((a, b) => b.voteCount - a.voteCount);

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
      <div className="p-6 pt-32">Please sign in.</div>
    </div>
  );

  if (!profile?.roles?.includes('admin')) return (
    <div className={`${poppins.className} relative min-h-screen`}>
      <div className="absolute inset-0 -z-10" style={{
        backgroundImage: "radial-gradient(#d9d9d9 1.55px, transparent 1.55px), radial-gradient(#d9d9d9 1.55px, #f2f2f2 1.55px)",
        backgroundSize: "62px 62px",
        backgroundPosition: "0 0, 31px 31px",
      }} />
      <Navbar />
      <div className="p-6 pt-32">Access restricted to admins.</div>
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
        <div className="max-w-6xl mx-auto space-y-6">
          <h1 className="text-3xl font-semibold">Admin Dashboard</h1>

          {/* Event Management */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Event Management</h2>
            
            {/* Create New Event */}
            <div className="mb-6 p-4 border rounded">
              <h3 className="font-medium mb-2">Create New Event</h3>
              <div className="flex gap-2">
                <input
                  className="flex-1 border p-2 rounded"
                  placeholder="Event name"
                  value={newEventName}
                  onChange={(e) => setNewEventName(e.target.value)}
                />
                <button
                  onClick={createEvent}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Create
                </button>
              </div>
            </div>

            {/* Event Selector */}
            <div className="mb-4">
              <label className="block font-medium mb-2">Select Event</label>
              <select 
                className="w-full border p-2 rounded"
                value={selectedEvent?.id || ''}
                onChange={(e) => {
                  const event = events.find(ev => ev.id === e.target.value);
                  setSelectedEvent(event || null);
                }}
              >
                <option value="">Choose an event...</option>
                {events.map(event => (
                  <option key={event.id} value={event.id}>
                    {event.name} {event.isActive ? '(Active)' : ''}
                  </option>
                ))}
              </select>
            </div>

            {/* Event Controls */}
            {selectedEvent && (
              <div className="grid md:grid-cols-3 gap-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedEvent.isActive || false}
                    onChange={(e) => toggleEventFlag('isActive', e.target.checked)}
                  />
                  <span>Active Event</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedEvent.submissionsOpen || false}
                    onChange={(e) => toggleEventFlag('submissionsOpen', e.target.checked)}
                  />
                  <span>Submissions Open</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedEvent.votingOpen || false}
                    onChange={(e) => toggleEventFlag('votingOpen', e.target.checked)}
                  />
                  <span>Voting Open</span>
                </label>
              </div>
            )}
          </div>

          {/* User Management */}
          <UserManagement />

          {/* Analytics */}
          {selectedEvent && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Analytics</h2>
              <div className="grid md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 border rounded">
                  <div className="text-2xl font-bold text-blue-600">{pitches.length}</div>
                  <div className="text-sm text-gray-600">Total Pitches</div>
                </div>
                <div className="text-center p-4 border rounded">
                  <div className="text-2xl font-bold text-green-600">{votes.length}</div>
                  <div className="text-sm text-gray-600">Total Votes</div>
                </div>
                <div className="text-center p-4 border rounded">
                  <div className="text-2xl font-bold text-purple-600">{pitches.filter(p => p.isTop10).length}</div>
                  <div className="text-sm text-gray-600">Top 10 Selected</div>
                </div>
                <div className="text-center p-4 border rounded">
                  <div className="text-2xl font-bold text-orange-600">{scores.length}</div>
                  <div className="text-sm text-gray-600">Judge Scores</div>
                </div>
              </div>
            </div>
          )}

          {/* Pitch Management */}
          {selectedEvent && pitchAnalytics.length > 0 && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Pitch Management</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="p-2">Pitch</th>
                      <th className="p-2">Team</th>
                      <th className="p-2">Votes</th>
                      <th className="p-2">Avg Score</th>
                      <th className="p-2">Top 10</th>
                      <th className="p-2">Final Rank</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pitchAnalytics.map((pitch) => (
                      <tr key={pitch.id} className="border-b hover:bg-gray-50">
                        <td className="p-2 font-medium">{pitch.productName}</td>
                        <td className="p-2 text-gray-600">{pitch.teamName}</td>
                        <td className="p-2">{pitch.voteCount}</td>
                        <td className="p-2">{pitch.avgScore.toFixed(1)}</td>
                        <td className="p-2">
                          <input
                            type="checkbox"
                            checked={pitch.isTop10 || false}
                            onChange={(e) => togglePitchTop10(pitch.id, e.target.checked)}
                          />
                        </td>
                        <td className="p-2">
                          <select
                            className="border p-1 rounded text-sm"
                            value={pitch.finalRank || ''}
                            onChange={(e) => setFinalRank(pitch.id, e.target.value ? parseInt(e.target.value) : null)}
                          >
                            <option value="">No rank</option>
                            <option value="1">1st Place</option>
                            <option value="2">2nd Place</option>
                            <option value="3">3rd Place</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Data Export */}
          {selectedEvent && pitches.length > 0 && (
            <DataExport 
              pitches={pitches} 
              votes={votes} 
              scores={scores} 
              eventName={selectedEvent.name}
            />
          )}
        </div>
      </main>
    </div>
  );
}
