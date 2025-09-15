import React from 'react';

interface FloatingPodcastButtonProps {
  onClick: () => void;
}

const FloatingPodcastButton: React.FC<FloatingPodcastButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-50 w-28 h-28 md:w-36 md:h-36 rounded-full shadow-2xl transition-transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-black/50"
      aria-label="Mirá el podcast del día"
    >
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Spinning Text */}
        <svg viewBox="0 0 100 100" className="absolute top-0 left-0 w-full h-full animate-spin-very-slow">
          <defs>
            <path id="circle" d=" M 50, 50 m -39, 0 a 39,39 0 1,1 78,0 a 39,39 0 1,1 -78,0 "/>
          </defs>
          <text fill="#000" style={{fontSize: '14px', fontWeight: 'bold', letterSpacing: '0.5px'}} className="uppercase">
            <textPath xlinkHref="#circle" startOffset="25%" textAnchor="middle">
              NUEVO PODCAST
            </textPath>
          </text>
        </svg>

        {/* Inner Image with Pulse Animation */}
        <div className="w-[70%] h-[70%] rounded-full animate-pulse-slow">
            <img
                src="https://res.cloudinary.com/ddmj6zevz/image/upload/v1756851098/Generated_Image_September_02__2025_-_1_54PM-removebg-preview_fpoafd.png"
                alt="Abrir podcast del día"
                className="w-full h-full object-cover rounded-full"
            />
        </div>
      </div>
    </button>
  );
};

export default FloatingPodcastButton;