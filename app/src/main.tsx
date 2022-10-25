import React from 'react'
import ReactDOM from 'react-dom/client'
import Routes from './Routes'
import './config/global.css'
import { QueryClientProvider } from 'react-query'
import { queryClient } from './services/queryClient'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Routes />
    </QueryClientProvider>
  </React.StrictMode>
)
