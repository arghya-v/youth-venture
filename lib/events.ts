import { db } from '@/lib/firebase';
import { collection, doc, getDoc, getDocs, limit, query, where } from 'firebase/firestore';
import type { EventDoc } from '@/types';

export async function getCurrentEventId(): Promise<string | null> {
  const pinned = process.env.NEXT_PUBLIC_CURRENT_EVENT_ID;
  if (pinned) return pinned;
  const q = query(collection(db, 'events'), where('isActive', '==', true), limit(1));
  const snap = await getDocs(q);
  if (snap.empty) return null;
  return snap.docs[0].id;
}

export async function getEvent(eventID: string): Promise<EventDoc | null> {
  const ref = doc(db, 'events', eventID);
  const d = await getDoc(ref);
  if (!d.exists()) return null;
  return { id: d.id, ...(d.data() as Omit<EventDoc, 'id'>) };
}
