import React, { useEffect, useRef, useState } from 'react';
import ResponsiveAppBar from '../../components/ResponsiveAppbar';
import type { ChildrenInterface } from '../../../OrchestraLayer/ChildrenComponent';
import { pageList, pathList } from '../../../RouterLayer/RouterConfig.tsx';
import { Outlet } from 'react-router-dom';
import OrchestraButton from '../../components/OrchestraButton.tsx';
import CustomDrawer from '../../components/CustomDrawer';
import { orchestraButton } from '../../../OrchestraLayer/StateManager/XState/OrchestraButton';
import { useMachine } from '@xstate/react';
import AvatarFloatButton from '../../components/AvatarFloatButton.tsx';
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';
import { useUserProfileStore } from '../../../OrchestraLayer/StateManager/Zustand/userProfileStore.ts';
import MainButton from '../../components/MainButton.tsx';

const HomeLayout: React.FC<ChildrenInterface> = ({ children }) => {
  const [state, send] = useMachine(orchestraButton);

  // 1. Ref for React 19 Compatibility (prevents findDOMNode crash)
  const nodeRef = useRef<HTMLDivElement>(null);

  // 2. Position State (Start at bottom-right roughly)
  // You can adjust these or use CSS for initial placement
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleDrag = (_e: DraggableEvent, ui: DraggableData) => {
    setPosition(prev => ({ x: prev.x + ui.deltaX, y: prev.y + ui.deltaY }));
  };
  useEffect(() => {
    useUserProfileStore.getState().fetchFromDatabase();

  }, [state.value]);

  return (
    // 3. LAYOUT FIX: 'flex-col' ensures the header stays top and content fills the rest
    <div className="flex flex-col h-full  w-full overflow-visible relative">

      {/* Header Section (Fixed height / shrinking) */}
      <div className="flex w-full border-2  flex-row items-center justify-start  gap-2 shadow-sm z-10 bg-white/50 backdrop-blur-sm">
        <div >
          <OrchestraButton onClick={() => send({ type: 'CLICK' })} />
          {/* <MainButton  onClick={() => send({ type: 'CLICK' })} /> */}
        </div>
        <div className="flex-1">
          <ResponsiveAppBar pageList={pageList} pathList={pathList} />
        </div>
      </div>

      {/* Drawer Section */}
      <CustomDrawer
        isOpen={state.matches("onButtonOpen")}
        onClose={() => send({ type: 'CLOSE' })}
      />

      {/* Main Content Area (Grows to fill space, scrolls internally) */}
      <div className="flex-1  z-20">
        {children}
        <Outlet />

      </div>

      {/* 4. DRAGGABLE FIX: 
          - nodeRef is passed to both <Draggable> and the child <div> 
          - Positioned 'absolute' with high z-index to float over everything
      */}
      <Draggable
        nodeRef={nodeRef}
        position={position}
        onDrag={handleDrag}
      // bounds="parent" // Optional: Prevents dragging off-screen
      >
        <div
          ref={nodeRef}
          className="absolute bottom-10 right-10 z-[1000] cursor-move touch-none"
          style={{ position: 'absolute' }} // Explicitly needed for initial layout
        >
          <AvatarFloatButton
            x={0}
            y={0} // Internal coords can be 0 since Draggable handles the div
            sizeScale={1.5}
            collaboratorDistance={100}
          />
        </div>
      </Draggable>

    </div>
  );
};

export default HomeLayout;