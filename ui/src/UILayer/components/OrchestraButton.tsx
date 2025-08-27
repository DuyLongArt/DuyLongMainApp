import React from 'react';
import { Button } from "@material-tailwind/react";
import { MainAppIcon } from '../../DataLayer/LocalDataLayer/IconAssets.tsx';
import MotionImageSpinner from "../UILogics/Spin.tsx";

// Interface for props
interface OrchestraButtonProps {
  onClick: () => void;
}

const OrchestraButton: React.FC<OrchestraButtonProps> = ({ onClick }) => {
  return (
    <Button 
      onClick={onClick}
      className=" hover:from-purple-600 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 border-0 p-3 rounded-xl"
      ripple={true}
    >
      <MotionImageSpinner imageUrl={MainAppIcon} />
    </Button>
  );
};

export default OrchestraButton;