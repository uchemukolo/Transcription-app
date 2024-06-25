import React from 'react';
import './TranscriptBlock.css';

interface TranscriptBlockProps {
  text: string;
  isActive: boolean;
  start: number;
  onClick: () => void;
  onHoverStart: () => void;
  onHoverEnd: () => void;
}

const TranscriptBlock: React.FC<TranscriptBlockProps> = ({
  text,
  isActive,
  onClick,
  onHoverStart,
  onHoverEnd,
}) => {
  return (
    <div
      className="transcript-block"
      onClick={onClick}
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
    >
      <span className={isActive ? 'active' : ''}>{text}</span>
    </div>
  );
};

export default React.memo(TranscriptBlock);
