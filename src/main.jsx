import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Login from './login/Login.jsx'
import Nav from './components/nav.jsx'
import { app } from '../settings/firebase.js'
import {
    createBrowserRouter,
    RouterProvider
} from "react-router-dom";
import './index.css'

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>
    },
    {
        path: "login",
        element: <Login/>
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <Nav/>
      <RouterProvider router={router} />
  </React.StrictMode>,
)
