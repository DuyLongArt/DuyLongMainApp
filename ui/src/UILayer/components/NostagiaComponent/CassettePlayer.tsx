import React, {useEffect, useState} from "react";
import {AnalogButton} from "../../pages/Home/Widget/Widget5Page.tsx";

export const CassettePlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [reelRotation, setReelRotation] = useState(0);
    const [tapeDeck, setTapeDeck] = useState('A');

    useEffect(() => {
        if (isPlaying) {
            const timer = setInterval(() => {
                setReelRotation(prev => prev + 5);
            }, 100);
            return () => clearInterval(timer);
        }
    }, [isPlaying]);

    return (
        <div className="bg-gradient-to-br from-amber-50 to-orange-100 border-4 border-amber-300 rounded-2xl p-6 shadow-2xl">
            {/* Cassette deck header */}
            <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-amber-800 mb-2">
                    📼 SONY WM-D6C
                </h3>
                <div className="text-amber-600 font-mono text-sm">Professional Walkman</div>
            </div>

            {/* Cassette tape */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-4 mb-6 border-2 border-gray-600">
                {/* Tape label */}
                <div className="bg-gradient-to-r from-cream-100 to-yellow-100 rounded p-2 mb-3 text-center border border-yellow-300">
                    <div className="text-amber-800 font-bold text-sm">Mariya Takeuchi</div>
                    <div className="text-amber-600 text-xs">Variety (1984)</div>
                    <div className="text-amber-500 text-xs font-mono">Side {tapeDeck}</div>
                </div>

                {/* Cassette reels */}
                <div className="flex justify-between items-center">
                    <div className="relative">
                        <div
                            className="w-12 h-12 border-4 border-gray-400 rounded-full bg-gradient-to-br from-gray-300 to-gray-500"
                            style={{
                                transform: `rotate(${reelRotation}deg)`,
                                transition: isPlaying ? 'none' : 'transform 0.5s ease-out'
                            }}
                        >
                            {/* Reel spokes */}
                            <div className="absolute inset-2 border-2 border-gray-600 rounded-full">
                                <div className="absolute top-1/2 left-1/2 w-6 h-0.5 bg-gray-600 transform -translate-x-1/2 -translate-y-1/2"></div>
                                <div className="absolute top-1/2 left-1/2 w-0.5 h-6 bg-gray-600 transform -translate-x-1/2 -translate-y-1/2"></div>
                            </div>
                        </div>
                    </div>

                    {/* Tape mechanism */}
                    <div className="flex-1 mx-4 h-2 bg-gradient-to-r from-amber-800 via-amber-600 to-amber-800 rounded-full border border-amber-700"></div>

                    <div className="relative">
                        <div
                            className="w-12 h-12 border-4 border-gray-400 rounded-full bg-gradient-to-br from-gray-300 to-gray-500"
                            style={{
                                transform: `rotate(${-reelRotation}deg)`,
                                transition: isPlaying ? 'none' : 'transform 0.5s ease-out'
                            }}
                        >
                            <div className="absolute inset-2 border-2 border-gray-600 rounded-full">
                                <div className="absolute top-1/2 left-1/2 w-6 h-0.5 bg-gray-600 transform -translate-x-1/2 -translate-y-1/2"></div>
                                <div className="absolute top-1/2 left-1/2 w-0.5 h-6 bg-gray-600 transform -translate-x-1/2 -translate-y-1/2"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Control buttons */}
            <div className="flex justify-center space-x-3 mb-4">
                <AnalogButton variant="chrome" size="sm" isPressed={false}>⏮</AnalogButton>
                <AnalogButton
                    variant="amber"
                    size="md"
                    onClick={() => setIsPlaying(!isPlaying)}
                    isPressed={isPlaying}
                >
                    {isPlaying ? '⏸ PAUSE' : '▶️ PLAY'}
                </AnalogButton>
                <AnalogButton variant="chrome" size="sm">⏭</AnalogButton>
            </div>

            {/* Side selector */}
            <div className="flex justify-center space-x-2">
                <AnalogButton
                    variant={tapeDeck === 'A' ? 'amber' : 'vintage'}
                    size="sm"
                    onClick={() => setTapeDeck('A')}
                    isPressed={tapeDeck === 'A'}
                >
                    SIDE A
                </AnalogButton>
                <AnalogButton
                    variant={tapeDeck === 'B' ? 'amber' : 'vintage'}
                    size="sm"
                    onClick={() => setTapeDeck('B')}
                    isPressed={tapeDeck === 'B'}
                >
                    SIDE B
                </AnalogButton>
            </div>
        </div>
    );
};
