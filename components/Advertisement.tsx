import React from 'react';

interface AdvertisementProps {
  src: string;
}

const Advertisement: React.FC<AdvertisementProps> = ({ src }) => {
  return (
    <div
      className="w-full aspect-[1080/335] overflow-hidden border border-stone-300"
      aria-label="Espacio publicitario"
    >
      <video
        src={src}
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover"
      >
        Tu navegador no soporta el tag de video.
      </video>
    </div>
  );
};

export default Advertisement;