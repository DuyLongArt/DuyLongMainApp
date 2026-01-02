import React from 'react';
import Grid from '@mui/material/Grid';
import { Card, CardContent, Typography, Box } from '@mui/material';
import GridComponent from '../../../components/GridComponent';


// --- Data ---
// We need 16 items to create the grid.


// --- Component ---
function App() {
  return (
    <div className='bg-white min-h-screen'>
      <GridComponent />

    </div>
  );
}

export default App;
