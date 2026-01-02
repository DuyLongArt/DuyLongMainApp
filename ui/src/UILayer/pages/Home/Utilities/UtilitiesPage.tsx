// pages/UtilitiesPage.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';

const UtilitiesPage = () => {
    return (
        <div className="p-4 bg-amber-50">
            <h1 className="text-2xl text-black font-bold mb-4">Utilities Dashboard</h1>

            {/* 1. Shared UI (Visible on all sub-pages) */}

            {/* 2. CRITICAL: The Magic Portal */}
            {/* This is where the children (StoragePage, etc.) will appear */}
            <div className="border border-dashed border-gray-400 p-4 min-h-[300px]">
                <Outlet />
            </div>
        </div>
    );
};

export default UtilitiesPage;