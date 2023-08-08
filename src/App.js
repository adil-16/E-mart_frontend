import './App.css';
import { Route, RouterProvider, Routes, createBrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { CartProvider } from './Context/CartContext'; 
import Home from './pages/Home';
import Products from './pages/Products';
import About from './pages/About';
import Contact from './pages/Contact';

////backend main url nai rkhna ik key rkhni ha hr product ki
const router = createBrowserRouter([
    {
      path: "/",
      children: <Home/>

    },
    {
      path: "/products",
      children: <Products/>

    },
    {
      path: "/about",
      children: <About/>

    },
    {
      path: "/contact",
      children: <Contact/>

    },



]);


function App() {

  return (
    // <CartProvider>
    //   <Navbar />
    //   <Routes>
    //     <Route path="/" element={<Home />} />
    //     <Route path="/products" element={<Products />} />
    //     <Route path="/about" element={<About />} />
    //     <Route path="/contact" element={<Contact />} />
    //   </Routes>
    //   <Footer />
    // </CartProvider>
    <CartProvider>
      <Navbar/>
      <RouterProvider router={router}/>
    </CartProvider>
        
     

    
  );
}

export default App