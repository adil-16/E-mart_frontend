import './App.css';
import {  RouterProvider,createBrowserRouter } from 'react-router-dom';
import { CartProvider } from './Context/CartContext'; 
import Home from './pages/Home';
import Products from './pages/Products';
import About from './pages/About';
import Contact from './pages/Contact';
import Root from './pages/Root';

////backend main url nai rkhna ik key rkhni ha hr product ki
const router = createBrowserRouter([
    {
      path: "/",
      element: <Root/>,
      children: [
        {
          path: "/",
          element: <Home/>
        },
        {
          path: "/products",
          element: <Products/>
    
        },
        {
          path: "/about",
          element: <About/>
    
        },
        {
          path: "/contact",
          element: <Contact/>
    
        },
      ]

    }

]);


function App() {

  return (
    <CartProvider>
      <RouterProvider router={router}/>
    </CartProvider>
    
  );
}

export default App