import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Pages/Home'
import SingleProduct from './Pages/SingleProduct'

function App() {


  return (
    <>
    
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/product/:id' element={<SingleProduct/>} />
    </Routes>
    </>
  )
}

export default App
