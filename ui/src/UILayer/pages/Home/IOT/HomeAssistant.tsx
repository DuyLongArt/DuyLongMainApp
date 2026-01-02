import { GlobeAltIcon, LightBulbIcon } from "@heroicons/react/24/solid";
import { Chip, Typography, Switch } from "@material-tailwind/react";
import React, { useState } from "react";

const HomeAssistant: React.FC = () => {
    const [isOn, setIsOn] = useState(false);
    const [loading, setLoading] = useState(false);

    const toggleMainDevice = async () => {
        setLoading(true);
        const action = isOn ? 'turn_off' : 'turn_on';
        try {
            await fetch(`http://duylongnetwork.local/switch/main_device_switch/${action}`, {
                method: 'POST',
            });
            setIsOn(!isOn);
        } catch (error) {
            console.error("Failed to toggle device:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-full animate-fade-in-up">
            <div className="flex items-center justify-between mb-6">
                <div className="flex flex-col">
                    <p className="font-bold text-black">
                        Network Dashboard
                    </p>
                    <Typography variant="small" className="text-gray-500 font-normal">
                        Monitoring local network activity
                    </Typography>
                </div>
                <div className="flex gap-2">
                    <Chip variant="ghost" color="green" value="Online" className="rounded-full" />
                    <Chip variant="ghost" color="blue" value="Local" className="rounded-full" />
                </div>
            </div>

            {/* Controls Section */}
            <div className="mb-6 bg-white p-4 rounded-xl border border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${isOn ? 'bg-amber-100 text-amber-600' : 'bg-gray-100 text-gray-500'}`}>
                        <LightBulbIcon className="h-6 w-6" />
                    </div>
                    <div>
                        <Typography variant="h6" color="blue-gray" className="font-bold">
                            Main Device
                        </Typography>
                        <Typography variant="small" className="text-gray-500">
                            ESP32 Controller
                        </Typography>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Typography variant="small" className={`font-bold ${isOn ? 'text-green-500' : 'text-gray-400'}`}>
                        {isOn ? 'ON' : 'OFF'}
                    </Typography>
                    <Switch
                        onChange={toggleMainDevice}
                        checked={isOn}
                        color="blue"
                        disabled={loading}
                        className="h-full w-full checked:bg-[#2ec946]"
                        containerProps={{
                            className: "w-11 h-6",
                        }}
                        circleProps={{
                            className: "before:hidden left-0.5 border-none",
                        }}
                    />
                </div>
            </div>

            <div className="flex-1 bg-white rounded-xl border border-gray-200 overflow-hidden relative min-h-[800px]">
                <div className="absolute inset-0 flex items-center justify-center bg-gray-50 -z-10">
                    <div className="flex flex-col items-center gap-2">
                        <GlobeAltIcon className="h-full border border-gray-200 w-full text-gray-300 animate-pulse" />
                        <Typography variant="small" className="text-gray-400 font-medium">Loading Network Interface...</Typography>
                    </div>
                </div>
                <iframe
                    src="http://duylongnetwork.local/"
                    className="w-full h-full border-0"
                    title="Network Dashboard"
                    allowFullScreen
                />
            </div>
        </div>
    );
}

export default HomeAssistant;