import duylongAppIcon from './assets/AppMainIcon.png'
import './App.css'

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
    </>
  )
}

export default App
