import { Route, Routes } from "react-router-dom"
import './App.css'
import WidgetMainPage from './pages/Widget/WidgetMainPage'
import PersonPage from "./pages/Personal/PersonPage"
import ResponsiveAppBar from "./components/ResponsiveAppbar";
import ErrorPage from "./pages/Error/ErrorPage";
function App() {
  

  return (
    <>
        <div style={{ width: "100%" }}>
            <ResponsiveAppBar />
        </div>
    

      <div>
        <Routes>
          <Route path="/" element={<h2>Welcome to DuyLong App</h2>} />
          <Route path="/index" element={<h2>Welcome to DuyLong App</h2>} />
          <Route path="/widget" element={<WidgetMainPage />} />
          <Route path="/personal" element={<PersonPage />} />
          <Route path="*"  element= {<ErrorPage />} />

        </Routes>
      </div>

    </>
  )
}
export default App
