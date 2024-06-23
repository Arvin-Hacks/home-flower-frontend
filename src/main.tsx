import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { Provider } from 'react-redux'
import store from './store/store.ts'
import './index.css'
import { Toaster } from "@/components/ui/toaster"
import { CookiesProvider } from 'react-cookie'
import { AuthProvider } from './contexts/AuthContext.tsx'



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CookiesProvider >
      <AuthProvider>
        <Provider store={store}>
          <App />
          <Toaster />
        </Provider>
      </AuthProvider>
    </CookiesProvider>
  </React.StrictMode>,
)
