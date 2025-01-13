import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { RouterProvider } from 'react-router-dom'
import { router } from './Routers/router.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className='max-w-screen-2xl mx-auto'>
      <RouterProvider router={router}></RouterProvider>
    </div>
  </StrictMode>,
)
