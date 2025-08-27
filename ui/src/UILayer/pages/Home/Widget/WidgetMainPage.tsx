import React from 'react';
import Grid from '@mui/material/Grid';
import { Card, CardContent, Typography, Box } from '@mui/material';
import GridComponent from '../../../components/GridComponent';


// --- Data ---
// We need 16 items to create the grid.


// --- Component ---
function App() {
  return (
    <Box sx={{ flexGrow: 1, p: 3, backgroundColor: '#f4f6f8' }}>
    <GridComponent/>

    </Box>
  );
}

export default App;
