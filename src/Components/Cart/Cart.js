import React from 'react';
import Modal from '../UI/Modal';
import classes from './Cart.module.css';
import { useContext,useState } from 'react';
import CartContext from '../../Store/cart-context';
import CartItem from './CartItem';
import Checkout from './CheckOut';
const Cart = (props) => {

  const cartCTX = useContext(CartContext);

  const [isCheckout, setIsCheckOut] = useState(false);

  const[isSubmitting,setIssubmitting] = useState(false);

  const[didSubmit,setDidSubmit] = useState(false);

  const totalAmount = `$${cartCTX.totalAmount.toFixed(2)}`;

  const hasItems = cartCTX.items.length;
  const cartItemRemoveHandler = (id)=>{
       cartCTX.removeItem(id);
  }

  const cartItemAddHandler = item =>{
          cartCTX.addItem({...item,amount:1});
  }

  const orderHandler = ()=>{
       setIsCheckOut(true);
  }

  const submitHandler = async (userData)=>{
    setIssubmitting(true);
    try{
         const response = await fetch('https://react-http-5bc5a-default-rtdb.firebaseio.com/orders.json',{
          method:'POST',
          body:JSON.stringify({
            user:userData,
            orderedItems:cartCTX.items
          })
         })
         if(!response.ok){
          throw new Error("something went wrong");
         }
  
         setIssubmitting(false);
         setDidSubmit(true);
         cartCTX.clearCart();
        }
        catch(err){
           console.log(err);
        }
  } 

  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCTX.items.map((item) => (
       <CartItem key={item.id} name={item.name} price={item.price} amount = {item.amount} onRemove={cartItemRemoveHandler.bind(null,item.id)} onAdd={cartItemAddHandler.bind(null,item)}/>
      ))}
    </ul>
  );

  const modalActions = <div className={classes.actions}>
    <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
    {hasItems > 0 && <button className={classes.button} onClick={orderHandler}>Order</button>}
  </div>;

  const CartModalContent =  (<React.Fragment>{cartItems}
  <div className={classes.total}>
    <span>Total Amount</span>
    <span>{totalAmount}</span>
  </div>
  {isCheckout && <Checkout onConfirm = {submitHandler} onCancel = {props.onClose}/>}
  {!isCheckout && modalActions}
  </React.Fragment>);


const isSubmittingModalContent = <p>Sending order data...</p>;

const didSubmitModalContent = <React.Fragment>
<p>Successfully sent the order...</p>
<div className={classes.actions}>
    <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
  </div>

</React.Fragment>

  return (
    <Modal onClose={props.onClose}>
     {!isSubmitting && !didSubmit &&CartModalContent}
     {isSubmitting && isSubmittingModalContent}
     {!isSubmitting && didSubmit && didSubmitModalContent}
      
    </Modal>
  );
};

export default Cart;
