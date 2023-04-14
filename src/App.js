import React ,{Fragment,useState} from 'react';
import Header from './Components/Layout/Header.js';
import Meals from './Components/Meals/Meals.js';
import Cart from './Components/Cart/Cart.js';
import CartProvider from './Store/CartProvider.js';

function App() {
  const [cartIsShown,setIsCartShown] = useState(false);
  const showCartHandler = ()=>{
    setIsCartShown(true);
  }
  const hideCartHandler = ()=>{
    setIsCartShown(false);
  }

 
  return (
    <CartProvider>
    
    {cartIsShown && <Cart onClose = {hideCartHandler}/>}
      <Header onShowCart = {showCartHandler}/>
      <main>
       <Meals/>
      </main>
    
       </CartProvider>
      
  );
}

export default App;
