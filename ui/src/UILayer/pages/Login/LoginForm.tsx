import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AuthenticateFactor } from "../../../OrchestraLayer/StateManager/XState/AuthenticateMachine";
import { useSelector } from "@xstate/react";

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
  const [focusedField, setFocusedField] = useState<'email' | 'password' | null>(null);

  const actorRef = AuthenticateFactor.useActorRef();

  // Derive State from XState Machine
  const currentState = useSelector(actorRef, (snapshot) => snapshot.value);
  const jwt = useSelector(actorRef, (snapshot) => snapshot.context.jwt);
  // const jwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJxdWFudHVtX2RldyIsIm5hbWUiOiJEdXkgTG9uZyIsImlhdCI6MTYxNjIzOTAyMiwiZXhwIjoxOTE2MjM5MDIyfQ.4n3f1o3_d3adK3y_sample_signature_verified";
  const isLoading = useSelector(actorRef, (snapshot) => snapshot.matches('authenticating'));
  const isFailed = useSelector(actorRef, (snapshot) => snapshot.matches('onAuthenFailed'));

  // Handle Login Submission
  const submitEvent = (event: React.FormEvent) => {
    event.preventDefault();

    if (!isLoading) {
      console.log("Sending SUBMIT event to XState machine...");
      actorRef.send({ type: "SUBMIT", username, password, token: "" });
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
  const showLoading = isLoading;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, gray 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Neumorphism container */}
        <div
          className="bg-gray-100 rounded-3xl p-10 relative"
          style={{
            boxShadow: '20px 20px 60px #bebebe, -20px -20px 60px #ffffff'
          }}
        >
          {/* Logo/Icon */}
          <motion.div
            className="flex justify-center mb-8"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <div
              className="w-20 h-20 bg-gray-100 rounded-3xl flex items-center justify-center"
              style={{
                boxShadow: 'inset 8px 8px 16px #bebebe, inset -8px -8px 16px #ffffff'
              }}
            >
              <svg className="w-10 h-10 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl font-bold text-gray-800 text-center mb-2"
            style={{ textShadow: '2px 2px 4px rgba(255,255,255,0.8), -2px -2px 4px rgba(0,0,0,0.1)' }}
          >
            Welcome Back
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-gray-500 text-center mb-10 font-medium"
          >
            Sign in to your account to continue
          </motion.p>

          {/* Form */}
          <form onSubmit={submitEvent} className="space-y-6">
            {/* Email Field */}
            <div className="relative">
              <motion.div
                animate={{ scale: focusedField === 'email' ? 1.02 : 1 }}
                transition={{ duration: 0.2 }}
              >
                <input
                  type="email"
                  id="email"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Email address"
                  className="w-full px-6 py-4 bg-gray-100 rounded-2xl text-gray-800 placeholder-gray-400 focus:outline-none transition-all duration-300 font-medium"
                  style={{
                    boxShadow: focusedField === 'email'
                      ? 'inset 6px 6px 12px #bebebe, inset -6px -6px 12px #ffffff'
                      : 'inset 4px 4px 8px #bebebe, inset -4px -4px 8px #ffffff'
                  }}
                  required
                />
              </motion.div>
            </div>

            {/* Password Field */}
            <div className="relative">
              <motion.div
                animate={{ scale: focusedField === 'password' ? 1.02 : 1 }}
                transition={{ duration: 0.2 }}
              >
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Password"
                  className="w-full px-6 py-4 bg-gray-100 rounded-2xl text-gray-800 placeholder-gray-400 focus:outline-none transition-all duration-300 font-medium"
                  style={{
                    boxShadow: focusedField === 'password'
                      ? 'inset 6px 6px 12px #bebebe, inset -6px -6px 12px #ffffff'
                      : 'inset 4px 4px 8px #bebebe, inset -4px -4px 8px #ffffff'
                  }}
                  required
                />
              </motion.div>
            </div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 rounded-2xl p-4"
                style={{
                  boxShadow: 'inset 4px 4px 8px rgba(220, 38, 38, 0.1), inset -4px -4px 8px rgba(255, 255, 255, 0.8)'
                }}
              >
                <p className="text-red-600 text-sm text-center font-medium">{error}</p>
              </motion.div>
            )}

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={showLoading}
              className="w-full py-4 bg-gray-100 rounded-2xl font-bold text-gray-700 transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-60 relative overflow-hidden"
              style={{
                boxShadow: showLoading
                  ? 'inset 6px 6px 12px #bebebe, inset -6px -6px 12px #ffffff'
                  : '8px 8px 16px #bebebe, -8px -8px 16px #ffffff'
              }}
              whileHover={!showLoading ? { scale: 1.02 } : {}}
              whileTap={!showLoading ? {
                scale: 0.98,
                boxShadow: 'inset 6px 6px 12px #bebebe, inset -6px -6px 12px #ffffff'
              } : {}}
            >
              {showLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <motion.div
                    className="w-5 h-5 border-3 border-gray-400 border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                  <span>Signing in...</span>
                </div>
              ) : (
                'Sign In'
              )}
            </motion.button>

            {/* Forgot Password Link */}
            <div className="text-center pt-2">
              <button
                type="button"
                className="text-gray-500 hover:text-gray-700 transition-colors duration-300 text-sm font-medium"
              >
                Forgot your password?
              </button>
            </div>
          </form>
        </div>

        {/* Decorative elements with neumorphism */}
        <motion.div
          className="absolute -top-16 -left-16 w-32 h-32 bg-gray-100 rounded-full opacity-50"
          style={{
            boxShadow: '15px 15px 30px #bebebe, -15px -15px 30px #ffffff'
          }}
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        <motion.div
          className="absolute -bottom-16 -right-16 w-32 h-32 bg-gray-100 rounded-full opacity-50"
          style={{
            boxShadow: '15px 15px 30px #bebebe, -15px -15px 30px #ffffff'
          }}
          animate={{
            scale: [1, 1.15, 1],
            rotate: [360, 180, 0]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </motion.div>
    </div>
  );
};

export default LoginForm;