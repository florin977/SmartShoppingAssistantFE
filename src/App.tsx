import { Box } from '@mui/material'
import './App.css'
import NavBar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Categories from './components/Categories'
import Home from './components/Home'
import Products from './components/Products'
import Promotions from './components/Promotions'

function App() {
  return (
  <Box className="app">
    <NavBar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/products" element={<Products />} />
      <Route path="/promotions" element={<Promotions />}/>
    </Routes>
  </Box>
  )
}

export default App
