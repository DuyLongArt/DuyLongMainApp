import React, { useState } from 'react';
import ResponsiveAppBar from '../../components/ResponsiveAppbar';
import type { ChildrenInterface } from '../../../OrchestraLayer/ChildrenComponent';
import { pageList, pathList } from '../../../RouterLayer/RouterConfig.tsx';
import { Outlet, useLocation } from 'react-router-dom';
import OrchestraButton from '../../components/OrchestraButton.tsx';
import CustomDrawer from '../../components/CustomDrawer';
import { orchestraButton } from '../../../OrchestraLayer/StateManager/XState/OrchestraButton';
import { useMachine } from '@xstate/react';
import AvatarFloatButton from '../../components/AvatarFloatButton.tsx';

import Draggable from 'react-draggable';
const HomeLayout: React.FC<ChildrenInterface> = ({ children }) => {
  const [state, send] = useMachine(orchestraButton);
  const [position, setPosition] = useState({ x: 1400, y: -350 });

  /* Update handleDrag to use ui.x/y or delta correctly. Since we are controlled, we use delta to update our own state */
  const handleDrag = (_e: any, ui: any) => {

    setPosition(prev => ({ x: prev.x + ui.deltaX, y: prev.y + ui.deltaY }));
  };

  return (
    <div className=" border-blue-500 h-screen w-screen  bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
      {/* Header Section */}

      <div className="flex flex-row items-center justify-start p-2 gap-2">
        <div className=" h-1/22">
          <OrchestraButton onClick={() => send({ type: 'CLICK' })} />
        </div>
        <div className="flex-1 h-1/22">
          <ResponsiveAppBar pageList={pageList} pathList={pathList} />
        </div>
      </div>

      {/* Drawer Section */}
      <div>
        <CustomDrawer
          isOpen={state.matches("onButtonOpen")}
          onClose={() => send({ type: 'CLOSE' })}
        />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-auto">
        <Outlet />
        {children}
      </div>

      <Draggable onDrag={handleDrag} position={position}>
        {/* Draggable needs a DOM element reference. Wrapping custom component in a div is safest. */}
        <div style={{ position: 'sticky', width: 'fit-content' }}>
          <AvatarFloatButton x={0} y={0}
            sizeScale={1.5} collaboratorDistance={100} />
        </div>
      </Draggable>

    </div>
  );
};

export default HomeLayout;