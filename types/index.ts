import type { Timestamp } from 'firebase/firestore';

export type Role = 'participant' | 'voter' | 'judge' | 'admin';

export interface UserDoc {
  uid: string;
  email?: string | null;
  displayName?: string | null;
  roles?: Role[];
}

export interface EventDoc {
  id: string;
  name: string;
  isActive?: boolean;
  submissionsOpen?: boolean;
  votingOpen?: boolean;
}

export interface PitchDoc {
  id: string;
  eventID: string;
  userID: string;
  teamName: string;
  email: string;
  productName: string;
  description: string;
  videoUrl: string;
  isTop10?: boolean;
  finalRank?: 1 | 2 | 3 | null;
  winner?: boolean;
  createdAt?: Timestamp;
}

export interface VoteDoc {
  id: string; // `${eventID}_${userID}`
  eventID: string;
  userID: string;
  pitchID: string;
  createdAt?: Timestamp;
}

export interface ScoreDoc {
  id: string; // `${eventID}_${judgeID}_${pitchID}`
  eventID: string;
  judgeID: string;
  pitchID: string;
  description: number; // 0-10
  market: number; // 0-10
  creativity: number; // 0-10
  clarity: number; // 0-10
  overall: number; // 0-10
  total?: number; // derived convenience
  createdAt?: Timestamp;
}
