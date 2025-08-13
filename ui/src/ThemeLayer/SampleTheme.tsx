import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

// 1. Create a Theme Mode Context
// This context will hold the current theme mode ('light' or 'dark') and the function to toggle it.
const ThemeModeContext = createContext(null);

// 2. Create a custom hook to easily consume the theme mode context
export const useThemeMode = () => {
  const context = useContext(ThemeModeContext);
  if (!context) {
    throw new Error('useThemeMode must be used within a ThemeModeProvider');
  }
  return context;
};

// Define your light and dark themes using Material-UI's createTheme
const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2', // Blue
    },
    secondary: {
      main: '#dc004e', // Red
    },
    background: {
      default: '#f4f6f8',
      paper: '#ffffff',
    },
    text: {
      primary: '#212121',
      secondary: '#757575',
    },
  },
  typography: {
    fontFamily: 'Inter, sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 999, // Rounded full
          padding: '12px 24px',
          fontWeight: 600,
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            transform: 'scale(1.05)',
          },
        },
      },
    },
    MuiPaper: {
        styleOverrides: {
            root: {
                borderRadius: 8, // Rounded corners for Paper components
            }
        }
    }
  }
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#9c27b0', // Purple
    },
    secondary: {
      main: '#ff4081', // Pink
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
    text: {
      primary: '#ffffff',
      secondary: '#b0b0b0',
    },
  },
  typography: {
    fontFamily: 'Inter, sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 999, // Rounded full
          padding: '12px 24px',
          fontWeight: 600,
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            transform: 'scale(1.05)',
          },
        },
      },
    },
    MuiPaper: {
        styleOverrides: {
            root: {
                borderRadius: 8, // Rounded corners for Paper components
            }
        }
    }
  }
});

// 3. Create the Theme Mode Provider component
// This component will wrap your application and provide the theme mode context.
export default function App() {
  // Initialize theme mode from localStorage or default to 'light'
  const [mode, setMode] = useState(() => {
    const storedMode = localStorage.getItem('themeMode');
    return storedMode || 'light';
  });

  // Effect to save the theme mode to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('themeMode', mode);
  }, [mode]);

  // Function to toggle the theme mode
  const toggleThemeMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  // Memoize the theme object to prevent unnecessary re-renders
  const theme = useMemo(() => (mode === 'light' ? lightTheme : darkTheme), [mode]);

  return (
    <ThemeModeContext.Provider value={{ mode, toggleThemeMode }}>
      <ThemeProvider theme={theme}>
        {/* CssBaseline provides a consistent baseline for styling */}
        <CssBaseline />
        <Box
          sx={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            p: 2, // Padding
            bgcolor: 'background.default', // Use theme background color
            color: 'text.primary', // Use theme text color
            transition: 'background-color 0.3s ease-in-out, color 0.3s ease-in-out',
          }}
        >
          <Typography variant="h3" component="h1" gutterBottom sx={{ mb: 4, fontWeight: 'bold' }}>
            Material-UI Theme Manager
          </Typography>
          <ThemeToggler />
          <ContentSection />
        </Box>
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
}

// Component to toggle the theme
const ThemeToggler = () => {
  const { mode, toggleThemeMode } = useThemeMode();

  return (
    <Button
      variant="contained"
      color="primary"
      onClick={toggleThemeMode}
      sx={{
        mb: 4, // Margin bottom
        boxShadow: 3, // Shadow
        '&:focus': {
          outline: 'none',
          boxShadow: '0 0 0 4px rgba(25, 118, 210, 0.3)', // Example focus ring for primary
          // For dark mode, you might want a different focus ring color
          '.Mui-dark &': {
            boxShadow: '0 0 0 4px rgba(156, 39, 176, 0.3)', // Example focus ring for dark mode primary
          }
        },
      }}
    >
      Switch to {mode === 'light' ? 'Dark' : 'Light'} Mode
    </Button>
  );
};

// Component that consumes the theme
const ContentSection = () => {
  const { mode } = useThemeMode();

  return (
    <Paper
      elevation={6} // Shadow
      sx={{
        mt: 4, // Margin top
        p: 4, // Padding
        bgcolor: 'background.paper', // Use theme paper background color
        color: 'text.primary', // Use theme text color
        textAlign: 'center',
        maxWidth: 500,
        width: '100%',
        transition: 'background-color 0.3s ease-in-out, color 0.3s ease-in-out',
      }}
    >
      <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'semibold' }}>
        Current Theme: <span style={{ textTransform: 'capitalize' }}>{mode}</span>
      </Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>
        This content dynamically changes its appearance based on the selected theme.
        Observe the background, text color, and button style adapting.
      </Typography>
      <Box sx={{ mt: 3 }}>
        <Typography variant="body2" color="text.secondary">
          You can extend this to apply different styles to any Material-UI component in your app.
        </Typography>
      </Box>
    </Paper>
  );
};