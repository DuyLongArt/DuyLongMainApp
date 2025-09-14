import React, { useState, useEffect } from 'react';

const Widget2Page = () => {
  const [time, setTime] = useState(0);
  const [amplitude, setAmplitude] = useState(50);
  const [frequency, setFrequency] = useState(0.02);
  const [speed, setSpeed] = useState(0.05);
  const [isPlaying, setIsPlaying] = useState(true);
  const [waveColor, setWaveColor] = useState('#00ff7f');

  useEffect(() => {
    if (!isPlaying) return;
    
    const interval = setInterval(() => {
      setTime(prevTime => prevTime + speed);
    }, 16); // ~60fps

    return () => clearInterval(interval);
  }, [speed, isPlaying]);

  // Generate sine wave points
  const generatePath = (offsetTime = 0) => {
    const points = [];
    const width = 800;
    const centerY = 200;
    
    for (let x = 0; x <= width; x += 2) {
      const y = centerY + amplitude * Math.sin(frequency * x + time + offsetTime);
      points.push(`${x},${y}`);
    }
    
    return `M ${points.join(' L ')}`;
  };

  // Generate multiple wave layers for depth effect
  const waves = [
    { offset: 0, opacity: 1, strokeWidth: 3 },
    { offset: Math.PI / 4, opacity: 0.6, strokeWidth: 2 },
    { offset: Math.PI / 2, opacity: 0.4, strokeWidth: 1.5 },
    { offset: 3 * Math.PI / 4, opacity: 0.3, strokeWidth: 1 }
  ];

  const colorOptions = [
    { name: 'Steins Green', value: '#00ff7f', gradient: 'from-green-400 to-emerald-600' },
    { name: 'Electric Blue', value: '#00bfff', gradient: 'from-blue-400 to-cyan-600' },
    { name: 'Neon Purple', value: '#9d4edd', gradient: 'from-purple-400 to-violet-600' },
    { name: 'Plasma Orange', value: '#ff6b35', gradient: 'from-orange-400 to-red-500' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 p-8">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 bg-clip-text text-transparent mb-4">
            SINE WAVE LABORATORY
          </h1>
          <p className="text-gray-400 text-lg font-light">
            Manipulate the fundamental frequencies of spacetime
          </p>
        </header>

        {/* Main Wave Container */}
        <div className="bg-black/40 backdrop-blur-lg rounded-2xl border border-green-500/30 p-8 mb-8 shadow-2xl">
          <div className="relative">
            {/* SVG Wave */}
            <svg 
              width="800" 
              height="400" 
              viewBox="0 0 800 400" 
              className="w-full h-auto border border-gray-700/50 rounded-lg bg-black/20"
              style={{
                filter: 'drop-shadow(0 0 20px rgba(0, 255, 127, 0.3))'
              }}
            >
              {/* Grid lines */}
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5"/>
                </pattern>
                
                {/* Glow filter */}
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge> 
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              
              <rect width="800" height="400" fill="url(#grid)" />
              
              {/* Center line */}
              <line x1="0" y1="200" x2="800" y2="200" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="5,5" />
              
              {/* Multiple wave layers for depth */}
              {waves.map((wave, index) => (
                <path
                  key={index}
                  d={generatePath(wave.offset)}
                  fill="none"
                  stroke={waveColor}
                  strokeWidth={wave.strokeWidth}
                  opacity={wave.opacity}
                  filter="url(#glow)"
                  className="transition-all duration-300"
                />
              ))}
              
              {/* Axis labels */}
              <text x="10" y="20" fill="rgba(255,255,255,0.6)" fontSize="12" fontFamily="monospace">y = A·sin(ωx + φ)</text>
            </svg>

            {/* Wave equation overlay */}
            <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm rounded-lg p-4 border border-green-500/30">
              <div className="text-green-400 font-mono text-sm">
                <div>A = {amplitude}</div>
                <div>ω = {frequency.toFixed(3)}</div>
                <div>φ = {time.toFixed(2)}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Controls Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Wave Parameters */}
          <div className="bg-black/40 backdrop-blur-lg rounded-xl border border-green-500/30 p-6">
            <h3 className="text-2xl font-bold mb-6 text-green-400">Wave Parameters</h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-gray-300 mb-2 font-mono">Amplitude: {amplitude}</label>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={amplitude}
                  onChange={(e) => setAmplitude(Number(e.target.value))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>
              
              <div>
                <label className="block text-gray-300 mb-2 font-mono">Frequency: {frequency.toFixed(3)}</label>
                <input
                  type="range"
                  min="0.005"
                  max="0.1"
                  step="0.005"
                  value={frequency}
                  onChange={(e) => setFrequency(Number(e.target.value))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>
              
              <div>
                <label className="block text-gray-300 mb-2 font-mono">Speed: {speed.toFixed(3)}</label>
                <input
                  type="range"
                  min="0.01"
                  max="0.2"
                  step="0.01"
                  value={speed}
                  onChange={(e) => setSpeed(Number(e.target.value))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>
            </div>
          </div>

          {/* Color & Controls */}
          <div className="bg-black/40 backdrop-blur-lg rounded-xl border border-green-500/30 p-6">
            <h3 className="text-2xl font-bold mb-6 text-green-400">Wave Control</h3>
            
            <div className="space-y-6">
              {/* Play/Pause */}
              <div>
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className={`w-full py-3 px-6 rounded-lg font-mono font-bold transition-all duration-300 ${
                    isPlaying 
                      ? 'bg-red-500/20 border-red-500 text-red-400 hover:bg-red-500/30' 
                      : 'bg-green-500/20 border-green-500 text-green-400 hover:bg-green-500/30'
                  } border-2`}
                >
                  {isPlaying ? '⏸ PAUSE WAVE' : '▶ START WAVE'}
                </button>
              </div>

              {/* Color Selection */}
              <div>
                <label className="block text-gray-300 mb-3 font-mono">Wave Color</label>
                <div className="grid grid-cols-2 gap-3">
                  {colorOptions.map((color) => (
                    <button
                      key={color.value}
                      onClick={() => setWaveColor(color.value)}
                      className={`p-3 rounded-lg border-2 transition-all duration-300 ${
                        waveColor === color.value 
                          ? 'border-white bg-white/10' 
                          : 'border-gray-600 hover:border-gray-400'
                      }`}
                    >
                      <div className={`w-full h-4 rounded bg-gradient-to-r ${color.gradient} mb-2`}></div>
                      <div className="text-xs font-mono text-gray-300">{color.name}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Reset Button */}
              <button
                onClick={() => {
                  setAmplitude(50);
                  setFrequency(0.02);
                  setSpeed(0.05);
                  setTime(0);
                  setWaveColor('#00ff7f');
                }}
                className="w-full py-3 px-6 bg-purple-500/20 border-2 border-purple-500 text-purple-400 rounded-lg font-mono font-bold hover:bg-purple-500/30 transition-all duration-300"
              >
                ⚡ RESET PARAMETERS
              </button>
            </div>
          </div>
        </div>

        {/* Wave Info */}
        <div className="mt-8 text-center">
          <div className="bg-black/40 backdrop-blur-lg rounded-xl border border-green-500/30 p-6 max-w-2xl mx-auto">
            <h4 className="text-xl font-bold mb-3 text-green-400">Current Wave State</h4>
            <div className="font-mono text-sm text-gray-300 space-y-1">
              <div>Equation: y = {amplitude} × sin({frequency.toFixed(3)}x + {time.toFixed(2)})</div>
              <div>Period: {(2 * Math.PI / frequency).toFixed(1)} units</div>
              <div>Phase: {time.toFixed(2)} radians</div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: ${waveColor};
          cursor: pointer;
          box-shadow: 0 0 10px ${waveColor}50;
          transition: all 0.3s ease;
        }

        .slider::-webkit-slider-thumb:hover {
          transform: scale(1.2);
          box-shadow: 0 0 15px ${waveColor}80;
        }

        .slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: ${waveColor};
          cursor: pointer;
          border: none;
          box-shadow: 0 0 10px ${waveColor}50;
          transition: all 0.3s ease;
        }

        .slider::-moz-range-thumb:hover {
          transform: scale(1.2);
          box-shadow: 0 0 15px ${waveColor}80;
        }

        @keyframes wave-pulse {
          0%, 100% { 
            filter: drop-shadow(0 0 5px ${waveColor}50);
          }
          50% { 
            filter: drop-shadow(0 0 20px ${waveColor}80);
          }
        }
      `}</style>
    </div>
  );
};

export default Widget2Page;