import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './routes/HomePage.jsx'
import Dashboard from './routes/Dashboard.jsx'
import ChatPage from './routes/ChatPage.jsx'
import Notfound from './routes/Notfound.jsx'
import MainLayout from './layouts/MainLayout.jsx'
import Wrapper from './layouts/Wrapper.jsx'
import Signup from './routes/Signup.jsx'
import Login from './routes/Login.jsx'


const router = createBrowserRouter([
  {
    element: <Wrapper />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/sign-in/*", element: <Login /> },
      { path: "/sign-up/*", element: <Signup /> },
      {
        element: <MainLayout />,
        children: [
          {
            path: "/dashboard",
            element: <Dashboard />
          },
          {
            path: "/dashboard/chats/:id", element: <ChatPage />
          }
        ]
      },
      {
        path: "*",
        element: (<Notfound />),
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
