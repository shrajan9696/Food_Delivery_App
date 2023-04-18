import React ,{Fragment,useState} from 'react';
import Header from './Components/Layout/Header.js';
import Meals from './Components/Meals/Meals.js';
import Cart from './Components/Cart/Cart.js';
import CartProvider from './Store/CartProvider.js';
import Order from './Components/Order/Order.js';

function App() {
  const [cartIsShown,setIsCartShown] = useState(false);
  const [orderIsShown, setIsOrderShown] = useState(false);
  const showCartHandler = ()=>{
    setIsCartShown(true);
  }
  const hideCartHandler = ()=>{
    setIsCartShown(false);
  }

 const showOrderHandler = () =>{
     setIsOrderShown(true);
 }

 const hideOrderHandler = () =>{
  setIsOrderShown(false);
 }
  return (
    <CartProvider>
    
    {cartIsShown && <Cart onClose={hideCartHandler}/>}
    
      <Header onShowCart = {showCartHandler} onShowOrders={showOrderHandler}/>
      <main>
      {orderIsShown && <Order onClose={hideOrderHandler}/>}
   <Meals/>
      </main>
    
       </CartProvider>
      
  );
}

export default App;
