import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <main className='bg-[url(/background.webp)] bg-cover bg-center bg-no-repeat py-10 px-2'>
      <App />
    </main>
  </StrictMode>,
)
