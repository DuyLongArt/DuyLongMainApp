import { Route, Routes } from "react-router-dom"
import './App.css'
import WidgetMainPage from './pages/Widget/WidgetMainPage'
import { BottomNavigation, BottomNavigationAction } from "@mui/material"
import PersonIcon from '@mui/icons-material/Person';
import PersonPage from "./pages/Personal/PersonPage"
import React from "react"
function App() {
  const [value, setValue] = React.useState(0);

  return (
    <>

      <div>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction href="/person" label="PERSON" icon={<PersonIcon />} />

        </BottomNavigation>
      </div>
      <div>
        <Routes>
          <Route path="/" element={<h2>Welcome to DuyLong App</h2>} />
          <Route path="/index" element={<h2>Welcome to DuyLong App</h2>} />
          <Route path="/widget" element={<WidgetMainPage />} />
          <Route path="/person" element={<PersonPage />} />
          <Route path="*" element={<h2>Page Not Found</h2>} />

        </Routes>
      </div>

    </>
  )
}
export default App
