import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import GeneratorApp from './components/GeneratorApp.jsx'

const isGenerator = window.location.pathname === '/generate';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {isGenerator ? <GeneratorApp /> : <App />}
  </StrictMode>,
)
