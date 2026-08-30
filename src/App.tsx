import './App.css'
import { BrowserRouter,Route, Routes } from 'react-router-dom'
import Home from './pages/public/Home'
import Login from './pages/public/Login'
import Signup from './pages/public/Signup'
import Products from './pages/public/Products'
import Cart from './pages/user/Cart'

function App() {
  
  return (
    <BrowserRouter>
      <Routes>

        <Route path='/' element={<Home />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/signup' element={<Signup />}/>
        <Route path='/products' element={<Products />}/>
        <Route path='/cart' element={<Cart />}/>

      </Routes>
    </BrowserRouter>
  )
}

export default App