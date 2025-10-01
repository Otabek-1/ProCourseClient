import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Auth from './Auth.jsx'
import HomeUser from './Home.jsx'
import TestInterface from './Components/TestInterface.jsx'
import Result from './Components/Result.jsx'
import AdminDashboard from './Components/AdminDashboard.jsx'
import AdminUsers from './Components/AdminUsers.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />}/>
      <Route path='/auth' element={<Auth />}/>
      <Route path='/home' element={<HomeUser />}/>
      <Route path='/test' element={<TestInterface />}/>
      <Route path="/result" element={<Result />} />
      <Route path='/admin' element={<AdminDashboard />}/>
    </Routes>
  </BrowserRouter>
)
