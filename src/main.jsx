import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import AuthProvider from './providers/AuthProvider.jsx'
import SiteDetailsProvider from './providers/SiteDetailsProvider.jsx'
import { RouterProvider } from 'react-router-dom'
import routes from './routes/Routes'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <SiteDetailsProvider>
        <RouterProvider router={routes}></RouterProvider>
      </SiteDetailsProvider>
    </AuthProvider>
  </React.StrictMode>,
)
