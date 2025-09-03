import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {AuthContext} from "../../../OrchestraLayer/StateManager/XState/AuthenState.tsx";

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [focusedField, setFocusedField] = useState(null);
  const actorRef=AuthContext.useActorRef();
  const submitEvent = (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    console.log("Send activate");
    console.log("Email: " + username);
    console.log("password: " + password);

      actorRef.send({type:"SUBMIT",username:username,password:password});
    

    // // Simulate API call
    // setTimeout(() => {
    //   if (username === 'admin@ss' && password === '123') {
    //     actorRef.send({type:"SUBMIT",username:"admin",password:"123"});
    //     console.log("Login successful");
    //     // setLoading(false);
    //   } else {
    //     setError('Invalid credentials');
    //     setLoading(false);
    //   }
    // }, 2000);
  };

  const containerVariants = {
    hidden: {
      opacity: 0,
      y: 50,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const floatingElements = Array.from({ length: 6 }, (_, i) => (
      <motion.div
          key={i}
          className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-30"
          animate={{
            x: [0, Math.random() * 100 - 50],
            y: [0, Math.random() * 100 - 50],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
      />
  ));

  return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          {floatingElements}
        </div>

        {/* Background blur effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 backdrop-blur-3xl"></div>

        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="relative z-10 w-full max-w-md"
        >
          {/* Glassmorphism container */}
          <motion.div
              className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 relative overflow-hidden"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl"></div>

            <div className="relative z-10">
              {/* Logo/Icon */}
              <motion.div
                  variants={itemVariants}
                  className="flex justify-center mb-8"
              >
                <motion.div
                    className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg"
                    whileHover={{
                      rotate: 360,
                      scale: 1.1
                    }}
                    transition={{ duration: 0.6 }}
                >
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </motion.div>
              </motion.div>

              {/* Title */}
              <motion.h1
                  variants={itemVariants}
                  className="text-3xl font-bold text-white text-center mb-2"
              >
                Welcome Back
              </motion.h1>

              <motion.p
                  variants={itemVariants}
                  className="text-slate-300 text-center mb-8"
              >
                Sign in to your account to continue
              </motion.p>

              {/* Form */}
              <motion.form
                  variants={itemVariants}
                  onSubmit={submitEvent}
                  className="space-y-6"
              >
                {/* Email Field */}
                <div className="relative">
                  <motion.div
                      animate={{
                        scale: focusedField === 'email' ? 1.02 : 1,
                      }}
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
                        className="w-full px-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300"
                        required
                    />
                    <motion.div
                        className="absolute inset-0 rounded-2xl border-2 border-blue-500/50 pointer-events-none"
                        initial={{ opacity: 0, scale: 1 }}
                        animate={{
                          opacity: focusedField === 'email' ? 1 : 0,
                          scale: focusedField === 'email' ? 1.02 : 1,
                        }}
                        transition={{ duration: 0.2 }}
                    />
                  </motion.div>
                </div>

                {/* Password Field */}
                <div className="relative">
                  <motion.div
                      animate={{
                        scale: focusedField === 'password' ? 1.02 : 1,
                      }}
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
                        className="w-full px-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300"
                        required
                    />
                    <motion.div
                        className="absolute inset-0 rounded-2xl border-2 border-blue-500/50 pointer-events-none"
                        initial={{ opacity: 0, scale: 1 }}
                        animate={{
                          opacity: focusedField === 'password' ? 1 : 0,
                          scale: focusedField === 'password' ? 1.02 : 1,
                        }}
                        transition={{ duration: 0.2 }}
                    />
                  </motion.div>
                </div>

                {/* Error Message */}
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-red-500/20 border border-red-500/30 rounded-xl p-3 backdrop-blur-sm"
                    >
                      <p className="text-red-200 text-sm text-center">{error}</p>
                    </motion.div>
                )}

                {/* Submit Button */}
                <motion.button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 rounded-2xl font-semibold text-white transition-all duration-300 shadow-lg disabled:cursor-not-allowed relative overflow-hidden"
                    whileHover={{ scale: loading ? 1 : 1.02 }}
                    whileTap={{ scale: loading ? 1 : 0.98 }}
                    onClick={submitEvent}
                >
                  <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.6 }}
                  />

                  {loading ? (
                      <div className="flex items-center justify-center space-x-2">
                        <motion.div
                            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
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
                <motion.div
                    variants={itemVariants}
                    className="text-center"
                >
                  <button
                      type="button"
                      className="text-slate-300 hover:text-white transition-colors duration-300 text-sm underline underline-offset-4"
                  >
                    Forgot your password?
                  </button>
                </motion.div>
              </motion.form>
            </div>
          </motion.div>

          {/* Additional decorative elements */}
          <motion.div
              className="absolute -top-20 -left-20 w-40 h-40 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
          />

          <motion.div
              className="absolute -bottom-20 -right-20 w-40 h-40 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.4, 0.3],
              }}
              transition={{
                duration: 3,
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