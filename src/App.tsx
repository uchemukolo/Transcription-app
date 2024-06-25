import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { fetchTranscript } from './services/api';
import AudioPlayer from './components/AudioPlayer';
import TranscriptBlock from './components/TranscriptBlock';
import './App.css';

interface Transcript {
  id: string;
  title: string;
  audioUrl: string;
  blocks: {
    start: number;
    end: number;
    text: string;
  }[];
}

const App: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [transcript, setTranscript] = useState<Transcript | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [activeBlockIndex, setActiveBlockIndex] = useState<number>(-1);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [startTime, setStartTime] = useState<number | undefined>(undefined);
  const blockRefs = useRef<(HTMLDivElement | null)[]>([]); // Refs for each transcript block

  // Fetch the transcript data when the component mounts or id changes
  useEffect(() => {
    const getTranscript = async () => {
      try {
        const data = await fetchTranscript(id!);
        setTranscript(data);
      } catch (error) {
        setError((error as Error).message);
      }
    };

    if (id) {
      getTranscript();
    }
  }, [id]);

  // Update active block index based on the current time
  useEffect(() => {
    if (transcript) {
      const activeIndex = transcript.blocks.findIndex(
        (block) => currentTime >= block.start && currentTime <= block.end
      );
      setActiveBlockIndex(activeIndex);
    }
  }, [currentTime, transcript]);

  // Scroll the active block into view if audio is playing
  useEffect(() => {
    if (isPlaying && activeBlockIndex !== -1 && blockRefs.current[activeBlockIndex]) {
      blockRefs.current[activeBlockIndex]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [activeBlockIndex, isPlaying]);

  // Memoize the handleTimeUpdate function to prevent unnecessary re-renders
  const handleTimeUpdate = useCallback((time: number) => {
    setCurrentTime(time);
  }, []);

  // Memoize the handleBlockClick function to prevent unnecessary re-renders
  const handleBlockClick = useCallback((startTime: number) => {
    setStartTime(startTime);
  }, []);

  // Memoize the block rendering to prevent unnecessary re-renders
  const renderBlocks = useMemo(() => {
    return transcript?.blocks.map((block, index) => (
      <TranscriptBlock
        key={index}
        text={block.text}
        start={block.start}
        isActive={isPlaying && index === activeBlockIndex}
        onClick={() => handleBlockClick(block.start)}
        ref={(el) => (blockRefs.current[index] = el)} // Set the ref for each block
      />
    ));
  }, [transcript, isPlaying, activeBlockIndex, handleBlockClick]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!transcript) {
    return <div>Loading...</div>;
  }

  return (
    <div className="app-container">
      <div className='title'>{transcript.title}</div>
      <div>
        {renderBlocks}
      </div>
      <AudioPlayer
        audioUrl={transcript.audioUrl}
        onTimeUpdate={handleTimeUpdate}
        setIsPlaying={setIsPlaying}
        startTime={startTime}
      />
    </div>
  );
};

export default App;
