import React from 'react';
import ResponsiveAppBar from '../../components/ResponsiveAppbar';
import { ChildrenInterface } from '../../../OrchestraLayer/ChildrenComponent';
import { pageList, pathList } from '../../../RouterLayer/RouterProtocol.ts';
import { Outlet } from 'react-router-dom';
import OrchestraButton from '../../components/OrchestraButton.tsx';
import CustomDrawer from '../../components/CustomDrawer';
import { orchestraButton } from '../../../OrchestraLayer/StateManager/XState/OrchestraButton';
import { useMachine } from '@xstate/react';
import AvatarFloatButton, {ColaborateIcon} from '../../components/AvatarFloatButton.tsx';
import {AvatarImage} from "../../../DataLayer/LocalDataLayer/assets/AvatarImage.tsx";

const HomeLayout: React.FC<ChildrenInterface> = ({ children }) => {
  const [state, send] = useMachine(orchestraButton);

  return (
    <div className="border border-blue-500 h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
      {/* Header Section */}
      <div className="flex flex-row">
        <OrchestraButton onClick={() => send({ type: 'CLICK' })} />
        <ResponsiveAppBar pageList={pageList} pathList={pathList} />
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

      {/* Floating Action Button */}

        <AvatarFloatButton x={100} y={80} sizeScale={1.5} collaboratorDistance={100} />
{/*<AvatarImage/>*/}
    </div>
  );
};

export default HomeLayout;