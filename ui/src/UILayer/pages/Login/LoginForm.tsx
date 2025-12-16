import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AuthenticateFactor } from "../../../OrchestraLayer/StateManager/XState/AuthenticateMachine";
import { useSelector } from "@xstate/react";
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography, Paper, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff, Email, Lock } from '@mui/icons-material';

// Utility function to set a cookie for the JWT
const setAuthCookie = (jwt: string) => {
  if (!jwt) {
    console.error("Attempted to save empty JWT to cookie.");
    return;
  }

  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + 7);

  document.cookie = `auth_jwt=${jwt}; expires=${expiryDate.toUTCString()}; path=/; Secure; SameSite=Lax`;
  console.log("JWT successfully saved to cookie.");
};

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate('/login/register');
  };
// /login/register
  const actorRef = AuthenticateFactor.useActorRef();

  // Derive State from XState Machine
  const currentState = useSelector(actorRef, (snapshot) => snapshot.value);
  const jwt = useSelector(actorRef, (snapshot) => snapshot.context.jwt);
  const isLoading = useSelector(actorRef, (snapshot) => snapshot.matches('authenticating'));
  const isFailed = useSelector(actorRef, (snapshot) => snapshot.matches('onAuthenFailed'));

  // Handle Login Submission
  const submitEvent = (event: React.FormEvent) => {
    event.preventDefault();

    if (!isLoading) {
      console.log("Sending SUBMIT event to XState machine...");
      actorRef.send({ type: "SUBMIT", username, password, token: "" } as any);
    }
  };

  // Cookie Saving and Error Reset Logic
  useEffect(() => {
    if (currentState === 'onLogin' && jwt) {
      setAuthCookie(jwt);
    }

    if (currentState === 'onAuthenFailed') {
      console.log("Authentication state failure detected.");
    }
  }, [currentState, jwt]);

  const error = isFailed ? "Login failed. Please check your credentials." : null;

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        p: 2
      }}
    >
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
            maxWidth: 400,
            borderRadius: 4,
            textAlign: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)'
          }}
        >
          <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom color="primary">
            Welcome Back
          </Typography>
          <Typography variant="body2" color="textSecondary" mb={4}>
            Sign in to continue to your dashboard
          </Typography>

          <form onSubmit={submitEvent}>
            <TextField
              fullWidth
              variant="outlined"
              label="Email Address"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              margin="normal"
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
              label="Password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
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

            {error && (
              <Typography color="error" variant="body2" sx={{ mt: 2, mb: 1 }}>
                {error}
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
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>

            <Button
              color="primary"
              sx={{ textTransform: 'none' }}
            >
              Forgot password?
            </Button>
            <Box mt={2} textAlign="center">
              <Typography variant="body2" color="textSecondary" component="span">
                Don't have an account?{' '}
              </Typography>
              <Button
                color="primary"
                onClick={handleRegisterClick}
                sx={{ textTransform: 'none', fontWeight: 'bold', p: 0, minWidth: 'auto' }}
              >
                Sign Up
              </Button>
            </Box>
          </form>
        </Paper>
      </motion.div>
    </Box>
  );
};

export default LoginForm;