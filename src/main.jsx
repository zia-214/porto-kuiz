import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { globalStore } from './store/store'


createRoot(document.getElementById('root')).render(
  <Provider store={globalStore}>
    <StrictMode>
      <App />
    </StrictMode>,
  </Provider>
)
