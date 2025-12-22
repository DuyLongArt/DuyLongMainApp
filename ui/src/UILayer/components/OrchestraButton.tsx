import React, { useState } from 'react';
import { Button } from "@material-tailwind/react";
import { MainAppIcon } from '../../DataLayer/LocalDataLayer/assets/IconAssets.tsx';
import MotionImageSpinner from "../UILogics/Spin.tsx";
import Draggable from 'react-draggable';
// Interface for props
interface OrchestraButtonProps {
  onClick: () => void;
}

import { motion } from 'framer-motion';

const OrchestraButton: React.FC<OrchestraButtonProps> = ({ onClick }) => {

  const url = "http:192.168.22.4:9000/duylongwebappobjectdatabase/admin.png"


  return (






    <motion.div
      drag
      dragElastic={0.2}
      dragMomentum={false}
      className='flex items-center z-50'
    >
      <Button
        onClick={onClick}
        className="hover:from-purple-600 hover:to-indigo-700 
        shadow-lg hover:shadow-xl 
      transition-all duration-300 transform hover:scale-105 
      active:scale-95 
      rounded-x
    
      bg-white! h-full flex items-center justify-center "
        ripple={true}
      >
        <MotionImageSpinner imageUrl={MainAppIcon} />
      </Button>
    </motion.div>


  );
};

export default OrchestraButton;