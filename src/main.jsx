import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import AuthProvider from './providers/AuthProvider.jsx'
import SiteDetailsProvider from './providers/SiteDetailsProvider.jsx'
import { RouterProvider } from 'react-router-dom'
import routes from './routes/Routes'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <SiteDetailsProvider>
          <RouterProvider router={routes}></RouterProvider>
        </SiteDetailsProvider>
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>,
)
