import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { createBrowserRouter, Route, RouterProvider, createRoutesFromElements } from 'react-router-dom'
import RootLayout from './Components/Layout/RootLayout.jsx'
import routes from './routes'

const router =
  createBrowserRouter(
    createRoutesFromElements(

      <Route element={<RootLayout />}>
        {
          routes.map(({ path, Element }, i) => (
            <Route key={i} path={path} element={<Element></Element>} />
          ))
        }
      </Route>
    )
  )

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />

  </React.StrictMode>
)
