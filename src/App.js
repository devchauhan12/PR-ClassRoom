import './App.css';
import Product from './PR-Thunk/Component/Product.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './PR-Thunk/Component/Header.jsx';
import Cart from './PR-Thunk/Component/cart.jsx';



function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Product />} />
        <Route path='/cart' element={<Cart />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
