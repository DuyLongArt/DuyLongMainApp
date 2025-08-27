//
import React from 'react';
import AvatarImageSrc from "./Avatar.png";

// Option 1: Simple functional component
export const AvatarImage: React.FC<{width:number,height:number }> = ({width,height}) => {
  return (
      <div className="overflow-hidden  "
           style={{
               width: `${width *4}px !important`,
             height: `${height *4}px !important`,


             clipPath: 'circle(50%)'
             // objectPosition: 'center'
      }}>

        <img
            className="w-full h-full object-cover object-center"
            src={AvatarImageSrc}
            alt="Avatar image"
        />
      </div>

  );
};
