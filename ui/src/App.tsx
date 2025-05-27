import { Route, Routes } from "react-router-dom"
import './App.css'
import duylongAppIcon from './assets/AppMainIcon.png'
import WidgetMainPage from './pages/Widget/WidgetMainPage'
function App() {
  return (
    <>
      <h1>
        DuyLong App
      </h1>
      <div>
        <a href="http://0.0.0.0:22222/" rel="noopener" target="_blank">
          <img id="main-icon"  src={duylongAppIcon} className="logo" alt="Vite logo" />
        </a>
      </div>
      <div>
  <Routes>
          <Route path="/" element={<h2>Welcome to DuyLong App</h2>} />
          <Route path="/index" element={<h2>Welcome to DuyLong App</h2>} />
          <Route path="/widget" element={<WidgetMainPage />} />
          <Route path="*" element={<h2>Page Not Found</h2>} />
  </Routes>
      </div>
    </>
  )
}
export default App
