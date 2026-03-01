import React, { useState, useEffect } from 'react';

const FlipUnit = ({ value }: { value: string }) => (
  <div className="relative w-4 h-6 bg-stone-900/80 rounded-[1px] flex items-center justify-center overflow-hidden border-b border-white/5 shadow-sm">
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-full h-[0.5px] bg-black/40 z-10" />
      <span className="text-stone-300 font-mono text-sm font-medium leading-none select-none">
        {value}
      </span>
    </div>
  </div>
);

const ListenerCounter: React.FC = () => {
    const getRandomCount = () => Math.floor(Math.random() * (148 - 15 + 1)) + 15;
    const [count, setCount] = useState(getRandomCount());

    useEffect(() => {
        const interval = setInterval(() => {
            setCount(getRandomCount());
        }, 45000);
        return () => clearInterval(interval);
    }, []);

    const countStr = count.toString().padStart(3, '0');

    return (
        <div className="flex flex-col items-center gap-1 opacity-70 hover:opacity-100 transition-opacity">
            <div className="flex items-center gap-1.5">
                <div className="w-1 h-1 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.6)] animate-pulse" />
                <span className="text-[8px] font-bold tracking-[0.2em] text-stone-400 uppercase">
                    EN LÍNEA
                </span>
            </div>
            <div className="flex gap-0.5">
                {countStr.split('').map((digit, i) => (
                    <FlipUnit key={i} value={digit} />
                ))}
            </div>
        </div>
    );
};

export default ListenerCounter;
