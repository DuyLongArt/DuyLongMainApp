import React from 'react';
import { motion } from 'framer-motion';

// An image URL to use for the demo
// const imageUrl = 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg';
interface ImageUrlInterface {
imageUrl:string;
}
const MotionImageSpinner: React.FC<ImageUrlInterface> = ({imageUrl}) => {
    return (
        <div style={{width:"55px",height:"55px"}}>

            <motion.img
                src={imageUrl}
                alt="Spinning React Logo"
                style={{ width:"55px",height:"55px", cursor: 'pointer' }}
                // Define the animation state for when the element is hovered
                whileHover={{
                    rotate: 360, // Rotate a full 360 degrees
                    transition: {
                        repeat: Infinity,      // Loop the animation forever
                        ease: "linear",        // Use a constant speed
                        duration: 1.5            // Each rotation takes 2 seconds
                    }
                }}
            />
        </div>
    );
};

export default MotionImageSpinner;