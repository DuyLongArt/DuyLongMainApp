import React from 'react';
import { Box, Typography, Button, Container, useTheme, useMediaQuery } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const EntryPage: React.FC = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3,
                duration: 0.8,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 50, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring" as const,
                stiffness: 100,
                damping: 10
            }
        },
    };

    const buttonVariants = {
        hover: {
            scale: 1.05,
            boxShadow: "0px 10px 20px rgba(0,0,0,0.2)",
        },
        tap: { scale: 0.95 },
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                width: '100vw',
                background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)', // Deep, premium dark theme
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                position: 'relative',
            }}
        >
            {/* Abstract Background Elements */}
            <Box
                component={motion.div}
                animate={{
                    rotate: 360,
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                }}
                sx={{
                    position: 'absolute',
                    top: '-10%',
                    right: '-10%',
                    width: '50vw',
                    height: '50vw',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(233,69,96,0.15) 0%, rgba(0,0,0,0) 70%)',
                    filter: 'blur(60px)',
                    zIndex: 0,
                }}
            />
            <Box
                component={motion.div}
                animate={{
                    rotate: -360,
                    scale: [1, 1.3, 1],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear"
                }}
                sx={{
                    position: 'absolute',
                    bottom: '-10%',
                    left: '-10%',
                    width: '40vw',
                    height: '40vw',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(83, 218, 255, 0.1) 0%, rgba(0,0,0,0) 70%)',
                    filter: 'blur(60px)',
                    zIndex: 0,
                }}
            />

            <Container maxWidth="md" sx={{ zIndex: 1, position: 'relative' }}>
                <Box
                    component={motion.div}
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center',
                        backdropFilter: 'blur(16px)',
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: 4,
                        padding: { xs: 4, md: 8 },
                        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
                    }}
                >
                    <motion.div variants={itemVariants}>
                        <Typography
                            variant="h2"
                            component="h1"
                            sx={{
                                color: '#fff',
                                fontWeight: 800,
                                mb: 2,
                                background: 'linear-gradient(45deg, #FFF 30%, #a5b4fc 90%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                letterSpacing: '-0.02em',
                                fontSize: { xs: '2.5rem', md: '4rem' }
                            }}
                        >
                            Welcome
                        </Typography>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <Typography
                            variant="h6"
                            sx={{
                                color: 'rgba(255,255,255,0.7)',
                                mb: 6,
                                fontWeight: 400,
                                maxWidth: '600px',
                                lineHeight: 1.6
                            }}
                        >
                            Experience the next generation of application management. Secure, fast, and beautifully designed.
                        </Typography>
                    </motion.div>

                    <Box
                        sx={{
                            display: 'flex',
                            gap: 3,
                            flexDirection: isMobile ? 'column' : 'row',
                            width: '100%',
                            justifyContent: 'center'
                        }}
                    >
                        <motion.div variants={itemVariants} whileHover="hover" whileTap="tap" style={{ width: isMobile ? '100%' : 'auto' }}>
                            <Button
                                component={motion.button}
                                variants={buttonVariants}
                                onClick={() => navigate('/login/index')} // Assuming /login/index wraps LoginForm
                                startIcon={<LoginIcon />}
                                sx={{
                                    py: 1.5,
                                    px: 5,
                                    borderRadius: 3,
                                    fontSize: '1.1rem',
                                    fontWeight: 600,
                                    textTransform: 'none',
                                    width: '100%',
                                    background: 'linear-gradient(45deg, #e94560 30%, #ff6b6b 90%)',
                                    color: 'white',
                                    boxShadow: '0 3px 5px 2px rgba(233, 69, 96, .3)',
                                    '&:hover': {
                                        background: 'linear-gradient(45deg, #d33852 30%, #ff5252 90%)',
                                    }
                                }}
                            >
                                Login
                            </Button>
                        </motion.div>

                        <motion.div variants={itemVariants} whileHover="hover" whileTap="tap" style={{ width: isMobile ? '100%' : 'auto' }}>
                            <Button
                                component={motion.button}
                                variants={buttonVariants}
                                onClick={() => navigate('/login/register')} // Placeholder route for now
                                startIcon={<PersonAddIcon />}
                                sx={{
                                    py: 1.5,
                                    px: 5,
                                    borderRadius: 3,
                                    fontSize: '1.1rem',
                                    fontWeight: 600,
                                    textTransform: 'none',
                                    width: '100%',
                                    backgroundColor: 'transparent',
                                    color: 'white',
                                    border: '2px solid rgba(255,255,255,0.2)',
                                    '&:hover': {
                                        backgroundColor: 'rgba(255,255,255,0.1)',
                                        border: '2px solid rgba(255,255,255,0.4)',
                                    }
                                }}
                            >
                                Resignation
                            </Button>
                        </motion.div>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default EntryPage;
