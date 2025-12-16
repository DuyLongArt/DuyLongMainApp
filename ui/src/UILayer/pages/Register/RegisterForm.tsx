import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AuthenticateFactor } from "../../../OrchestraLayer/StateManager/XState/AuthenticateMachine";
import { useSelector } from "@xstate/react";
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography, Paper, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff, Email, Lock, Person, Phone } from '@mui/icons-material';

const RegisterForm = () => {
    // Form State
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [phone, setPhone] = useState('');

    const [showPassword, setShowPassword] = useState(false);
    const [validationError, setValidationError] = useState<string | null>(null);

    const actorRef = AuthenticateFactor.useActorRef();
    const navigate = useNavigate();

    // Derive State from XState Machine
    const isLoading = useSelector(actorRef, (snapshot) => snapshot.matches('registering'));
    const isFailed = useSelector(actorRef, (snapshot) => snapshot.matches('onAuthenFailed'));

    const submitEvent = (event: React.FormEvent) => {
        event.preventDefault();
        setValidationError(null);

        if (password !== confirmPassword) {
            setValidationError("Passwords do not match.");
            return;
        }

        if (password.length < 6) {
            setValidationError("Password must be at least 6 characters.");
            return;
        }

        if (!isLoading) {
            const payload = {
                userName: userName || email.split('@')[0], // Fallback if username empty
                email: email,
                password: password,
                phone: phone,
                role: 'USER' as const,
                device: navigator.userAgent,
                deviceIP: 'unknown' // Backend usually handles IP extraction
            };

            console.log("Sending REGISTER event to XState machine...", payload);
            actorRef.send({ type: "REGISTER", payload });
        }
    };

    const handleLoginClick = () => {
        navigate('/login/index');
    };

    return (

        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Paper
                elevation={3}
                sx={{
                    p: 5,
                    width: '100%',
                    maxWidth: 500,
                    borderRadius: 4,
                    textAlign: 'center',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(10px)'
                }}
            >
                <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom color="primary">
                    Create Account
                </Typography>
                <Typography variant="body2" color="textSecondary" mb={4}>
                    Join us today! Enter your details below.
                </Typography>

                <form onSubmit={submitEvent}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Username"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            required
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Person color="action" />
                                    </InputAdornment>
                                ),
                                sx: { borderRadius: 2 }
                            }}
                        />

                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Email Address"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Email color="action" />
                                    </InputAdornment>
                                ),
                                sx: { borderRadius: 2 }
                            }}
                        />

                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Phone Number"
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Phone color="action" />
                                    </InputAdornment>
                                ),
                                sx: { borderRadius: 2 }
                            }}
                        />

                        <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Password"
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Lock color="action" />
                                        </InputAdornment>
                                    ),
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() => setShowPassword(!showPassword)}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                    sx: { borderRadius: 2 }
                                }}
                            />
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Confirm Password"
                                type={showPassword ? 'text' : 'password'}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Lock color="action" />
                                        </InputAdornment>
                                    ),
                                    sx: { borderRadius: 2 }
                                }}
                            />
                        </Box>
                    </Box>

                    {(validationError || isFailed) && (
                        <Typography color="error" variant="body2" sx={{ mt: 2, mb: 1 }}>
                            {validationError || "Registration failed. Please try again."}
                        </Typography>
                    )}

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        size="large"
                        disabled={isLoading}
                        sx={{
                            mt: 4,
                            mb: 2,
                            py: 1.5,
                            borderRadius: 2,
                            textTransform: 'none',
                            fontSize: '1rem',
                            fontWeight: 'bold',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                        }}
                    >
                        {isLoading ? 'Creating Account...' : 'Sign Up'}
                    </Button>

                    <Box mt={2} textAlign="center">
                        <Typography variant="body2" color="textSecondary" component="span">
                            Already have an account?{' '}
                        </Typography>
                        <Button
                            color="primary"
                            onClick={handleLoginClick}
                            sx={{ textTransform: 'none', fontWeight: 'bold', p: 0, minWidth: 'auto' }}
                        >
                            Sign In
                        </Button>
                    </Box>
                </form>
            </Paper>
        </motion.div>
    );
};

export default RegisterForm;
