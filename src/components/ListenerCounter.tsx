
import React, { useState, useEffect } from 'react';

const ListenerCounter: React.FC = () => {
    // Generates a random number between 15 and 148.
    const getRandomCount = () => Math.floor(Math.random() * (148 - 15 + 1)) + 15;
    const [count, setCount] = useState(getRandomCount());

    useEffect(() => {
        const interval = setInterval(() => {
            setCount(getRandomCount());
        }, 45000); // Updates every 45 seconds

        return () => clearInterval(interval);
    }, []);

    const paddedCount = count.toString().padStart(3, '0');
    const digits = paddedCount.split('');

    return (
        <div className="listener-counter flex flex-col items-center">
            <span className="text-[8px] font-bold tracking-[0.3em] text-[#1e293b] opacity-80 uppercase stencil-text mb-1">En Linea</span>
            <div className="flex gap-1.5 p-1.5 bg-black/10 rounded-lg heavy-rust">
                {digits.map((digit, index) => (
                    <div className="w-6 h-8 bg-stone-900 flex items-center justify-center rounded border border-white/5 shadow-inner" key={index}>
                        <span className="font-mono text-lg font-bold text-green-500/80 drop-shadow-[0_0_5px_rgba(34,197,94,0.5)]" key={`${index}-${digit}`}>{digit}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ListenerCounter;
