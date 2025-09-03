import React, { useState, useEffect, useRef } from 'react';

const FilmGrainOverlay = () => (
    <div
        className="fixed inset-0 pointer-events-none z-50 opacity-20"
        style={{
            background: `
        repeating-conic-gradient(from 0deg at 50% 50%, 
          transparent 0deg, 
          rgba(139, 69, 19, 0.02) 1deg, 
          transparent 2deg, 
          rgba(210, 180, 140, 0.02) 3deg
        )
      `,
            backgroundSize: '3px 3px',
            animation: 'filmGrain 0.2s steps(8, end) infinite'
        }}
    />
);

export const AnalogButton = ({ children, variant = 'amber', size = 'md', onClick, className = '', isPressed = false }) => {
    const [pressed, setPressed] = useState(false);

    const variants = {
        amber: 'bg-gradient-to-b from-amber-200 to-amber-400 hover:from-amber-100 hover:to-amber-300 text-amber-900 border-amber-500',
        sepia: 'bg-gradient-to-b from-orange-200 to-red-300 hover:from-orange-100 hover:to-red-200 text-red-900 border-red-400',
        vintage: 'bg-gradient-to-b from-yellow-100 to-orange-200 hover:from-yellow-50 hover:to-orange-100 text-orange-800 border-orange-400',
        chrome: 'bg-gradient-to-b from-gray-200 to-gray-400 hover:from-gray-100 hover:to-gray-300 text-gray-800 border-gray-500'
    };

    const sizes = {
        sm: 'px-3 py-1 text-sm',
        md: 'px-5 py-2 text-base',
        lg: 'px-7 py-3 text-lg'
    };

    return (
        <button
            onClick={onClick}
            onMouseDown={() => setPressed(true)}
            onMouseUp={() => setPressed(false)}
            onMouseLeave={() => setPressed(false)}
            className={`
        ${variants[variant]}
        ${sizes[size]}
        ${className}
        font-semibold rounded-lg border-2 transition-all duration-200
        shadow-lg active:shadow-inner active:translate-y-1
        ${pressed || isPressed ? 'shadow-inner translate-y-1' : 'hover:shadow-xl'}
      `}
            style={{
                filter: 'contrast(1.1) saturate(1.2)',
                textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
            }}
        >
            {children}
        </button>
    );
};

 const CassettePlayer = () => {
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

const VintageCarRadio = () => {
    const [frequency, setFrequency] = useState(80.0);
    const [volume, setVolume] = useState(7);
    const [band, setBand] = useState('FM');

    return (
        <div className="bg-gradient-to-br from-orange-900 to-red-900 border-4 border-yellow-600 rounded-2xl p-6 shadow-2xl">
            {/* Radio brand */}
            <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-yellow-200 mb-1">
                    🎚️ PIONEER DEH-1500
                </h3>
                <div className="text-yellow-400 font-mono text-xs">Car Stereo System</div>
            </div>

            {/* Digital display */}
            <div className="bg-black rounded-lg p-4 mb-6 border-2 border-yellow-500">
                <div className="text-center">
                    <div className="text-green-400 font-mono text-2xl font-bold mb-1">
                        {frequency.toFixed(1)}
                    </div>
                    <div className="text-green-300 font-mono text-sm">{band} MHz</div>
                </div>

                {/* Equalizer bars */}
                <div className="flex justify-center space-x-1 mt-3">
                    {Array.from({ length: 8 }, (_, i) => (
                        <div
                            key={i}
                            className="w-2 bg-green-400 rounded-full transition-all duration-300"
                            style={{
                                height: `${Math.random() * 20 + 10}px`,
                                opacity: Math.random() * 0.5 + 0.5
                            }}
                        />
                    ))}
                </div>
            </div>

            {/* Frequency tuner */}
            <div className="mb-6">
                <div className="flex justify-between text-yellow-300 text-sm font-mono mb-2">
                    <span>76.0</span>
                    <span>TUNING</span>
                    <span>90.0</span>
                </div>
                <input
                    type="range"
                    min="76.0"
                    max="90.0"
                    step="0.1"
                    value={frequency}
                    onChange={(e) => setFrequency(parseFloat(e.target.value))}
                    className="w-full h-2 bg-orange-800 rounded-lg appearance-none cursor-pointer"
                    style={{
                        background: 'linear-gradient(90deg, #ea580c 0%, #dc2626 100%)'
                    }}
                />
            </div>

            {/* Controls */}
            <div className="grid grid-cols-3 gap-3">
                <AnalogButton variant="sepia" size="sm">AM/FM</AnalogButton>
                <AnalogButton variant="amber" size="sm">AUTO</AnalogButton>
                <AnalogButton variant="vintage" size="sm">SEEK</AnalogButton>
            </div>

            {/* Volume */}
            <div className="mt-4 flex items-center space-x-3">
                <span className="text-yellow-300 font-mono text-sm">VOL</span>
                <div className="flex space-x-1 flex-1">
                    {Array.from({ length: 10 }, (_, i) => (
                        <div
                            key={i}
                            className={`h-3 flex-1 rounded-full border ${
                                i < volume
                                    ? 'bg-yellow-400 border-yellow-300'
                                    : 'bg-orange-800 border-orange-700'
                            }`}
                            onClick={() => setVolume(i + 1)}
                        />
                    ))}
                </div>
                <span className="text-yellow-300 font-mono text-sm">{volume}</span>
            </div>
        </div>
    );
};

const AnalogCamera = () => {
    const [photos, setPhotos] = useState([
        { id: 1, scene: '🌅', caption: 'Sunrise Drive', filter: 'sepia' },
        { id: 2, scene: '🚗', caption: 'My Car', filter: 'warm' },
        { id: 3, scene: '🌃', caption: 'Tokyo Night', filter: 'cool' },
        { id: 4, scene: '💝', caption: 'Love Letter', filter: 'vintage' }
    ]);

    const [selectedPhoto, setSelectedPhoto] = useState(photos[0]);
    const [flash, setFlash] = useState(false);

    const takePhoto = () => {
        setFlash(true);
        setTimeout(() => setFlash(false), 200);

        const scenes = ['🌆', '💖', '🎵', '✨', '🌸', '🍑'];
        const captions = ['City Lights', 'Love Moment', 'Music Time', 'Starlight', 'Spring', 'Sweet'];
        const filters = ['sepia', 'warm', 'cool', 'vintage'];

        const newPhoto = {
            id: photos.length + 1,
            scene: scenes[Math.floor(Math.random() * scenes.length)],
            caption: captions[Math.floor(Math.random() * captions.length)],
            filter: filters[Math.floor(Math.random() * filters.length)]
        };

        setPhotos(prev => [newPhoto, ...prev.slice(0, 7)]);
        setSelectedPhoto(newPhoto);
    };

    return (
        <div className="bg-gradient-to-br from-yellow-50 to-orange-100 border-4 border-orange-300 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
            {/* Camera flash overlay */}
            {flash && (
                <div className="absolute inset-0 bg-white opacity-80 z-20 rounded-3xl"></div>
            )}

            <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-orange-800 mb-2">
                    📷 CANON AE-1
                </h3>
                <div className="text-orange-600 font-mono text-sm">35mm Film Camera</div>
            </div>

            {/* Viewfinder */}
            <div className="relative mb-6">
                <div className="bg-black rounded-2xl p-4 border-4 border-yellow-600">
                    <div className="relative w-48 h-32 mx-auto bg-gradient-to-br from-orange-200 via-red-200 to-purple-200 rounded-lg overflow-hidden border-2 border-yellow-400">
                        {/* Photo content */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-6xl">{selectedPhoto.scene}</div>
                        </div>

                        {/* Film effect overlay */}
                        <div
                            className="absolute inset-0 opacity-30"
                            style={{
                                background: selectedPhoto.filter === 'sepia' ? 'linear-gradient(45deg, rgba(139, 69, 19, 0.3), transparent)' :
                                    selectedPhoto.filter === 'warm' ? 'linear-gradient(45deg, rgba(249, 115, 22, 0.2), transparent)' :
                                        selectedPhoto.filter === 'cool' ? 'linear-gradient(45deg, rgba(59, 130, 246, 0.2), transparent)' :
                                            'linear-gradient(45deg, rgba(168, 85, 247, 0.2), transparent)'
                            }}
                        />

                        {/* Viewfinder grid */}
                        <div className="absolute inset-0 border border-yellow-400/40">
                            <div className="absolute top-1/3 left-0 right-0 h-px bg-yellow-400/30"></div>
                            <div className="absolute top-2/3 left-0 right-0 h-px bg-yellow-400/30"></div>
                            <div className="absolute left-1/3 top-0 bottom-0 w-px bg-yellow-400/30"></div>
                            <div className="absolute left-2/3 top-0 bottom-0 w-px bg-yellow-400/30"></div>
                        </div>
                    </div>
                </div>

                {/* Camera info display */}
                <div className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded font-mono">
                    REC
                </div>
            </div>

            {/* Photo caption */}
            <div className="text-center mb-4">
                <div className="text-orange-700 font-medium">{selectedPhoto.caption}</div>
                <div className="text-orange-500 text-sm font-mono">フィルム写真</div>
            </div>

            {/* Camera controls */}
            <div className="grid grid-cols-2 gap-3 mb-4">
                <AnalogButton
                    variant="amber"
                    onClick={takePhoto}
                    className="col-span-2"
                >
                    📸 CAPTURE MOMENT
                </AnalogButton>
            </div>

            {/* Film roll preview */}
            <div className="flex space-x-2 overflow-x-auto pb-2">
                {photos.slice(0, 6).map(photo => (
                    <div
                        key={photo.id}
                        onClick={() => setSelectedPhoto(photo)}
                        className={`min-w-12 h-12 bg-gradient-to-br from-orange-200 to-red-200 rounded border-2 cursor-pointer flex items-center justify-center text-lg transition-all ${
                            selectedPhoto.id === photo.id ? 'border-orange-400 scale-110' : 'border-orange-300 hover:scale-105'
                        }`}
                    >
                        {photo.scene}
                    </div>
                ))}
            </div>
        </div>
    );
};

const VintageClockRadio = () => {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [alarm, setAlarm] = useState('06:30');
    const [alarmOn, setAlarmOn] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="bg-gradient-to-br from-amber-100 to-yellow-200 border-4 border-amber-400 rounded-2xl p-6 shadow-2xl">
            <div className="text-center mb-6">
                <h3 className="text-lg font-bold text-amber-800">
                    ⏰ PANASONIC RC-6015
                </h3>
                <div className="text-amber-600 font-mono text-xs">Digital Clock Radio</div>
            </div>

            {/* Main display */}
            <div className="bg-black rounded-lg p-4 mb-6 border-2 border-yellow-500">
                <div className="text-center">
                    <div className="text-green-400 font-mono text-4xl font-bold mb-2">
                        {currentTime.toLocaleTimeString('en-US', {
                            hour12: false,
                            hour: '2-digit',
                            minute: '2-digit'
                        })}
                    </div>
                    <div className="text-green-300 font-mono text-sm">
                        {currentTime.toLocaleDateString('ja-JP', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit'
                        })}
                    </div>
                </div>

                {/* Alarm indicator */}
                {alarmOn && (
                    <div className="text-center mt-2">
            <span className="text-red-400 font-mono text-xs animate-pulse">
              🚨 ALARM: {alarm}
            </span>
                    </div>
                )}
            </div>

            {/* Controls */}
            <div className="grid grid-cols-3 gap-2 mb-4">
                <AnalogButton variant="vintage" size="sm">HOUR</AnalogButton>
                <AnalogButton variant="vintage" size="sm">MIN</AnalogButton>
                <AnalogButton
                    variant={alarmOn ? 'sepia' : 'vintage'}
                    size="sm"
                    onClick={() => setAlarmOn(!alarmOn)}
                    isPressed={alarmOn}
                >
                    ALARM
                </AnalogButton>
            </div>

            <div className="text-center text-amber-700 font-mono text-sm">
                Wake up time: {alarm} AM<br/>
                目覚まし時計
            </div>
        </div>
    );
};

const AnalogMoodMeter = () => {
    const [mood, setMood] = useState(75);
    const [moodType, setMoodType] = useState('nostalgic');

    const moodTypes = {
        melancholy: { emoji: '😌', color: 'blue-400', japanese: '物悲しい' },
        nostalgic: { emoji: '🥺', color: 'amber-400', japanese: '懐かしい' },
        romantic: { emoji: '💕', color: 'rose-400', japanese: 'ロマンチック' },
        dreamy: { emoji: '☁️', color: 'purple-300', japanese: '夢見がち' },
        peaceful: { emoji: '😊', color: 'green-400', japanese: '平和' }
    };

    return (
        <div className="bg-gradient-to-br from-cream-100 to-peach-100 border-4 border-orange-300 rounded-3xl p-6 shadow-2xl">
            <div className="text-center mb-6">
                <h3 className="text-lg font-bold text-orange-700">
                    💭 Mood Meter 気分測定器
                </h3>
            </div>

            {/* Analog mood gauge */}
            <div className="relative w-32 h-32 mx-auto mb-6">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-orange-200 to-red-200 border-4 border-orange-400">
                    {/* Mood scale markings */}
                    {Array.from({ length: 10 }, (_, i) => (
                        <div
                            key={i}
                            className="absolute w-0.5 h-4 bg-orange-500 rounded-full"
                            style={{
                                top: '8px',
                                left: '50%',
                                transformOrigin: '50% 56px',
                                transform: `translateX(-50%) rotate(${i * 18 - 90}deg)`
                            }}
                        />
                    ))}

                    {/* Mood needle */}
                    <div
                        className="absolute w-0.5 h-12 bg-red-500 rounded-full"
                        style={{
                            top: '16px',
                            left: '50%',
                            transformOrigin: '50% 48px',
                            transform: `translateX(-50%) rotate(${(mood / 100) * 180 - 90}deg)`,
                            transition: 'transform 0.8s ease-out',
                            filter: 'drop-shadow(0 0 8px rgba(239, 68, 68, 0.6))'
                        }}
                    />

                    {/* Center */}
                    <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-red-500 rounded-full transform -translate-x-1/2 -translate-y-1/2" />
                </div>

                <div className="text-center">
                    <div className="text-2xl mb-1">{moodTypes[moodType].emoji}</div>
                    <div className="text-orange-700 font-medium capitalize">{moodType}</div>
                    <div className="text-orange-500 text-sm">{moodTypes[moodType].japanese}</div>
                </div>
            </div>

            {/* Mood selector */}
            <div className="grid grid-cols-2 gap-2">
                {Object.entries(moodTypes).slice(0, 4).map(([type, data]) => (
                    <AnalogButton
                        key={type}
                        variant={moodType === type ? 'amber' : 'vintage'}
                        size="sm"
                        onClick={() => setMoodType(type)}
                        isPressed={moodType === type}
                    >
                        {data.emoji} {type}
                    </AnalogButton>
                ))}
            </div>
        </div>
    );
};

const VinylRecord = () => {
    const [isSpinning, setIsSpinning] = useState(false);
    const [rpm, setRpm] = useState(33);

    return (
        <div className="bg-gradient-to-br from-amber-900 to-orange-900 border-4 border-yellow-500 rounded-2xl p-6 shadow-2xl">
            <div className="text-center mb-4">
                <h3 className="text-lg font-bold text-yellow-200">
                    🎵 TECHNICS SL-1200
                </h3>
                <div className="text-yellow-400 font-mono text-xs">Direct Drive Turntable</div>
            </div>

            {/* Vinyl record */}
            <div className="relative w-48 h-48 mx-auto mb-6">
                <div
                    className={`absolute inset-0 rounded-full bg-black border-4 border-yellow-600 ${
                        isSpinning ? 'animate-spin' : ''
                    }`}
                    style={{
                        background: 'radial-gradient(circle, #1f2937 30%, #000000 70%)',
                        animationDuration: rpm === 33 ? '1.8s' : '1.3s'
                    }}
                >
                    {/* Record grooves */}
                    {Array.from({ length: 8 }, (_, i) => (
                        <div
                            key={i}
                            className="absolute border border-gray-600 rounded-full"
                            style={{
                                top: `${10 + i * 5}%`,
                                left: `${10 + i * 5}%`,
                                right: `${10 + i * 5}%`,
                                bottom: `${10 + i * 5}%`
                            }}
                        />
                    ))}

                    {/* Center label */}
                    <div className="absolute top-1/2 left-1/2 w-20 h-20 bg-gradient-to-br from-red-500 to-red-700 rounded-full transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center border-2 border-yellow-400">
                        <div className="text-center text-yellow-100">
                            <div className="font-bold text-xs">CITY POP</div>
                            <div className="text-xs">CLASSICS</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Turntable controls */}
            <div className="grid grid-cols-3 gap-3 mb-4">
                <AnalogButton
                    variant="sepia"
                    size="sm"
                    onClick={() => setRpm(33)}
                    isPressed={rpm === 33}
                >
                    33 RPM
                </AnalogButton>

                <AnalogButton
                    variant="amber"
                    onClick={() => setIsSpinning(!isSpinning)}
                    isPressed={isSpinning}
                >
                    {isSpinning ? 'STOP' : 'START'}
                </AnalogButton>

                <AnalogButton
                    variant="sepia"
                    size="sm"
                    onClick={() => setRpm(45)}
                    isPressed={rpm === 45}
                >
                    45 RPM
                </AnalogButton>
            </div>

            <div className="text-center text-yellow-600 font-mono text-sm">
                Now Playing: Plastic Love<br/>
                今聴いている：プラスチック・ラブ
            </div>
        </div>
    );
};

const Widget5Page = () => {
    const [currentView, setCurrentView] = useState('living-room');

    return (
        <div className="min-h-screen relative overflow-hidden">
            {/* Film grain overlay */}
            <FilmGrainOverlay />

            {/* Warm analog background */}
            <div className="fixed inset-0">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-100 via-yellow-50 via-rose-100 to-amber-100" />

                {/* Vintage color temperature overlay */}
                <div
                    className="absolute inset-0 opacity-40"
                    style={{
                        background: 'radial-gradient(ellipse at top, rgba(249, 115, 22, 0.1), transparent 50%), radial-gradient(ellipse at bottom, rgba(239, 68, 68, 0.1), transparent 50%)'
                    }}
                />

                {/* Soft bokeh lights */}
                <div className="absolute top-20 left-32 w-32 h-32 bg-yellow-300 rounded-full opacity-10 blur-2xl animate-pulse" />
                <div className="absolute top-40 right-24 w-24 h-24 bg-rose-300 rounded-full opacity-15 blur-2xl animate-pulse" />
                <div className="absolute bottom-40 left-1/3 w-40 h-40 bg-orange-300 rounded-full opacity-12 blur-3xl animate-pulse" />
            </div>

            {/* Custom vintage animations */}
            <style jsx>{`
        @keyframes filmGrain {
          0% { transform: translate(0, 0); }
          10% { transform: translate(-1px, -1px); }
          20% { transform: translate(1px, 0px); }
          30% { transform: translate(-1px, 1px); }
          40% { transform: translate(0px, -1px); }
          50% { transform: translate(1px, 1px); }
          60% { transform: translate(-1px, 0px); }
          70% { transform: translate(1px, -1px); }
          80% { transform: translate(0px, 1px); }
          90% { transform: translate(-1px, -1px); }
          100% { transform: translate(0, 0); }
        }
        @keyframes vintageFlicker {
          0%, 100% { opacity: 1; filter: sepia(0.1) contrast(1.05) brightness(1.02); }
          50% { opacity: 0.98; filter: sepia(0.15) contrast(1.08) brightness(1.05); }
        }
      `}</style>

            <div className="relative z-10 p-8" style={{ animation: 'vintageFlicker 6s ease-in-out infinite' }}>
                {/* Vintage navigation bar */}
                <nav className="text-center mb-12">
                    <h1 className="text-6xl font-light text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-orange-500 to-red-500 mb-4" style={{
                        textShadow: '2px 2px 4px rgba(249, 115, 22, 0.2)',
                        fontFamily: 'serif',
                        filter: 'sepia(0.2)'
                    }}>
                        プラスチック・ラブ
                    </h1>
                    <div className="text-orange-600 font-light text-xl mb-6">Analog Memories Collection</div>

                    <div className="flex justify-center space-x-6">
                        {['living-room', 'car', 'studio'].map(view => (
                            <button
                                key={view}
                                onClick={() => setCurrentView(view)}
                                className={`px-6 py-2 rounded-full font-medium transition-all duration-500 ${
                                    currentView === view
                                        ? 'bg-gradient-to-r from-amber-300 to-orange-300 text-amber-800 shadow-lg'
                                        : 'text-orange-500 hover:text-orange-400'
                                }`}
                            >
                                {view === 'living-room' && '🏠 Living Room'}
                                {view === 'car' && '🚗 Car'}
                                {view === 'studio' && '🎵 Studio'}
                            </button>
                        ))}
                    </div>
                </nav>

                {/* Main content area */}
                <div className="max-w-7xl mx-auto">
                    {currentView === 'living-room' && (
                        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
                            <VintageClockRadio />
                            <AnalogCamera />
                            <AnalogMoodMeter />

                            <div className="xl:col-span-3">
                                <div className="bg-gradient-to-br from-yellow-50/90 to-orange-50/90 border-3 border-orange-300 rounded-3xl p-8 text-center backdrop-blur-sm">
                                    <h2 className="text-3xl font-light text-orange-700 mb-4">
                                        Living Room リビングルーム
                                    </h2>
                                    <p className="text-orange-600 text-lg leading-relaxed max-w-2xl mx-auto">
                                        Surrounded by warm analog devices, the soft glow of vintage electronics fills the room.
                                        Each component tells a story of simpler times when technology felt personal and intimate.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {currentView === 'car' && (
                        <div className="grid lg:grid-cols-2 gap-8">
                            <VintageCarRadio />
                            <div className="bg-gradient-to-br from-amber-50/90 to-red-50/90 border-3 border-red-300 rounded-3xl p-8 backdrop-blur-sm">
                                <h2 className="text-2xl font-light text-red-700 mb-6 text-center">
                                    🚗 Night Drive 深夜ドライブ
                                </h2>
                                <div className="space-y-4">
                                    <div className="flex justify-between text-red-600">
                                        <span>Speed:</span>
                                        <span className="font-mono">85 km/h</span>
                                    </div>
                                    <div className="flex justify-between text-red-600">
                                        <span>Highway:</span>
                                        <span className="font-mono">首都高速</span>
                                    </div>
                                    <div className="flex justify-between text-red-600">
                                        <span>Destination:</span>
                                        <span className="font-mono">Nowhere</span>
                                    </div>
                                    <div className="text-center mt-6 text-red-500 italic">
                                        "Just driving through the night,<br/>
                                        thinking about you..."
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {currentView === 'studio' && (
                        <div className="grid lg:grid-cols-2 gap-8">
                            <CassettePlayer />
                            <VinylRecord />
                        </div>
                    )}

                    {/* Bottom vintage quote */}
                    <div className="text-center mt-16 py-8 border-t border-orange-200/50">
                        <blockquote className="text-orange-600 font-light text-lg italic mb-4 max-w-2xl mx-auto">
                            "ただの恋に終わらせたい、あなたとのこの愛を"<br/>
                            <span className="text-sm opacity-80">"I want to end this love with you as just a romance"</span>
                        </blockquote>
                        <div className="text-orange-500 text-sm font-mono">
                            - Mariya Takeuchi, Plastic Love (1984)
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Widget5Page;