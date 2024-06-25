import React, { forwardRef } from 'react';
import './TranscriptBlock.css';

interface TranscriptBlockProps {
  text: string;
  isActive: boolean;
  start: number;
  onClick: () => void;
}

const TranscriptBlock = forwardRef<HTMLDivElement, TranscriptBlockProps>(({
  text,
  isActive,
  onClick,
}, ref) => {
  return (
    <div
      className="transcript-block"
      onClick={onClick}
      ref={ref} // Forward the ref to this div
    >
      <span className={isActive ? 'active' : ''}>{text}</span>
    </div>
  );
});

export default React.memo(TranscriptBlock);
