import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Grid   from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

interface WidgetData {
  id: number;
  name: string;
  value: number;
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
    <Container>
        {widgets.map((widget) => (
          <Grid item xs={12} sm={6} md={4} key={widget.id} component="div">
            <Paper style={{ padding: 16, textAlign: 'center' }}>
              <div><strong>{widget.name}</strong></div>
              <div>Value: {widget.value}</div>
            </Paper>
          </Grid>
        ))}
    
    </Container>
  );
};

export default WidgetMainPage;