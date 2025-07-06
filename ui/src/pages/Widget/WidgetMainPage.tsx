import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Grid   from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';

interface WidgetData {
  id: number;
  name: string;
  value: number;
  imageUrl?:string ;
}

const WidgetMainPage: React.FC = () => {
  const [widgets] = useState<WidgetData[]>([
    { id: 1, name: 'Widget A', value: 10 },
    { id: 2, name: 'Widget B', value: 20 },
    { id: 3, name: 'Widget C', value: 30 },
    { id: 4, name: 'Widget D', value: 40 },
    { id: 5, name: 'Widget E', value: 50 },
    { id: 6, name: 'Widget F', value: 60 },
  ]);

  return (
    <Box>
      <Grid container spacing={5} xs={8} sm={4} md={2} sx={{display:'flex',justifyContent:'center'}}>

     
        {widgets.map((widget) => (
          <Grid item xs={2} sm={1} md={1} key={widget.id} component="div" sx={{border:'1px solid red'}}>
            <Card sx={{border:'1px solid red'}}>
              
            <Paper style={{ padding: 16, textAlign: 'center' }}>
              <div><strong>{widget.name}</strong></div>
              <div>Value: {widget.value}</div>
            </Paper> 
            </Card>
           
          </Grid>
        ))}
         </Grid>
    
    </Box>
  );
};

export default WidgetMainPage;