
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
        <div className="listener-counter">
            <span className="counter-title">EN LÍNEA</span>
            <div className="digits-container">
                {digits.map((digit, index) => (
                    <div className="digit-box" key={index}>
                      <span className="digit-char" key={`${index}-${digit}`}>{digit}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ListenerCounter;
