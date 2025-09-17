import type { PitchDoc } from '@/types';

// Extract YouTube video ID from various YouTube URL formats
function getYouTubeVideoId(url: string): string | null {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

export default function PitchCard({ pitch }: { pitch: PitchDoc }) {
  const videoId = pitch.videoUrl ? getYouTubeVideoId(pitch.videoUrl) : null;

  return (
    <div className="border rounded p-4 shadow-sm bg-white">
      <h3 className="text-lg font-semibold">{pitch.productName}</h3>
      <p className="text-sm text-gray-600 mb-2">By {pitch.teamName}</p>
      <p className="text-gray-700 mb-3">{pitch.description}</p>
      
      {pitch.videoUrl && (
        <div className="mb-3">
          {videoId ? (
            <div className="relative w-full" style={{ paddingBottom: '56.25%' /* 16:9 aspect ratio */ }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full rounded"
                src={`https://www.youtube.com/embed/${videoId}`}
                title={`${pitch.productName} Pitch Video`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            <a 
              className="inline-block text-blue-600 hover:text-blue-800 underline" 
              href={pitch.videoUrl} 
              target="_blank" 
              rel="noreferrer"
            >
              Watch video
            </a>
          )}
        </div>
      )}
      
      <div className="flex items-center gap-2">
        {pitch.isTop10 && <span className="text-xs px-2 py-0.5 rounded bg-purple-100 text-purple-700">Top 10</span>}
        {pitch.winner && <span className="text-xs px-2 py-0.5 rounded bg-emerald-100 text-emerald-700">Winner</span>}
      </div>
    </div>
  );
}
