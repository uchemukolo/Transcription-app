import React, { useRef, useEffect, useCallback } from 'react';
import './AudioPlayer.css';

interface AudioPlayerProps {
  audioUrl: string;
  onTimeUpdate: (time: number) => void;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  startTime?: number;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({
  audioUrl,
  onTimeUpdate,
  setIsPlaying,
  startTime
}) => {
  // useRef to reference the audio element
  const audioRef = useRef<HTMLAudioElement>(null);

  // Effect to handle seeking the audio to the start time when startTime changes
  useEffect(() => {
    if (audioRef.current && startTime !== undefined) {
      audioRef.current.currentTime = startTime;
      audioRef.current.play();
    }
  }, [startTime]);

  // Callback to handle time updates from the audio element
  const handleTimeUpdate = useCallback(() => {
    if (audioRef.current) {
      onTimeUpdate(audioRef.current.currentTime);
    }
  }, [onTimeUpdate]);

  return (
    <div className="audio-player-container">
      <audio
        ref={audioRef}
        controls
        src={audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
    </div>
  );
};

export default React.memo(AudioPlayer);
