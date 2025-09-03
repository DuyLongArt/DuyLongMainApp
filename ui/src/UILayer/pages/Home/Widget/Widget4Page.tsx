import React, { useState, useEffect } from 'react';

const VHSStatic = () => (
    <div
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
            background: `
        repeating-linear-gradient(
          0deg,
          transparent,
          transparent 1px,
          rgba(255, 255, 255, 0.05) 1px,
          rgba(255, 255, 255, 0.05) 2px
        )
      `,
            animation: 'vhsStatic 0.1s linear infinite'
        }}
    />
);

const DreamyButton = ({ children, variant = 'coral', size = 'md', onClick, className = '', glowing = false }) => {
    const [isHovered, setIsHovered] = useState(false);

    const variants = {
        coral: 'from-pink-200 via-coral-200 to-orange-200 text-rose-700 border-pink-300',
        mint: 'from-teal-100 via-cyan-100 to-blue-100 text-teal-800 border-teal-300',
        lavender: 'from-purple-100 via-indigo-100 to-pink-100 text-purple-800 border-purple-300',
        peach: 'from-orange-100 via-yellow-100 to-pink-100 text-orange-800 border-orange-300',
        ghost: 'from-white/80 to-gray-100/80 text-gray-700 border-gray-300'
    };

    const sizes = {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg'
    };

    return (
        <button
            onClick={onClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`
        bg-gradient-to-br ${variants[variant]}
        ${sizes[size]}
        ${className}
        font-medium rounded-full border-2 transition-all duration-700
        shadow-lg hover:shadow-xl backdrop-blur-sm transform hover:scale-105
        ${glowing ? 'animate-pulse' : ''}
      `}
            style={{
                filter: 'saturate(0.9) brightness(1.1)',
                boxShadow: isHovered
                    ? '0 10px 40px rgba(255, 182, 193, 0.3), 0 0 30px rgba(255, 182, 193, 0.2)'
                    : '0 5px 20px rgba(0, 0, 0, 0.1)',
                backdropFilter: 'blur(10px) saturate(1.5)'
            }}
        >
            {children}
        </button>
    );
};

const VHSCard = ({ title, subtitle, children, className = '', tapeEffect = false }) => {
    return (
        <div
            className={`
        relative bg-gradient-to-br from-white/70 to-gray-50/70 backdrop-blur-xl
        border-2 border-pink-200/60 rounded-3xl p-6 transition-all duration-500
        hover:border-pink-300/80 hover:shadow-xl hover:shadow-pink-200/30
        ${className}
      `}
            style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgba(248, 250, 252, 0.7))',
                backdropFilter: 'blur(20px) saturate(1.3) brightness(1.05)',
                filter: 'contrast(1.05)'
            }}
        >
            {/* VHS tape lines effect */}
            {tapeEffect && <VHSStatic />}

            {/* Soft dreamy border glow */}
            <div
                className="absolute inset-0 rounded-3xl pointer-events-none opacity-50"
                style={{
                    background: 'linear-gradient(45deg, transparent, rgba(255, 182, 193, 0.1), transparent)',
                    filter: 'blur(2px)'
                }}
            />

            <div className="relative z-10">
                {title && (
                    <h3 className="text-xl font-light text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-purple-400 mb-2">
                        {title}
                    </h3>
                )}
                {subtitle && (
                    <p className="text-rose-400/80 text-sm mb-4 font-light opacity-90">
                        {subtitle}
                    </p>
                )}
                <div className="text-gray-700">
                    {children}
                </div>
            </div>
        </div>
    );
};

const VHSTapePlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [tapePosition, setTapePosition] = useState(0);
    const [rewindSpeed, setRewindSpeed] = useState(1);

    const tapeData = {
        title: "LOVE SONGS ラブソング",
        artist: "Various Artists",
        year: "1984",
        tracks: [
            "01. Plastic Love - 竹内まりや",
            "02. Stay With Me - 松原みき",
            "03. 4AM - 大貫妙子",
            "04. Timely!! - 杏里"
        ]
    };

    useEffect(() => {
        if (isPlaying) {
            const timer = setInterval(() => {
                setTapePosition(prev => Math.min(100, prev + 0.5));
            }, 100);
            return () => clearInterval(timer);
        }
    }, [isPlaying]);

    return (
        <div className="bg-gradient-to-br from-purple-50/90 to-pink-50/90 border-3 border-purple-200 rounded-3xl p-6 shadow-2xl backdrop-blur-lg">
            <div className="text-center mb-6">
                <h3 className="text-xl font-light text-purple-700 mb-2">
                    📹 VHS Player ビデオ
                </h3>
                <div className="text-purple-500 text-sm">Panasonic NV-8950</div>
            </div>

            {/* VHS tape slot */}
            <div className="bg-gradient-to-br from-gray-800 to-black rounded-2xl p-4 mb-6 border-4 border-gray-600 shadow-inner">
                {/* Tape label */}
                <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg p-3 mb-3 border-2 border-purple-200">
                    <div className="text-center">
                        <div className="text-purple-800 font-bold text-lg">{tapeData.title}</div>
                        <div className="text-purple-600 text-sm">{tapeData.artist}</div>
                        <div className="text-purple-500 text-xs font-mono">{tapeData.year}</div>
                    </div>
                </div>

                {/* VHS mechanism */}
                <div className="flex justify-between items-center mb-3">
                    <div className="w-8 h-8 bg-gray-300 rounded border-2 border-gray-400">
                        <div
                            className="w-full h-full bg-gray-600 rounded animate-spin"
                            style={{ animationDuration: isPlaying ? '2s' : '0s' }}
                        />
                    </div>

                    <div className="flex-1 mx-4 h-1 bg-purple-800 rounded-full">
                        <div
                            className="h-full bg-gradient-to-r from-purple-400 to-pink-400 rounded-full transition-all duration-300"
                            style={{ width: `${tapePosition}%` }}
                        />
                    </div>

                    <div className="w-8 h-8 bg-gray-300 rounded border-2 border-gray-400">
                        <div
                            className="w-full h-full bg-gray-600 rounded animate-spin"
                            style={{ animationDuration: isPlaying ? '2s' : '0s' }}
                        />
                    </div>
                </div>
            </div>

            {/* VHS controls */}
            <div className="grid grid-cols-4 gap-2 mb-4">
                <DreamyButton variant="lavender" size="sm" onClick={() => setTapePosition(0)}>⏪</DreamyButton>
                <DreamyButton variant="coral" onClick={() => setIsPlaying(!isPlaying)}>
                    {isPlaying ? '⏸' : '▶️'}
                </DreamyButton>
                <DreamyButton variant="lavender" size="sm">⏩</DreamyButton>
                <DreamyButton variant="ghost" size="sm">⏹</DreamyButton>
            </div>

            {/* Track listing */}
            <div className="text-purple-600 font-mono text-xs space-y-1">
                {tapeData.tracks.map((track, i) => (
                    <div key={i} className="truncate opacity-80">
                        {track}
                    </div>
                ))}
            </div>
        </div>
    );
};

const DreamyWeatherWidget = () => {
    const [currentWeather, setCurrentWeather] = useState({
        temp: '24°C',
        condition: 'Clear Night',
        humidity: '65%',
        mood: 'Romantic'
    });

    return (
        <div className="bg-gradient-to-br from-cyan-50/80 to-blue-50/80 border-3 border-cyan-200 rounded-3xl p-6 shadow-xl backdrop-blur-lg">
            <div className="text-center mb-6">
                <h3 className="text-xl font-light text-cyan-700 mb-2">
                    🌙 Tonight 今夜
                </h3>
                <div className="text-cyan-500 text-sm">Weather & Atmosphere</div>
            </div>

            {/* Weather display */}
            <div className="text-center mb-6">
                <div className="text-6xl mb-3">🌃</div>
                <div className="text-3xl font-light text-cyan-800 mb-2">{currentWeather.temp}</div>
                <div className="text-cyan-600 text-lg font-light">{currentWeather.condition}</div>
                <div className="text-cyan-500 text-sm">湿度 {currentWeather.humidity}</div>
            </div>

            {/* Atmospheric mood */}
            <div className="bg-gradient-to-r from-cyan-100/70 to-purple-100/70 rounded-2xl p-4 border border-cyan-200">
                <div className="text-center">
                    <div className="text-purple-600 font-light text-lg mb-2">Mood 気分</div>
                    <div className="text-purple-800 font-medium">{currentWeather.mood}</div>
                    <div className="w-full bg-purple-200 rounded-full h-2 mt-3">
                        <div className="bg-gradient-to-r from-purple-400 to-pink-400 h-2 rounded-full w-4/5" />
                    </div>
                </div>
            </div>
        </div>
    );
};

const VintagePhoneDialer = () => {
    const [number, setNumber] = useState('');
    const [isDialing, setIsDialing] = useState(false);

    const dialPad = [
        ['1', '2 ABC', '3 DEF'],
        ['4 GHI', '5 JKL', '6 MNO'],
        ['7 PQRS', '8 TUV', '9 WXYZ'],
        ['*', '0', '#']
    ];

    const dialNumber = (digit) => {
        if (number.length < 12) {
            setNumber(prev => prev + digit);
        }
    };

    const makeCall = () => {
        if (number) {
            setIsDialing(true);
            setTimeout(() => setIsDialing(false), 3000);
        }
    };

    return (
        <div className="bg-gradient-to-br from-rose-50/90 to-pink-50/90 border-3 border-rose-200 rounded-3xl p-6 shadow-2xl backdrop-blur-lg">
            <div className="text-center mb-6">
                <h3 className="text-xl font-light text-rose-700 mb-2">
                    ☎️ 公衆電話 Public Phone
                </h3>
                <div className="text-rose-500 text-sm">Connect Your Heart</div>
            </div>

            {/* Phone display */}
            <div className="bg-black rounded-lg p-4 mb-6 border-2 border-rose-300">
                <div className="text-center">
                    <div className="text-green-400 font-mono text-2xl font-bold mb-2 h-8">
                        {isDialing ? 'CALLING...' : number || 'ENTER NUMBER'}
                    </div>
                    {isDialing && (
                        <div className="text-green-300 font-mono text-sm animate-pulse">
                            呼び出し中...
                        </div>
                    )}
                </div>
            </div>

            {/* Dial pad */}
            <div className="grid grid-cols-3 gap-3 mb-4">
                {dialPad.flat().map((button, index) => (
                    <DreamyButton
                        key={index}
                        variant="coral"
                        size="sm"
                        onClick={() => dialNumber(button.split(' ')[0])}
                        className="aspect-square flex flex-col items-center justify-center"
                    >
                        <div className="font-bold">{button.split(' ')[0]}</div>
                        {button.includes(' ') && (
                            <div className="text-xs opacity-70">{button.split(' ')[1]}</div>
                        )}
                    </DreamyButton>
                ))}
            </div>

            {/* Phone controls */}
            <div className="grid grid-cols-2 gap-3">
                <DreamyButton
                    variant="mint"
                    onClick={makeCall}
                    glowing={isDialing}
                >
                    📞 CALL
                </DreamyButton>
                <DreamyButton
                    variant="ghost"
                    onClick={() => setNumber('')}
                >
                    🔙 CLEAR
                </DreamyButton>
            </div>
        </div>
    );
};

const RetroTV = () => {
    const [channel, setChannel] = useState(3);
    const [volume, setVolume] = useState(8);
    const [isOn, setIsOn] = useState(true);

    const channels = [
        { num: 1, name: 'NHK 総合', program: 'ニュース', time: '23:45' },
        { num: 3, name: 'TBS', program: 'City Pop Special', time: '23:30' },
        { num: 6, name: 'TBS', program: '深夜映画', time: '24:00' },
        { num: 8, name: 'フジテレビ', program: 'Music Station', time: '23:50' },
        { num: 12, name: 'テレビ東京', program: 'アニメ', time: '24:30' }
    ];

    const currentChannel = channels.find(ch => ch.num === channel) || channels[1];

    return (
        <div className="bg-gradient-to-br from-indigo-50/90 to-purple-50/90 border-4 border-indigo-200 rounded-3xl p-6 shadow-2xl backdrop-blur-lg">
            <div className="text-center mb-6">
                <h3 className="text-xl font-light text-indigo-700 mb-2">
                    📺 SONY Trinitron
                </h3>
                <div className="text-indigo-500 text-sm">KV-27TS32 CRT Television</div>
            </div>

            {/* TV Screen */}
            <div className="relative">
                <div className="bg-black rounded-2xl p-4 mb-6 border-4 border-gray-700 aspect-video">
                    {isOn ? (
                        <div className="relative w-full h-full bg-gradient-to-br from-purple-900 via-pink-800 to-blue-900 rounded-lg overflow-hidden">
                            <VHSStatic />

                            {/* Channel content */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                                <div className="text-4xl mb-3">🎵</div>
                                <div className="text-lg font-bold mb-1">{currentChannel.program}</div>
                                <div className="text-sm opacity-80">{currentChannel.name}</div>
                            </div>

                            {/* Channel info overlay */}
                            <div className="absolute bottom-2 left-2 bg-black/70 rounded px-2 py-1">
                                <div className="text-green-400 font-mono text-sm">
                                    CH {currentChannel.num} • {currentChannel.time}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="w-full h-full bg-gray-900 rounded-lg flex items-center justify-center">
                            <div className="text-gray-600">📺</div>
                        </div>
                    )}
                </div>
            </div>

            {/* TV Controls */}
            <div className="grid grid-cols-4 gap-2 mb-4">
                <DreamyButton
                    variant="lavender"
                    size="sm"
                    onClick={() => setChannel(Math.max(1, channel - 1))}
                >
                    CH-
                </DreamyButton>
                <DreamyButton
                    variant="lavender"
                    size="sm"
                    onClick={() => setChannel(Math.min(12, channel + 1))}
                >
                    CH+
                </DreamyButton>
                <DreamyButton
                    variant="mint"
                    size="sm"
                    onClick={() => setVolume(Math.max(0, volume - 1))}
                >
                    VOL-
                </DreamyButton>
                <DreamyButton
                    variant="mint"
                    size="sm"
                    onClick={() => setVolume(Math.min(10, volume + 1))}
                >
                    VOL+
                </DreamyButton>
            </div>

            <div className="flex justify-center">
                <DreamyButton
                    variant={isOn ? 'coral' : 'ghost'}
                    onClick={() => setIsOn(!isOn)}
                    glowing={isOn}
                >
                    {isOn ? '📺 ON' : '⚫ OFF'}
                </DreamyButton>
            </div>

            {/* Volume display */}
            <div className="mt-4 text-center">
                <div className="text-indigo-600 text-sm font-mono">
                    CH {channel} • VOL {volume} • {currentChannel.name}
                </div>
            </div>
        </div>
    );
};

const DreamJournal = () => {
    const [entries, setEntries] = useState([
        { date: '1984.07.15', mood: '🌸', entry: 'Drove through Shibuya tonight...' },
        { date: '1984.08.22', mood: '💭', entry: 'The city lights looked like stars' },
        { date: '1984.09.03', mood: '💫', entry: 'Found an old cassette today' }
    ]);

    const [newEntry, setNewEntry] = useState('');
    const [currentMood, setCurrentMood] = useState('💝');

    const moods = ['💝', '🌸', '💭', '💫', '🌙', '✨', '🍑', '💌'];

    const addEntry = () => {
        if (newEntry.trim()) {
            const today = new Date().toLocaleDateString('ja-JP').replace(/\//g, '.');
            setEntries(prev => [{
                date: today,
                mood: currentMood,
                entry: newEntry
            }, ...prev.slice(0, 4)]);
            setNewEntry('');
        }
    };

    return (
        <div className="bg-gradient-to-br from-pink-50/90 to-rose-50/90 border-3 border-pink-200 rounded-3xl p-6 shadow-xl backdrop-blur-lg">
            <div className="text-center mb-6">
                <h3 className="text-xl font-light text-pink-700 mb-2">
                    📔 Dream Journal 夢日記
                </h3>
                <div className="text-pink-500 text-sm">Record Your Feelings</div>
            </div>

            {/* New entry */}
            <div className="mb-6">
                <div className="flex items-center space-x-2 mb-3">
                    <span className="text-pink-600 text-sm">Today's mood:</span>
                    <div className="flex space-x-1">
                        {moods.map(mood => (
                            <button
                                key={mood}
                                onClick={() => setCurrentMood(mood)}
                                className={`p-1 rounded-full transition-all ${
                                    currentMood === mood ? 'bg-pink-200 scale-110' : 'hover:bg-pink-100'
                                }`}
                            >
                                {mood}
                            </button>
                        ))}
                    </div>
                </div>

                <textarea
                    value={newEntry}
                    onChange={(e) => setNewEntry(e.target.value)}
                    placeholder="今日の気持ちを書いて... Write your feelings today..."
                    className="w-full h-24 p-3 bg-white/80 border-2 border-pink-200 rounded-2xl text-pink-800 placeholder-pink-300 font-light resize-none focus:outline-none focus:border-pink-300"
                    style={{
                        backdropFilter: 'blur(5px)',
                        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(254, 242, 242, 0.8))'
                    }}
                />

                <div className="text-right mt-2">
                    <DreamyButton variant="coral" size="sm" onClick={addEntry}>
                        💌 Save Memory
                    </DreamyButton>
                </div>
            </div>

            {/* Recent entries */}
            <div className="space-y-3 max-h-48 overflow-y-auto">
                {entries.map((entry, index) => (
                    <div key={index} className="bg-white/60 rounded-2xl p-3 border border-pink-200/80">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-pink-600 font-mono text-sm">{entry.date}</span>
                            <span className="text-xl">{entry.mood}</span>
                        </div>
                        <p className="text-pink-700 text-sm font-light italic">"{entry.entry}"</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

const EtherealInterface = () => {
    const [dreamLevel, setDreamLevel] = useState(85);
    const [loveIntensity, setLoveIntensity] = useState(92);
    const [nostalgia, setNostalgia] = useState(78);

    return (
        <div className="bg-gradient-to-br from-purple-50/80 to-pink-50/80 border-3 border-purple-200 rounded-3xl p-6 shadow-xl backdrop-blur-lg">
            <div className="text-center mb-6">
                <h3 className="text-xl font-light text-purple-700 mb-2">
                    💫 Ethereal Control エーテル
                </h3>
                <div className="text-purple-500 text-sm">Emotional Interface</div>
            </div>

            <div className="space-y-6">
                {/* Dream Level */}
                <div>
                    <div className="flex justify-between text-purple-600 text-sm font-light mb-2">
                        <span>Dream Level 夢レベル</span>
                        <span>{dreamLevel}%</span>
                    </div>
                    <div className="relative h-4 bg-purple-100 rounded-full border border-purple-200 overflow-hidden">
                        <div
                            className="absolute inset-y-0 left-0 bg-gradient-to-r from-purple-300 via-pink-300 to-purple-400 rounded-full transition-all duration-1000"
                            style={{
                                width: `${dreamLevel}%`,
                                boxShadow: '0 0 20px rgba(168, 85, 247, 0.4)'
                            }}
                        />
                        {/* Floating sparkles */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent w-8 rounded-full animate-pulse" />
                    </div>
                </div>

                {/* Love Intensity */}
                <div>
                    <div className="flex justify-between text-rose-600 text-sm font-light mb-2">
                        <span>Love Intensity 愛の強さ</span>
                        <span>{loveIntensity}%</span>
                    </div>
                    <div className="relative h-4 bg-rose-100 rounded-full border border-rose-200 overflow-hidden">
                        <div
                            className="absolute inset-y-0 left-0 bg-gradient-to-r from-rose-300 via-pink-300 to-red-300 rounded-full transition-all duration-1000"
                            style={{
                                width: `${loveIntensity}%`,
                                boxShadow: '0 0 20px rgba(244, 63, 94, 0.4)'
                            }}
                        />
                    </div>
                </div>

                {/* Nostalgia */}
                <div>
                    <div className="flex justify-between text-amber-600 text-sm font-light mb-2">
                        <span>Nostalgia 懐かしさ</span>
                        <span>{nostalgia}%</span>
                    </div>
                    <div className="relative h-4 bg-amber-100 rounded-full border border-amber-200 overflow-hidden">
                        <div
                            className="absolute inset-y-0 left-0 bg-gradient-to-r from-amber-300 via-orange-300 to-yellow-300 rounded-full transition-all duration-1000"
                            style={{
                                width: `${nostalgia}%`,
                                boxShadow: '0 0 20px rgba(245, 158, 11, 0.4)'
                            }}
                        />
                    </div>
                </div>
            </div>

            {/* Emotional state */}
            <div className="mt-6 text-center">
                <div className="text-4xl mb-2">💖</div>
                <div className="text-purple-700 font-light">Current State: Dreaming</div>
                <div className="text-purple-500 text-sm">現在の状態：夢見がち</div>
            </div>
        </div>
    );
};

const PolaroidAlbum = () => {
    const [photos, setPhotos] = useState([
        { id: 1, image: '🌅', caption: 'Summer \'84', date: '84.07.15', location: 'Odaiba Beach' },
        { id: 2, image: '🚗', caption: 'Night Drive', date: '84.08.22', location: 'Shuto Expressway' },
        { id: 3, image: '🌸', caption: 'Cherry Blossoms', date: '84.04.03', location: 'Ueno Park' },
        { id: 4, image: '🎵', caption: 'Record Shopping', date: '84.09.12', location: 'Shibuya' },
        { id: 5, image: '☕', caption: 'Morning Coffee', date: '84.06.28', location: 'Café de Flore' },
        { id: 6, image: '🌙', caption: 'Moonlight', date: '84.10.31', location: 'Tokyo Bay' }
    ]);

    const [selectedPhoto, setSelectedPhoto] = useState(photos[0]);

    return (
        <div className="bg-gradient-to-br from-yellow-50/90 to-pink-50/90 border-3 border-yellow-200 rounded-3xl p-6 shadow-2xl backdrop-blur-lg">
            <div className="text-center mb-6">
                <h3 className="text-xl font-light text-yellow-700 mb-2">
                    📸 Polaroid Album ポラロイド
                </h3>
                <div className="text-yellow-500 text-sm">Instant Memories</div>
            </div>

            {/* Selected photo display */}
            <div className="mb-6">
                <div className="bg-white p-4 rounded-lg shadow-lg transform rotate-2 hover:rotate-0 transition-transform duration-500 border border-gray-200">
                    <div className="text-6xl text-center mb-3">{selectedPhoto.image}</div>
                    <div className="text-center">
                        <div className="text-gray-700 font-medium mb-1">{selectedPhoto.caption}</div>
                        <div className="text-gray-500 text-sm font-mono">{selectedPhoto.date}</div>
                        <div className="text-gray-400 text-xs">{selectedPhoto.location}</div>
                    </div>
                </div>
            </div>

            {/* Photo strip */}
            <div className="grid grid-cols-3 gap-2 mb-4">
                {photos.slice(0, 6).map(photo => (
                    <div
                        key={photo.id}
                        onClick={() => setSelectedPhoto(photo)}
                        className={`bg-white p-2 rounded shadow cursor-pointer transform transition-all duration-300 border ${
                            selectedPhoto.id === photo.id
                                ? 'scale-110 border-yellow-400 shadow-lg'
                                : 'hover:scale-105 border-gray-200'
                        }`}
                    >
                        <div className="text-2xl text-center">{photo.image}</div>
                        <div className="text-xs text-gray-600 text-center mt-1 truncate">{photo.caption}</div>
                    </div>
                ))}
            </div>

            <div className="text-center text-yellow-600 text-sm font-mono">
                Collection: {photos.length} memories<br/>
                思い出のコレクション
            </div>
        </div>
    );
};

const DatingSim = () => {
    const [currentScene, setCurrentScene] = useState(0);
    const [affection, setAffection] = useState(50);
    const [choice, setChoice] = useState(null);

    const scenes = [
        {
            text: "You're driving through Shibuya at midnight. The radio plays your favorite song.",
            character: "💕",
            choices: [
                { text: "Turn up the volume", effect: 5, japanese: "音量を上げる" },
                { text: "Sing along softly", effect: 10, japanese: "そっと歌う" }
            ]
        },
        {
            text: "She looks at you from the passenger seat, city lights reflecting in her eyes.",
            character: "😊",
            choices: [
                { text: "Smile back gently", effect: 8, japanese: "優しく微笑み返す" },
                { text: "Focus on the road", effect: 3, japanese: "道路に集中する" }
            ]
        },
        {
            text: "The cassette tape clicks as it reaches the end. Silence fills the car.",
            character: "🤔",
            choices: [
                { text: "Put in another tape", effect: 5, japanese: "別のテープを入れる" },
                { text: "Enjoy the silence", effect: 7, japanese: "静寂を楽しむ" }
            ]
        }
    ];

    const currentSceneData = scenes[currentScene];

    const makeChoice = (choiceIndex) => {
        const selectedChoice = currentSceneData.choices[choiceIndex];
        setAffection(prev => Math.min(100, prev + selectedChoice.effect));
        setChoice(choiceIndex);

        setTimeout(() => {
            setCurrentScene(prev => (prev + 1) % scenes.length);
            setChoice(null);
        }, 2000);
    };

    return (
        <div className="bg-gradient-to-br from-rose-50/90 to-purple-50/90 border-3 border-rose-200 rounded-3xl p-6 shadow-2xl backdrop-blur-lg">
            <div className="text-center mb-6">
                <h3 className="text-xl font-light text-rose-700 mb-2">
                    💝 Love Story 恋愛物語
                </h3>
                <div className="text-rose-500 text-sm">Interactive Romance</div>
            </div>

            {/* Affection meter */}
            <div className="mb-6">
                <div className="flex justify-between text-rose-600 text-sm font-light mb-2">
                    <span>Affection Level 好感度</span>
                    <span>{affection}%</span>
                </div>
                <div className="relative h-3 bg-rose-100 rounded-full border border-rose-200 overflow-hidden">
                    <div
                        className="absolute inset-y-0 left-0 bg-gradient-to-r from-rose-300 via-pink-400 to-purple-400 rounded-full transition-all duration-1000"
                        style={{
                            width: `${affection}%`,
                            boxShadow: '0 0 15px rgba(244, 63, 94, 0.4)'
                        }}
                    />
                </div>
            </div>

            {/* Scene display */}
            <div className="bg-black/80 rounded-2xl p-4 mb-6 border-2 border-purple-300 min-h-32">
                <div className="text-center mb-4">
                    <div className="text-4xl mb-2">{currentSceneData.character}</div>
                </div>
                <p className="text-pink-200 text-sm leading-relaxed font-light">
                    {currentSceneData.text}
                </p>
            </div>

            {/* Choices */}
            <div className="space-y-3">
                {currentSceneData.choices.map((choiceOption, index) => (
                    <DreamyButton
                        key={index}
                        variant={choice === index ? "coral" : "lavender"}
                        onClick={() => makeChoice(index)}
                        className="w-full text-left justify-start"
                        glowing={choice === index}
                    >
                        <div>
                            <div>{choiceOption.text}</div>
                            <div className="text-xs opacity-70">{choiceOption.japanese}</div>
                        </div>
                    </DreamyButton>
                ))}
            </div>

            <div className="text-center mt-4 text-rose-500 text-xs">
                Scene {currentScene + 1} / {scenes.length}
            </div>
        </div>
    );
};

const CityPopLyrics = () => {
    const [currentVerse, setCurrentVerse] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    const lyrics = [
        {
            english: "Plastic love, it's just a plastic love",
            japanese: "プラスチック・ラブ、ただのプラスチック・ラブ",
            timestamp: "0:32"
        },
        {
            english: "I can't help but feel this way about you",
            japanese: "あなたにこんな気持ちになってしまう",
            timestamp: "1:15"
        },
        {
            english: "Even if it's not real, I don't mind",
            japanese: "たとえそれが本物じゃなくても構わない",
            timestamp: "2:03"
        },
        {
            english: "Dancing through the night in neon lights",
            japanese: "ネオンライトの中で夜通し踊る",
            timestamp: "2:45"
        }
    ];

    useEffect(() => {
        if (isPlaying) {
            const timer = setInterval(() => {
                setCurrentVerse(prev => (prev + 1) % lyrics.length);
            }, 4000);
            return () => clearInterval(timer);
        }
    }, [isPlaying]);

    return (
        <div className="bg-gradient-to-br from-cyan-50/90 to-teal-50/90 border-3 border-cyan-200 rounded-3xl p-6 shadow-xl backdrop-blur-lg">
            <div className="text-center mb-6">
                <h3 className="text-xl font-light text-cyan-700 mb-2">
                    🎤 Karaoke Machine カラオケ
                </h3>
                <div className="text-cyan-500 text-sm">Sing Your Heart Out</div>
            </div>

            {/* Karaoke display */}
            <div className="bg-black rounded-2xl p-4 mb-6 border-2 border-cyan-300 min-h-32">
                <div className="text-center mb-3">
                    <div className="text-cyan-400 font-mono text-sm mb-1">
                        NOW PLAYING: {lyrics[currentVerse].timestamp}
                    </div>
                </div>

                <div className="text-center">
                    <div className="text-cyan-200 text-lg font-light mb-2 leading-relaxed">
                        {lyrics[currentVerse].english}
                    </div>
                    <div className="text-pink-300 text-base font-light">
                        {lyrics[currentVerse].japanese}
                    </div>
                </div>
            </div>

            {/* Karaoke controls */}
            <div className="grid grid-cols-3 gap-3 mb-4">
                <DreamyButton
                    variant="mint"
                    size="sm"
                    onClick={() => setCurrentVerse(Math.max(0, currentVerse - 1))}
                >
                    ⏮ PREV
                </DreamyButton>

                <DreamyButton
                    variant="coral"
                    onClick={() => setIsPlaying(!isPlaying)}
                    glowing={isPlaying}
                >
                    {isPlaying ? '⏸ PAUSE' : '🎤 SING'}
                </DreamyButton>

                <DreamyButton
                    variant="mint"
                    size="sm"
                    onClick={() => setCurrentVerse(Math.min(lyrics.length - 1, currentVerse + 1))}
                >
                    NEXT ⏭
                </DreamyButton>
            </div>

            <div className="text-center text-cyan-600 text-sm font-mono">
                Verse {currentVerse + 1} / {lyrics.length}<br/>
                歌詞 - 竹内まりや
            </div>
        </div>
    );
};

const NightDrivingGame = () => {
    const [speed, setSpeed] = useState(80);
    const [distance, setDistance] = useState(0);
    const [isDriving, setIsDriving] = useState(false);
    const [roadPosition, setRoadPosition] = useState(0);

    useEffect(() => {
        if (isDriving) {
            const timer = setInterval(() => {
                setDistance(prev => prev + speed / 10);
                setRoadPosition(prev => (prev + 1) % 100);
                setSpeed(prev => 70 + Math.sin(Date.now() / 1000) * 20);
            }, 100);
            return () => clearInterval(timer);
        }
    }, [isDriving]);

    return (
        <div className="bg-gradient-to-br from-indigo-50/90 to-purple-50/90 border-3 border-indigo-200 rounded-3xl p-6 shadow-2xl backdrop-blur-lg">
            <div className="text-center mb-6">
                <h3 className="text-xl font-light text-indigo-700 mb-2">
                    🛣️ Midnight Drive 深夜ドライブ
                </h3>
                <div className="text-indigo-500 text-sm">Highway Simulator</div>
            </div>

            {/* Driving view */}
            <div className="relative bg-gradient-to-t from-purple-900 via-indigo-800 to-pink-700 rounded-2xl h-32 mb-6 border-2 border-indigo-300 overflow-hidden">
                {/* Road */}
                <div className="absolute bottom-0 left-1/2 w-24 h-full bg-gradient-to-t from-gray-600 to-transparent transform -translate-x-1/2 -skew-y-12" />

                {/* Road lines */}
                {Array.from({ length: 8 }, (_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-4 bg-yellow-300 left-1/2 transform -translate-x-1/2"
                        style={{
                            bottom: `${i * 16 + (roadPosition % 16)}px`,
                            opacity: Math.max(0.3, 1 - (i * 0.1))
                        }}
                    />
                ))}

                {/* Car */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-2xl">
                    🚗
                </div>

                {/* City skyline */}
                <div className="absolute top-4 left-0 right-0 flex justify-center space-x-2 opacity-60">
                    {Array.from({ length: 12 }, (_, i) => (
                        <div
                            key={i}
                            className="w-2 bg-yellow-200 opacity-40"
                            style={{ height: `${Math.random() * 20 + 10}px` }}
                        />
                    ))}
                </div>
            </div>

            {/* Dashboard */}
            <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center">
                    <div className="text-indigo-600 text-sm mb-1">Speed 速度</div>
                    <div className="text-2xl font-bold text-indigo-800">{Math.floor(speed)}</div>
                    <div className="text-indigo-500 text-xs">km/h</div>
                </div>
                <div className="text-center">
                    <div className="text-purple-600 text-sm mb-1">Distance 距離</div>
                    <div className="text-2xl font-bold text-purple-800">{Math.floor(distance)}</div>
                    <div className="text-purple-500 text-xs">km</div>
                </div>
            </div>

            <div className="flex justify-center">
                <DreamyButton
                    variant={isDriving ? "coral" : "mint"}
                    onClick={() => setIsDriving(!isDriving)}
                    glowing={isDriving}
                >
                    {isDriving ? '🛑 STOP DRIVING' : '🚗 START DRIVE'}
                </DreamyButton>
            </div>
        </div>
    );
};

const LoveLetterWriter = () => {
    const [letterText, setLetterText] = useState('');
    const [recipient, setRecipient] = useState('');
    const [letterStyle, setLetterStyle] = useState('romantic');
    const [savedLetters, setSavedLetters] = useState([
        { to: 'あなたへ', preview: 'Tonight I drove past our special place...', date: '84.08.15' },
        { to: 'My Darling', preview: 'The cassette you made still plays...', date: '84.09.22' }
    ]);

    const letterStyles = {
        romantic: { bg: 'from-rose-50 to-pink-50', text: 'rose-700', border: 'rose-200' },
        nostalgic: { bg: 'from-amber-50 to-yellow-50', text: 'amber-700', border: 'amber-200' },
        dreamy: { bg: 'from-purple-50 to-indigo-50', text: 'purple-700', border: 'purple-200' }
    };

    const style = letterStyles[letterStyle];

    const saveLetter = () => {
        if (letterText && recipient) {
            const newLetter = {
                to: recipient,
                preview: letterText.slice(0, 40) + '...',
                date: new Date().toLocaleDateString('ja-JP').replace(/\//g, '.')
            };
            setSavedLetters(prev => [newLetter, ...prev.slice(0, 4)]);
            setLetterText('');
            setRecipient('');
        }
    };

    return (
        <div className={`bg-gradient-to-br ${style.bg}/90 border-3 border-${style.border} rounded-3xl p-6 shadow-2xl backdrop-blur-lg`}>
            <div className="text-center mb-6">
                <h3 className={`text-xl font-light text-${style.text} mb-2`}>
                    💌 Love Letter 恋文
                </h3>
                <div className={`text-${style.text}/70 text-sm`}>Write Your Heart</div>
            </div>

            {/* Letter paper */}
            <div className="bg-white/90 rounded-2xl p-4 mb-6 border-2 border-pink-200/50 shadow-inner">
                <input
                    type="text"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    placeholder="To: あなたへ..."
                    className={`w-full p-2 bg-transparent border-b border-${style.border} text-${style.text} placeholder-${style.text}/50 font-light focus:outline-none mb-4`}
                />

                <textarea
                    value={letterText}
                    onChange={(e) => setLetterText(e.target.value)}
                    placeholder="Dear, あなた...\n\nTonight as I drive through the neon-lit streets of Tokyo, I can't help but think of you..."
                    className={`w-full h-32 p-3 bg-transparent text-${style.text} placeholder-${style.text}/40 font-light resize-none focus:outline-none leading-relaxed`}
                    style={{ fontFamily: 'serif' }}
                />

                <div className="text-right">
                    <div className={`text-${style.text}/60 text-sm font-light`}>
                        With love, 愛を込めて<br/>
                        Your heart 君の心
                    </div>
                </div>
            </div>

            {/* Letter style selector */}
            <div className="flex justify-center space-x-2 mb-4">
                {Object.keys(letterStyles).map(styleKey => (
                    <button
                        key={styleKey}
                        onClick={() => setLetterStyle(styleKey)}
                        className={`px-3 py-1 rounded-full text-xs transition-all ${
                            letterStyle === styleKey
                                ? `bg-${letterStyles[styleKey].border} text-${letterStyles[styleKey].text}`
                                : 'text-gray-500 hover:text-gray-700'
                        }`}
                    >
                        {styleKey}
                    </button>
                ))}
            </div>

            <div className="flex justify-center mb-4">
                <DreamyButton variant="coral" onClick={saveLetter}>
                    💌 Send Letter
                </DreamyButton>
            </div>

            {/* Saved letters */}
            <div className="space-y-2 max-h-24 overflow-y-auto">
                {savedLetters.slice(0, 3).map((letter, index) => (
                    <div key={index} className="bg-white/70 rounded-lg p-2 border border-pink-200/50">
                        <div className="flex justify-between text-xs">
                            <span className={`text-${style.text} font-medium`}>{letter.to}</span>
                            <span className={`text-${style.text}/60`}>{letter.date}</span>
                        </div>
                        <p className={`text-${style.text}/80 text-xs mt-1 truncate`}>{letter.preview}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

const RetroComputer = () => {
    const [bootSequence, setBootSequence] = useState(0);
    const [commands, setCommands] = useState([]);
    const [input, setInput] = useState('');

    const bootMessages = [
        'CITY POP OS v1.984 Loading...',
        'Initializing romantic protocols...',
        'Loading vinyl.dll... OK',
        'Connecting to 1980s network...',
        'Ready for nostalgic computing!'
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setBootSequence(prev => Math.min(bootMessages.length - 1, prev + 1));
        }, 1500);
        return () => clearInterval(timer);
    }, []);

    const executeCommand = (cmd) => {
        const responses = {
            'love': 'Love levels: Maximum 💝',
            'nostalgia': 'Nostalgia.exe is running... 懐かしい',
            'music': 'Now playing: Plastic Love 🎵',
            'tokyo': 'Location: Shibuya crossing 渋谷',
            'help': 'Try: love, nostalgia, music, tokyo, clear'
        };

        const response = responses[cmd.toLowerCase()] || `'${cmd}' - Command not found. Try 'help'`;
        setCommands(prev => [...prev, { input: cmd, output: response }]);
    };

    return (
        <div className="bg-gradient-to-br from-green-50/90 to-emerald-50/90 border-3 border-green-200 rounded-3xl p-6 shadow-2xl backdrop-blur-lg">
            <div className="text-center mb-6">
                <h3 className="text-xl font-light text-green-700 mb-2">
                    💻 PC-98 Computer
                </h3>
                <div className="text-green-500 text-sm">Nostalgic Computing</div>
            </div>

            {/* Computer screen */}
            <div className="bg-black rounded-2xl p-4 border-2 border-green-400 shadow-inner">
                <div className="text-green-400 font-mono text-sm h-48 overflow-y-auto">
                    {/* Boot sequence */}
                    {bootSequence < bootMessages.length && (
                        <div className="mb-4">
                            {bootMessages.slice(0, bootSequence + 1).map((msg, i) => (
                                <div key={i} className="mb-1">{msg}</div>
                            ))}
                            <span className="animate-pulse">█</span>
                        </div>
                    )}

                    {/* Command history */}
                    {bootSequence >= bootMessages.length && (
                        <div className="space-y-1">
                            {commands.map((cmd, i) => (
                                <div key={i}>
                                    <div className="text-green-400"> C:\CITYPOP {cmd.input}</div>
                                    <div className="text-cyan-300 ml-4"> {cmd.output}</div>
                                </div>
                            ))}
                            <div className="flex items-center">
                                <span className="text-green-400">C:\CITYPOP </span>
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' && input.trim()) {
                                            executeCommand(input);
                                            setInput('');
                                        }
                                    }}
                                    className="bg-transparent text-green-400 font-mono text-sm outline-none flex-1 ml-1"
                                    autoFocus={bootSequence >= bootMessages.length}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const CityPopJukebox = () => {
    const [selectedSong, setSelectedSong] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [credits, setCredits] = useState(500);

    const songs = [
        { title: "Plastic Love", artist: "竹内まりや", year: "1984", cost: 100 },
        { title: "Stay With Me", artist: "松原みき", year: "1979", cost: 100 },
        { title: "4AM", artist: "大貫妙子", year: "1983", cost: 100 },
        { title: "Timely!!", artist: "杏里", year: "1983", cost: 100 },
        { title: "Mayonaka no Door", artist: "松原みき", year: "1979", cost: 150 }
    ];

    const playSong = () => {
        if (credits >= songs[selectedSong].cost) {
            setCredits(prev => prev - songs[selectedSong].cost);
            setIsPlaying(true);
            setTimeout(() => setIsPlaying(false), 5000);
        }
    };

    return (
        <div className="bg-gradient-to-br from-orange-50/90 to-red-50/90 border-3 border-orange-200 rounded-3xl p-6 shadow-2xl backdrop-blur-lg">
            <div className="text-center mb-6">
                <h3 className="text-xl font-light text-orange-700 mb-2">
                    🎰 Jukebox ジュークボックス
                </h3>
                <div className="text-orange-500 text-sm">City Pop Collection</div>
                <div className="text-orange-600 font-mono text-xs mt-1">
                    Credits: ¥{credits}
                </div>
            </div>

            {/* Song selection */}
            <div className="space-y-2 mb-6 max-h-40 overflow-y-auto">
                {songs.map((song, index) => (
                    <div
                        key={index}
                        onClick={() => setSelectedSong(index)}
                        className={`p-3 rounded-xl cursor-pointer transition-all duration-300 border-2 ${
                            selectedSong === index
                                ? 'bg-orange-200/80 border-orange-300'
                                : 'bg-white/60 border-orange-200/50 hover:bg-orange-100/70'
                        }`}
                    >
                        <div className="flex justify-between items-center">
                            <div>
                                <div className="text-orange-800 font-medium text-sm">{song.title}</div>
                                <div className="text-orange-600 text-xs">{song.artist} • {song.year}</div>
                            </div>
                            <div className="text-orange-700 font-mono text-sm">¥{song.cost}</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Jukebox controls */}
            <div className="grid grid-cols-2 gap-3">
                <DreamyButton
                    variant="peach"
                    onClick={playSong}
                    glowing={isPlaying}
                >
                    {isPlaying ? '🎵 PLAYING' : '▶️ PLAY SONG'}
                </DreamyButton>
                <DreamyButton
                    variant="ghost"
                    onClick={() => setCredits(prev => prev + 200)}
                >
                    💰 ADD COINS
                </DreamyButton>
            </div>

            {isPlaying && (
                <div className="text-center mt-4 text-orange-600 font-mono text-sm animate-pulse">
                    ♪ Now Playing: {songs[selectedSong].title} ♪
                </div>
            )}
        </div>
    );
};

const Widget4Page = () => {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [currentTab, setCurrentTab] = useState('main');

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const tabs = [
        { id: 'main', label: 'メイン Main', icon: '🏠' },
        { id: 'entertainment', label: 'エンタメ Fun', icon: '🎮' },
        { id: 'memories', label: '思い出 Memory', icon: '📸' },
        { id: 'romance', label: '恋愛 Love', icon: '💕' }
    ];

    return (
        <div className="min-h-screen relative overflow-hidden">
            {/* Dreamy pastel background */}
            <div className="fixed inset-0">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-100 via-pink-50 via-orange-50 to-yellow-100" />

                {/* VHS tape overlay effect */}
                <div
                    className="absolute inset-0 opacity-20"
                    style={{
                        backgroundImage: `
              repeating-linear-gradient(
                0deg,
                transparent 0px,
                rgba(139, 69, 19, 0.03) 1px,
                rgba(139, 69, 19, 0.03) 2px,
                transparent 3px,
                transparent 6px
              )
            `,
                        animation: 'vhsLines 20s linear infinite'
                    }}
                />

                {/* Dreamy floating elements */}
                <div className="absolute top-32 left-20 w-64 h-64 bg-pink-200 rounded-full opacity-20 blur-3xl animate-pulse" />
                <div className="absolute top-64 right-32 w-48 h-48 bg-purple-200 rounded-full opacity-25 blur-3xl animate-pulse" />
                <div className="absolute bottom-32 left-1/2 w-80 h-80 bg-coral-200 rounded-full opacity-15 blur-3xl animate-pulse" />
            </div>

            {/* Custom VHS animations */}
            <style jsx>{`
        @keyframes vhsStatic {
          0% { transform: translateX(0); }
          100% { transform: translateX(4px); }
        }
        @keyframes vhsLines {
          0% { transform: translateY(0); }
          100% { transform: translateY(6px); }
        }
        @keyframes dreamFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.7; }
          50% { transform: translateY(-20px) rotate(5deg); opacity: 1; }
        }
        @keyframes softGlow {
          0%, 100% { filter: brightness(1) saturate(1); }
          50% { filter: brightness(1.1) saturate(1.2); }
        }
        body {
          animation: softGlow 8s ease-in-out infinite;
        }
      `}</style>

            {/* Tab Navigation */}
            <nav className="sticky top-0 z-30 bg-gradient-to-r from-white/70 to-pink-50/70 backdrop-blur-lg border-b border-pink-200/50">
                <div className="container mx-auto px-6 py-4">
                    <div className="flex justify-center space-x-4">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setCurrentTab(tab.id)}
                                className={`px-6 py-3 rounded-full font-light transition-all duration-500 flex items-center space-x-2 ${
                                    currentTab === tab.id
                                        ? 'bg-gradient-to-r from-pink-200 to-purple-200 text-purple-700 shadow-lg'
                                        : 'text-purple-500 hover:text-purple-400 hover:bg-purple-100/30'
                                }`}
                            >
                                <span className="text-lg">{tab.icon}</span>
                                <span>{tab.label}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </nav>

            <div className="relative z-10 p-8">
                {/* Dreamy header */}
                <div className="text-center mb-12">
                    <div className="mb-6">
                        <h1 className="text-7xl font-light text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-coral-400 mb-4" style={{
                            fontFamily: 'serif',
                            filter: 'saturate(0.8) brightness(1.1)',
                            textShadow: '0 0 30px rgba(219, 39, 119, 0.1)'
                        }}>
                            夢の世界
                        </h1>
                        <div className="text-2xl font-light text-rose-400 mb-2">VHS Dream Interface</div>
                        <div className="text-rose-500/80 font-mono text-sm">
                            {currentTime.toLocaleTimeString('ja-JP')} • Tokyo Midnight
                        </div>
                    </div>

                    <div className="w-32 h-px bg-gradient-to-r from-transparent via-pink-300 to-transparent mx-auto" />
                </div>

                {/* Tab content */}
                <div className="max-w-7xl mx-auto">
                    {currentTab === 'main' && (
                        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
                            <VHSTapePlayer />
                            <RetroTV />
                            <VintagePhoneDialer />
                            <DreamyWeatherWidget />
                            <EtherealInterface />
                            <RetroComputer />
                        </div>
                    )}

                    {currentTab === 'entertainment' && (
                        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
                            <CityPopJukebox />
                            <NightDrivingGame />
                            <CityPopLyrics />
                        </div>
                    )}

                    {currentTab === 'memories' && (
                        <div className="grid lg:grid-cols-2 gap-8">
                            <PolaroidAlbum />
                            <DreamJournal />
                        </div>
                    )}

                    {currentTab === 'romance' && (
                        <div className="grid lg:grid-cols-2 gap-8">
                            <DatingSim />
                            <LoveLetterWriter />
                        </div>
                    )}

                    {/* Central ethereal message */}
                    <div className="mt-12">
                        <VHSCard
                            title="深夜の想い Midnight Thoughts"
                            subtitle="VHS Memory Bank"
                            tapeEffect={true}
                            className="text-center"
                        >
                            <div className="space-y-6">
                                <div className="text-4xl">🌙</div>

                                <blockquote className="text-lg font-light text-gray-600 italic leading-relaxed">
                                    "The neon lights blur past my window as I drive through empty streets,
                                    your voice echoing from the cassette player like a gentle ghost of summer..."
                                </blockquote>

                                <div className="text-sm text-gray-500 font-mono">
                                    ネオンライトが窓を通り過ぎ、空っぽの街を運転していると、
                                    あなたの声がカセットプレーヤーから夏の優しい亡霊のように響いてくる...
                                </div>

                                <div className="grid grid-cols-3 gap-4 mt-8">
                                    <DreamyButton variant="mint" size="sm">🎵 Play</DreamyButton>
                                    <DreamyButton variant="lavender" size="sm">💫 Dream</DreamyButton>
                                    <DreamyButton variant="peach" size="sm">💌 Love</DreamyButton>
                                </div>
                            </div>
                        </VHSCard>
                    </div>

                    {/* Bottom navigation */}
                    <div className="text-center mt-16 py-8">
                        <p className="text-rose-400/80 font-light text-lg mb-6">
                            "プラスチックな愛でも構わない"<br/>
                            <span className="text-sm opacity-70">"Even if it's plastic love, I don't mind"</span>
                        </p>

                        <div className="flex justify-center space-x-6">
                            <DreamyButton variant="coral">💝 Memories</DreamyButton>
                            <DreamyButton variant="mint">🌙 Dreams</DreamyButton>
                            <DreamyButton variant="lavender">✨ Magic</DreamyButton>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Widget4Page;