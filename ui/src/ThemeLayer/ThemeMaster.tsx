import { IconButton, ThemeProvider } from '@mui/material';
import React, { Children } from 'react';
import containerTheme from './styles/ContainerStyle';
import ChildrenComponent from '../OrchestraLayer/ChildrenComponent';
const ThemeMaster:React.FC<ChildrenComponent>=({children})=>{
return (
<ThemeProvider theme={containerTheme}>
{children}
</ThemeProvider>
);
}
export default ThemeMaster;