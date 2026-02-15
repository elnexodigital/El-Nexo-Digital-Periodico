import React, { useEffect, useState } from 'react';

interface Particle {
    id: number;
    x: number;
    y: number;
    size: number;
    color: string;
    duration: number;
    delay: number;
}

const FloatingParticles: React.FC = () => {
    const [particles, setParticles] = useState<Particle[]>([]);

    useEffect(() => {
        // Generate random particles
        const particleCount = 20;
        const newParticles: Particle[] = [];

        for (let i = 0; i < particleCount; i++) {
            newParticles.push({
                id: i,
                x: Math.random() * 100, // %
                y: Math.random() * 100, // %
                size: Math.random() * 4 + 2, // px
                // Mix of brand orange and green, mostly orange as requested
                color: Math.random() > 0.7 ? '#2ECC40' : '#FF851B',
                duration: Math.random() * 10 + 10, // 10-20s
                delay: Math.random() * 5, // 0-5s
            });
        }

        setParticles(newParticles);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
            {particles.map((p) => (
                <div
                    key={p.id}
                    className="absolute rounded-full opacity-60 animate-float"
                    style={{
                        left: `${p.x}%`,
                        top: `${p.y}%`,
                        width: `${p.size}px`,
                        height: `${p.size}px`,
                        backgroundColor: p.color,
                        animationDuration: `${p.duration}s`,
                        animationDelay: `${p.delay}s`,
                        boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
                    }}
                />
            ))}
        </div>
    );
};

export default FloatingParticles;
