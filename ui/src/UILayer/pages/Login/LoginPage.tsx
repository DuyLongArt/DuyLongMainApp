import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Paper,
  CircularProgress,
  Alert,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { LockOutlined as LockOutlinedIcon } from '@mui/icons-material';
import { Avatar } from '@mui/material'; // Import Avatar for the icon

// Define a custom theme for the login page (optional, but good practice)
const loginTheme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // A nice blue
    },
    secondary: {
      main: '#dc004e', // A contrasting red
    },
    background: {
      default: '#f4f6f8', // Light background for the page
      paper: '#ffffff', // White background for the form container
    },
  },
  typography: {
    fontFamily: 'Inter, sans-serif', // Using Inter font
    h5: {
      fontWeight: 600,
      marginBottom: '1rem',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px', // Rounded buttons
          textTransform: 'none', // Keep original casing
          padding: '10px 20px',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '12px', // More rounded paper corners
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)', // Subtle shadow
        },
      },
    },
  },
});

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission behavior
    setLoading(true);
    setError(null); // Clear previous errors

    // Simulate an API call
    setTimeout(() => {
      if (email === 'user@example.com' && password === 'password123') {
        alert('Login successful!'); // In a real app, you'd redirect or set user context
        setEmail('');
        setPassword('');
      } else {
        setError('Invalid email or password. Please try again.');
      }
      setLoading(false);
    }, 1500); // Simulate network delay
  };

  return (
    <ThemeProvider theme={loginTheme}>
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh', // Center vertically
          backgroundColor: loginTheme.palette.background.default,
          padding: '20px',
          boxSizing: 'border-box', // Include padding in width/height
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: { xs: '20px', sm: '40px' },
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            maxWidth: '400px', // Max width for the form
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign In
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              variant="outlined"
              size="medium" // Medium size for better touch target
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              variant="outlined"
              size="medium"
            />
            {error && (
              <Alert severity="error" sx={{ mt: 2, width: '100%' }}>
                {error}
              </Alert>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, py: 1.5 }} // Increased padding for better touch
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
            </Button>
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

// Main App component to render the LoginPage
// In a real application, this would typically be your App.tsx

export default LoginPage; // Export App as default for Canvas preview