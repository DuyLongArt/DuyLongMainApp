import React from 'react';
import { motion } from 'framer-motion';
// Assuming your config file is correctly located
import { config } from '../../OrchestraLayer/ThemeLayer/Animation/SpinConfigProtocol.ts';

interface ImageUrlInterface {
    imageUrl: string;
}

const MotionImageSpinner: React.FC<ImageUrlInterface> = ({ imageUrl }) => {
    // 1. Prepare the animation properties from the config
    const animationProps = {
        // This dynamically creates the animation object.
        // For example, if trigger is "whileHover", this becomes:
        // { whileHover: { rotate: 360, transition: { ... } } }
        [config.animationConfig.trigger]: {
            ...config.animationConfig.animate,
            transition: {
                ...config.animationConfig.transition,
                // JSON can't store Infinity, so we convert the string 'Infinity'
                // to the actual JavaScript Infinity value that Framer Motion needs.
                repeat: config.animationConfig.transition.repeat === 'Infinity'
                    ? Infinity
                    : config.animationConfig.transition.repeat,
            },
        },
    };

    return (
        // Use the style from the config for the container
        <div style={config.general.style}>
            <motion.img
                src={imageUrl}
                // 2. Use props from the config object
                alt={config.general.name}
                style={config.general.style}
                // 3. Spread the dynamically created animation props
                {...animationProps}
            />
        </div>
    );
};

export default MotionImageSpinner;