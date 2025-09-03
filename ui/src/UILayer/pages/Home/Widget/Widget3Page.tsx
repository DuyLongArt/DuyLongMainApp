import React, { useState, useEffect } from 'react';

const PhosphorScanlines = () => (
    <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
            background: `
        repeating-linear-gradient(
          0deg,
          transparent 0px,
          rgba(0, 255, 0, 0.02) 1px,
          transparent 2px
        )
      `,
            animation: 'phosphorScan 2s linear infinite'
        }}
    />
);

const TerminalButton = ({ children, variant = 'green', size = 'md', onClick, className = '', active = false }) => {
    const [isPressed, setIsPressed] = useState(false);

    const variants = {
        green: 'bg-green-900 border-green-400 text-green-300 hover:bg-green-800',
        amber: 'bg-yellow-900 border-yellow-400 text-yellow-300 hover:bg-yellow-800',
        lime: 'bg-lime-900 border-lime-400 text-lime-300 hover:bg-lime-800',
        outline: 'bg-transparent border-green-400 text-green-400 hover:bg-green-400 hover:text-black'
    };

    const sizes = {
        sm: 'px-3 py-1 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-6 py-3 text-lg'
    };

    return (
        <button
            onClick={onClick}
            onMouseDown={() => setIsPressed(true)}
            onMouseUp={() => setIsPressed(false)}
            onMouseLeave={() => setIsPressed(false)}
            className={`
        ${variants[variant]}
        ${sizes[size]}
        ${className}
        font-mono font-bold border-2 transition-all duration-200
        ${isPressed || active ? 'transform translate-y-1 shadow-inner' : 'shadow-lg hover:shadow-green-400/50'}
        ${active ? 'shadow-inner bg-opacity-80' : ''}
      `}
            style={{
                textShadow: '0 0 10px currentColor',
                boxShadow: active || isPressed
                    ? 'inset 0 2px 8px rgba(0, 0, 0, 0.5)'
                    : `0 0 20px ${variant === 'green' ? 'rgba(34, 197, 94, 0.4)' : 'rgba(234, 179, 8, 0.4)'}`,
            }}
        >
            {children}
        </button>
    );
};

const MonitorCard = ({ title, subtitle, children, className = '', glowing = false }) => {
    return (
        <div
            className={`
        relative bg-black border-4 rounded-lg transition-all duration-300
        ${glowing ? 'border-green-400' : 'border-green-600 hover:border-green-400'}
        ${className}
        shadow-2xl
      `}
            style={{
                boxShadow: glowing
                    ? '0 0 30px rgba(34, 197, 94, 0.6), inset 0 0 30px rgba(0, 255, 0, 0.1)'
                    : '0 0 20px rgba(34, 197, 94, 0.3)',
                background: 'radial-gradient(ellipse at center, #001100, #000000)'
            }}
        >
            <PhosphorScanlines />

            <div className="relative z-10 p-6">
                {title && (
                    <div className="text-green-400 font-mono text-lg font-bold mb-2 text-center" style={{ textShadow: '0 0 10px #22c55e' }}>
                        &gt; {title} &lt;
                    </div>
                )}
                {subtitle && (
                    <div className="text-yellow-400 font-mono text-sm mb-4 text-center opacity-90" style={{ textShadow: '0 0 8px #eab308' }}>
                        {subtitle}
                    </div>
                )}
                <div className="text-green-300">
                    {children}
                </div>
            </div>
        </div>
    );
};

const ClassicComputer = () => {
    const [bootStep, setBootStep] = useState(0);
    const [command, setCommand] = useState('');
    const [output, setOutput] = useState([]);

    const bootSequence = [
        'Apple ][ System Boot',
        'Loading DOS 3.3...',
        'Checking memory... 64K OK',
        'Initializing disk drives...',
        'Loading CITYPOP.SYSTEM',
        'Ready for romantic computing!'
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setBootStep(prev => Math.min(bootSequence.length - 1, prev + 1));
        }, 1200);
        return () => clearInterval(timer);
    }, []);

    const executeCommand = (cmd) => {
        const responses = {
            'list': `HELLO          BAS   2048   LOVE.TXT       TXT   1024
MUSIC          DIR   <DIR>   PHOTOS.DIR     DIR   <DIR>
CITYPOP        BAS   4096   FEELINGS.DOC   DOC   2048`,
            'run hello': 'Hello! Welcome to City Pop Computing! こんにちは！',
            'type love.txt': 'あなたへの愛は、このコンピュータのメモリのように永遠です...',
            'load music': 'Loading: Plastic Love - Mariya Takeuchi ♪',
            'help': 'Commands: LIST, RUN, TYPE, LOAD, SAVE, DIR, CATALOG'
        };

        const response = responses[cmd.toLowerCase()] || `Syntax Error: ${cmd}`;
        setOutput(prev => [...prev.slice(-8), `]${cmd}`, response]);
    };

    return (
        <MonitorCard title="APPLE ][ COMPUTER" subtitle="Vintage Computing Experience" glowing={bootStep >= bootSequence.length - 1}>
            <div className="font-mono text-sm">
                {/* Boot sequence */}
                <div className="mb-4 min-h-32">
                    {bootStep < bootSequence.length - 1 ? (
                        <div className="space-y-1">
                            {bootSequence.slice(0, bootStep + 1).map((msg, i) => (
                                <div key={i} className="text-yellow-400">
                                    {msg}
                                </div>
                            ))}
                            <div className="text-green-400 animate-pulse">█</div>
                        </div>
                    ) : (
                        <div className="space-y-1">
                            {output.map((line, i) => (
                                <div key={i} className={line.startsWith(']') ? 'text-green-400' : 'text-yellow-300'}>
                                    {line}
                                </div>
                            ))}
                            <div className="flex items-center">
                                <span className="text-green-400">]</span>
                                <input
                                    type="text"
                                    value={command}
                                    onChange={(e) => setCommand(e.target.value.toUpperCase())}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' && command.trim()) {
                                            executeCommand(command);
                                            setCommand('');
                                        }
                                    }}
                                    className="bg-transparent text-green-400 font-mono text-sm outline-none flex-1 ml-1"
                                    style={{ textShadow: '0 0 10px #22c55e' }}
                                    autoFocus={bootStep >= bootSequence.length - 1}
                                />
                                <span className="text-green-400 animate-pulse">█</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </MonitorCard>
    );
};

const RetroMusicPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [track, setTrack] = useState(1);
    const [eqLevels, setEqLevels] = useState([3, 7, 5, 8, 4, 9, 6, 2]);

    const playlist = [
        { num: 1, title: 'PLASTIC LOVE', artist: 'TAKEUCHI MARIYA', time: '4:17' },
        { num: 2, title: 'STAY WITH ME', artist: 'MATSUBARA MIKI', time: '4:42' },
        { num: 3, title: 'MIDNIGHT PRETENDERS', artist: 'YAMASHITA TATSURO', time: '5:23' },
        { num: 4, title: '4 AM', artist: 'ONUKI TAEKO', time: '3:58' }
    ];

    useEffect(() => {
        if (isPlaying) {
            const timer = setInterval(() => {
                setEqLevels(prev => prev.map(() => Math.floor(Math.random() * 10) + 1));
            }, 200);
            return () => clearInterval(timer);
        }
    }, [isPlaying]);

    const currentTrack = playlist.find(t => t.num === track);

    return (
        <MonitorCard title="STEREO SYSTEM" subtitle="Digital Audio Processor" glowing={isPlaying}>
            {/* Track display */}
            <div className="bg-green-950 border-2 border-green-500 rounded p-3 mb-4">
                <div className="text-center">
                    <div className="text-yellow-400 font-mono text-lg font-bold mb-1">
                        TRACK {currentTrack.num}: {currentTrack.title}
                    </div>
                    <div className="text-green-400 font-mono text-sm">
                        {currentTrack.artist} • {currentTrack.time}
                    </div>
                </div>

                {/* Progress bar */}
                <div className="mt-3 w-full bg-green-900 rounded-full h-2 border border-green-600">
                    <div
                        className="bg-gradient-to-r from-green-400 to-yellow-400 h-2 rounded-full transition-all duration-1000"
                        style={{
                            width: isPlaying ? '45%' : '0%',
                            boxShadow: '0 0 10px rgba(34, 197, 94, 0.8)'
                        }}
                    />
                </div>
            </div>

            {/* Equalizer */}
            <div className="flex justify-center space-x-1 mb-4 bg-green-950 border-2 border-green-600 rounded p-3">
                {eqLevels.map((level, i) => (
                    <div key={i} className="flex flex-col items-center space-y-1">
                        {Array.from({ length: 10 }, (_, j) => (
                            <div
                                key={j}
                                className={`w-3 h-1 border ${
                                    j < level
                                        ? j < 3 ? 'bg-green-400 border-green-300' :
                                            j < 6 ? 'bg-yellow-400 border-yellow-300' :
                                                'bg-red-400 border-red-300'
                                        : 'bg-green-900 border-green-700'
                                }`}
                            />
                        ))}
                    </div>
                ))}
            </div>

            {/* Controls */}
            <div className="grid grid-cols-4 gap-2 mb-4">
                <TerminalButton
                    variant="outline"
                    size="sm"
                    onClick={() => setTrack(Math.max(1, track - 1))}
                >
                    ⏮ PREV
                </TerminalButton>
                <TerminalButton
                    variant="green"
                    onClick={() => setIsPlaying(!isPlaying)}
                    active={isPlaying}
                >
                    {isPlaying ? '⏸ PAUSE' : '▶ PLAY'}
                </TerminalButton>
                <TerminalButton
                    variant="outline"
                    size="sm"
                    onClick={() => setTrack(Math.min(4, track + 1))}
                >
                    NEXT ⏭
                </TerminalButton>
                <TerminalButton variant="amber" size="sm">
                    🔀 SHUFFLE
                </TerminalButton>
            </div>

            {/* Track listing */}
            <div className="text-green-400 font-mono text-xs space-y-1">
                {playlist.map((trackInfo) => (
                    <div
                        key={trackInfo.num}
                        className={`cursor-pointer hover:text-yellow-400 ${
                            track === trackInfo.num ? 'text-yellow-400 bg-green-900/30' : ''
                        }`}
                        onClick={() => setTrack(trackInfo.num)}
                    >
                        {trackInfo.num}. {trackInfo.title} - {trackInfo.artist}
                    </div>
                ))}
            </div>
        </MonitorCard>
    );
};

const ClassicTerminal = () => {
    const [messages, setMessages] = useState([]);
    const [currentInput, setCurrentInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    const autoMessages = [
        'Connection established to Tokyo BBS...',
        'Loading nostalgic protocols...',
        'City Pop database online.',
        'Romantic subroutines activated.',
        'Ready for digital love connection.'
    ];

    useEffect(() => {
        let index = 0;
        const addMessage = () => {
            if (index < autoMessages.length) {
                setMessages(prev => [...prev, `> ${autoMessages[index]}`]);
                index++;
                setTimeout(addMessage, 2000);
            }
        };
        addMessage();
    }, []);

    const sendMessage = () => {
        if (currentInput.trim()) {
            setMessages(prev => [...prev, `USER: ${currentInput}`, `SYSTEM: Message received. 愛を込めて送信しました.`]);
            setCurrentInput('');
        }
    };

    return (
        <MonitorCard title="TERMINAL SESSION" subtitle="BBS Connection Active" glowing={true}>
            {/* Chat window */}
            <div className="bg-green-950 border-2 border-green-500 rounded p-3 mb-4 h-48 overflow-y-auto font-mono text-sm">
                {messages.map((msg, i) => (
                    <div key={i} className={`mb-1 ${msg.startsWith('USER:') ? 'text-yellow-400' : 'text-green-400'}`}>
                        {msg}
                    </div>
                ))}
            </div>

            {/* Input area */}
            <div className="flex space-x-2 mb-4">
                <input
                    type="text"
                    value={currentInput}
                    onChange={(e) => setCurrentInput(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            sendMessage();
                        }
                    }}
                    placeholder="Type your message... メッセージを入力..."
                    className="flex-1 bg-green-950 border-2 border-green-500 rounded p-2 text-green-400 placeholder-green-600 font-mono text-sm focus:outline-none focus:border-yellow-400"
                />
                <TerminalButton variant="amber" onClick={sendMessage}>
                    SEND
                </TerminalButton>
            </div>

            <div className="text-center">
                <div className="text-yellow-400 font-mono text-xs">
                    Connected to: CITY_POP_BBS.TOKYO<br/>
                    接続中：シティポップ掲示板
                </div>
            </div>
        </MonitorCard>
    );
};

const RetroGameConsole = () => {
    const [playerPos, setPlayerPos] = useState({ x: 5, y: 5 });
    const [score, setScore] = useState(0);
    const [gameActive, setGameActive] = useState(false);
    const [hearts, setHearts] = useState([
        { x: 3, y: 7 }, { x: 12, y: 4 }, { x: 8, y: 9 }, { x: 15, y: 2 }
    ]);

    useEffect(() => {
        if (!gameActive) return;

        const handleKeyPress = (e) => {
            setPlayerPos(prev => {
                let newPos = { ...prev };
                switch (e.key) {
                    case 'ArrowUp': newPos.y = Math.max(0, prev.y - 1); break;
                    case 'ArrowDown': newPos.y = Math.min(9, prev.y + 1); break;
                    case 'ArrowLeft': newPos.x = Math.max(0, prev.x - 1); break;
                    case 'ArrowRight': newPos.x = Math.min(19, prev.x + 1); break;
                }

                // Check heart collection
                setHearts(prevHearts => {
                    const updated = prevHearts.filter(heart =>
                        !(heart.x === newPos.x && heart.y === newPos.y)
                    );
                    if (updated.length < prevHearts.length) {
                        setScore(s => s + 100);
                    }
                    return updated;
                });

                return newPos;
            });
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [gameActive]);

    return (
        <MonitorCard title="LOVE QUEST GAME" subtitle="City Pop Adventure" glowing={gameActive}>
            <div className="text-center mb-4">
                <div className="text-yellow-400 font-mono text-sm">
                    SCORE: {score} • HEARTS: {hearts.length}
                </div>
            </div>

            {/* Game screen */}
            <div className="bg-green-950 border-2 border-green-400 rounded p-2 mb-4 relative">
                <div className="w-full h-32 relative bg-green-900/30">
                    {/* Game grid */}
                    <div
                        className="absolute inset-0 opacity-20"
                        style={{
                            backgroundImage: `
                linear-gradient(rgba(34, 197, 94, 0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(34, 197, 94, 0.3) 1px, transparent 1px)
              `,
                            backgroundSize: '8px 8px'
                        }}
                    />

                    {/* Player */}
                    {gameActive && (
                        <div
                            className="absolute w-2 h-2 bg-yellow-400 rounded-full shadow-lg"
                            style={{
                                left: playerPos.x * 8,
                                top: playerPos.y * 8,
                                boxShadow: '0 0 8px rgba(234, 179, 8, 0.8)',
                                transition: 'all 0.2s ease'
                            }}
                        />
                    )}

                    {/* Hearts */}
                    {gameActive && hearts.map((heart, i) => (
                        <div
                            key={i}
                            className="absolute w-2 h-2 bg-red-400 rounded-full animate-pulse"
                            style={{
                                left: heart.x * 8,
                                top: heart.y * 8,
                                boxShadow: '0 0 6px rgba(248, 113, 113, 0.8)'
                            }}
                        />
                    ))}

                    {!gameActive && (
                        <div className="absolute inset-0 flex items-center justify-center text-green-400 font-mono">
                            PRESS START TO BEGIN
                        </div>
                    )}
                </div>
            </div>

            {/* Game controls */}
            <div className="grid grid-cols-2 gap-3">
                <TerminalButton
                    variant={gameActive ? "green" : "amber"}
                    onClick={() => setGameActive(!gameActive)}
                    active={gameActive}
                >
                    {gameActive ? '⏸ PAUSE' : '🎮 START'}
                </TerminalButton>
                <TerminalButton
                    variant="outline"
                    onClick={() => {
                        setPlayerPos({ x: 5, y: 5 });
                        setScore(0);
                        setHearts([{ x: 3, y: 7 }, { x: 12, y: 4 }, { x: 8, y: 9 }, { x: 15, y: 2 }]);
                    }}
                >
                    🔄 RESET
                </TerminalButton>
            </div>

            {gameActive && (
                <div className="text-center mt-3 text-green-400 font-mono text-xs">
                    Arrow keys to move • ハートを集めよう
                </div>
            )}
        </MonitorCard>
    );
};

const VintageCalculator = () => {
    const [display, setDisplay] = useState('0');
    const [operation, setOperation] = useState('');
    const [prevValue, setPrevValue] = useState('');

    const inputNumber = (num) => {
        setDisplay(display === '0' ? num : display + num);
    };

    const inputOperation = (op) => {
        if (prevValue && operation && display !== '0') {
            calculate();
        }
        setOperation(op);
        setPrevValue(display);
        setDisplay('0');
    };

    const calculate = () => {
        const prev = parseFloat(prevValue);
        const current = parseFloat(display);
        let result = 0;

        switch (operation) {
            case '+': result = prev + current; break;
            case '-': result = prev - current; break;
            case '*': result = prev * current; break;
            case '/': result = prev / current; break;
            default: return;
        }

        setDisplay(result.toString());
        setOperation('');
        setPrevValue('');
    };

    const clear = () => {
        setDisplay('0');
        setOperation('');
        setPrevValue('');
    };

    return (
        <MonitorCard title="HP-12C CALCULATOR" subtitle="Financial Computing">
            {/* Display */}
            <div className="bg-green-950 border-2 border-yellow-500 rounded p-3 mb-4">
                <div className="text-right text-yellow-400 font-mono text-2xl font-bold h-8 overflow-hidden" style={{ textShadow: '0 0 10px #eab308' }}>
                    {display}
                </div>
            </div>

            {/* Keypad */}
            <div className="grid grid-cols-4 gap-2">
                <TerminalButton variant="amber" onClick={clear}>CLR</TerminalButton>
                <TerminalButton variant="outline" onClick={() => inputOperation('/')}>÷</TerminalButton>
                <TerminalButton variant="outline" onClick={() => inputOperation('*')}>×</TerminalButton>
                <TerminalButton variant="outline" onClick={() => setDisplay(display.slice(0, -1) || '0')}>⌫</TerminalButton>

                <TerminalButton variant="green" onClick={() => inputNumber('7')}>7</TerminalButton>
                <TerminalButton variant="green" onClick={() => inputNumber('8')}>8</TerminalButton>
                <TerminalButton variant="green" onClick={() => inputNumber('9')}>9</TerminalButton>
                <TerminalButton variant="outline" onClick={() => inputOperation('-')}>−</TerminalButton>

                <TerminalButton variant="green" onClick={() => inputNumber('4')}>4</TerminalButton>
                <TerminalButton variant="green" onClick={() => inputNumber('5')}>5</TerminalButton>
                <TerminalButton variant="green" onClick={() => inputNumber('6')}>6</TerminalButton>
                <TerminalButton variant="outline" onClick={() => inputOperation('+')}>+</TerminalButton>

                <TerminalButton variant="green" onClick={() => inputNumber('1')}>1</TerminalButton>
                <TerminalButton variant="green" onClick={() => inputNumber('2')}>2</TerminalButton>
                <TerminalButton variant="green" onClick={() => inputNumber('3')}>3</TerminalButton>
                <TerminalButton variant="amber" onClick={calculate} className="row-span-2">=</TerminalButton>

                <TerminalButton variant="green" onClick={() => inputNumber('0')} className="col-span-2">0</TerminalButton>
                <TerminalButton variant="green" onClick={() => inputNumber('.')}>.</TerminalButton>
            </div>
        </MonitorCard>
    );
};

const DigitalClock = () => {
    const [time, setTime] = useState(new Date());
    const [format24, setFormat24] = useState(true);
    const [showSeconds, setShowSeconds] = useState(true);

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <MonitorCard title="SYSTEM CLOCK" subtitle="Chronometer Display" glowing={true}>
            {/* Main time display */}
            <div className="text-center mb-6">
                <div className="text-green-400 font-mono text-4xl font-bold mb-2" style={{ textShadow: '0 0 15px #22c55e' }}>
                    {time.toLocaleTimeString('en-US', {
                        hour12: !format24,
                        hour: '2-digit',
                        minute: '2-digit',
                        second: showSeconds ? '2-digit' : undefined
                    })}
                </div>

                <div className="text-yellow-400 font-mono text-lg">
                    {time.toLocaleDateString('ja-JP', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit'
                    })}
                </div>

                <div className="text-green-300 font-mono text-sm mt-2">
                    {time.toLocaleDateString('en-US', { weekday: 'long' })} • {time.toLocaleDateString('ja-JP', { weekday: 'long' })}
                </div>
            </div>

            {/* Clock controls */}
            <div className="grid grid-cols-2 gap-3">
                <TerminalButton
                    variant={format24 ? "green" : "outline"}
                    onClick={() => setFormat24(!format24)}
                    active={format24}
                    size="sm"
                >
                    {format24 ? '24HR' : '12HR'}
                </TerminalButton>
                <TerminalButton
                    variant={showSeconds ? "amber" : "outline"}
                    onClick={() => setShowSeconds(!showSeconds)}
                    active={showSeconds}
                    size="sm"
                >
                    {showSeconds ? 'SEC ON' : 'SEC OFF'}
                </TerminalButton>
            </div>

            {/* System uptime */}
            <div className="mt-4 text-center bg-green-950 border border-green-600 rounded p-2">
                <div className="text-green-400 font-mono text-xs">
                    SYSTEM UPTIME: 7 DAYS, 14:32:17<br/>
                    稼働時間：愛のプログラム実行中
                </div>
            </div>
        </MonitorCard>
    );
};

const Widget3Page = () => {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [activeTerminal, setActiveTerminal] = useState('main');

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const terminals = [
        { id: 'main', label: 'MAIN.SYS', icon: '💻' },
        { id: 'music', label: 'AUDIO.SYS', icon: '🎵' },
        { id: 'games', label: 'GAMES.SYS', icon: '🎮' },
        { id: 'comm', label: 'COMM.SYS', icon: '📡' }
    ];

    return (
        <div className="min-h-screen bg-black text-green-400 relative overflow-hidden">
            {/* Terminal background pattern */}
            <div className="fixed inset-0">
                <div
                    className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage: `
              linear-gradient(rgba(34, 197, 94, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(34, 197, 94, 0.1) 1px, transparent 1px)
            `,
                        backgroundSize: '20px 20px'
                    }}
                />

                {/* Phosphor glow effect */}
                <div className="absolute inset-0 bg-gradient-to-b from-green-950/30 via-transparent to-green-950/30" />
            </div>

            {/* Enhanced terminal animations */}
            <style jsx>{`
        @keyframes phosphorScan {
          0% { transform: translateY(-100vh); }
          100% { transform: translateY(100vh); }
        }
        @keyframes terminalFlicker {
          0%, 100% { opacity: 1; }
          98% { opacity: 1; }
          99% { opacity: 0.95; }
          100% { opacity: 1; }
        }
        @keyframes terminalGlow {
          0%, 100% { text-shadow: 0 0 5px currentColor; }
          50% { text-shadow: 0 0 15px currentColor, 0 0 25px currentColor; }
        }
        .terminal-glow {
          animation: terminalGlow 3s ease-in-out infinite;
        }
        .crt-flicker {
          animation: terminalFlicker 0.1s infinite linear;
        }
      `}</style>

            {/* Terminal header */}
            <header className="relative z-20 bg-green-950 border-b-4 border-green-400 p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="text-yellow-400 font-mono text-2xl font-bold terminal-glow">
                        [CITY_POP_TERMINAL_v2.1]
                    </div>
                    <div className="text-green-400 font-mono text-sm">
                        {currentTime.toLocaleTimeString()} • SYSTEM_ONLINE
                    </div>
                </div>
            </header>

            {/* Terminal tabs */}
            <nav className="relative z-20 bg-green-900 border-b-2 border-green-500 p-2">
                <div className="container mx-auto flex justify-center space-x-2">
                    {terminals.map(terminal => (
                        <TerminalButton
                            key={terminal.id}
                            variant={activeTerminal === terminal.id ? "green" : "outline"}
                            onClick={() => setActiveTerminal(terminal.id)}
                            active={activeTerminal === terminal.id}
                            size="sm"
                        >
                            {terminal.icon} {terminal.label}
                        </TerminalButton>
                    ))}
                </div>
            </nav>

            <div className="crt-flicker relative z-10 p-8">
                {/* Tab content */}
                <div className="max-w-7xl mx-auto">
                    {activeTerminal === 'main' && (
                        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
                            <ClassicComputer />
                            <DigitalClock />
                            <ClassicTerminal />

                            <div className="xl:col-span-3">
                                <MonitorCard title="WELCOME TO CITY POP TERMINAL" subtitle="Retro Computing Experience">
                                    <div className="text-center space-y-4">
                                        <div className="text-4xl">🖥️</div>
                                        <div className="text-green-400 font-mono leading-relaxed">
                                            Welcome to the nostalgic world of 1980s computing!<br/>
                                            Experience City Pop through the warm glow of vintage terminals.<br/>
                                            <span className="text-yellow-400">1980 年代のコンピューティングの懐かしい世界へようこそ！</span>
                                        </div>
                                        <div className="grid grid-cols-3 gap-4 mt-6">
                                            <TerminalButton variant="green">💾 SAVE</TerminalButton>
                                            <TerminalButton variant="amber">📁 LOAD</TerminalButton>
                                            <TerminalButton variant="lime">🔄 BACKUP</TerminalButton>
                                        </div>
                                    </div>
                                </MonitorCard>
                            </div>
                        </div>
                    )}

                    {activeTerminal === 'music' && (
                        <div className="grid lg:grid-cols-2 gap-8">
                            <RetroMusicPlayer />
                            <MonitorCard title="AUDIO SPECTRUM" subtitle="Sound Visualization">
                                <div className="space-y-4">
                                    <div className="bg-green-950 border-2 border-green-400 rounded p-3">
                                        <div className="text-yellow-400 font-mono text-sm mb-2">FREQUENCY ANALYSIS</div>
                                        <div className="grid grid-cols-10 gap-1 h-16 items-end">
                                            {Array.from({ length: 10 }, (_, i) => (
                                                <div
                                                    key={i}
                                                    className="bg-gradient-to-t from-green-600 to-yellow-400 w-full transition-all duration-300"
                                                    style={{ height: `${Math.random() * 100}%` }}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-3 gap-2">
                                        <TerminalButton variant="green" size="sm">BASS</TerminalButton>
                                        <TerminalButton variant="amber" size="sm">MID</TerminalButton>
                                        <TerminalButton variant="lime" size="sm">TREBLE</TerminalButton>
                                    </div>
                                </div>
                            </MonitorCard>
                        </div>
                    )}

                    {activeTerminal === 'games' && (
                        <div className="grid lg:grid-cols-2 gap-8">
                            <RetroGameConsole />
                            <VintageCalculator />
                        </div>
                    )}

                    {activeTerminal === 'comm' && (
                        <div className="grid lg:grid-cols-1 gap-8">
                            <MonitorCard title="TOKYO BBS NETWORK" subtitle="Digital Communication Hub">
                                <div className="space-y-4">
                                    <div className="bg-green-950 border-2 border-green-500 rounded p-4">
                                        <div className="text-yellow-400 font-mono text-sm mb-3">ACTIVE CONNECTIONS:</div>
                                        <div className="space-y-2 text-green-400 font-mono text-xs">
                                            <div>USER_001@SHIBUYA.NET - Status: ONLINE</div>
                                            <div>CITYLOVER@TOKYO.BBS - Status: LISTENING_TO_MUSIC</div>
                                            <div>RETRO_GIRL@HARAJUKU.SYS - Status: TYPING_LOVE_LETTER</div>
                                            <div>NOSTALGIC@AKIBA.TERM - Status: CODING_DREAMS</div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-4 gap-2">
                                        <TerminalButton variant="green" size="sm">📧 MAIL</TerminalButton>
                                        <TerminalButton variant="amber" size="sm">💬 CHAT</TerminalButton>
                                        <TerminalButton variant="lime" size="sm">📋 BOARD</TerminalButton>
                                        <TerminalButton variant="outline" size="sm">🔍 FIND</TerminalButton>
                                    </div>
                                </div>
                            </MonitorCard>
                        </div>
                    )}

                    {/* Terminal footer */}
                    <div className="text-center mt-16 py-8 border-t-2 border-green-500">
                        <div className="text-green-400 font-mono text-lg terminal-glow mb-4">
                            "緑の端末で愛を語る"<br/>
                            <span className="text-sm text-yellow-400 opacity-80">"Speaking of love through green terminals"</span>
                        </div>

                        <div className="flex justify-center space-x-4">
                            <TerminalButton variant="green">💚 EXECUTE_LOVE.EXE</TerminalButton>
                            <TerminalButton variant="amber">🌟 RUN_DREAMS.BAT</TerminalButton>
                            <TerminalButton variant="lime">🌿 LOAD_MEMORIES.SYS</TerminalButton>
                        </div>

                        <div className="mt-6 text-green-500 font-mono text-xs">
                            COPYRIGHT (C) 1984 CITY_POP_COMPUTING_CORPORATION<br/>
                            ALL LOVE RESERVED • すべての愛は保護されています
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Widget3Page;