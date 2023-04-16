import Modal from '../UI/Modal';
import classes from './Cart.module.css';
import { useContext,useState } from 'react';
import CartContext from '../../Store/cart-context';
import CartItem from './CartItem';
import Checkout from './CheckOut';
const Cart = (props) => {

  const cartCTX = useContext(CartContext);

  const [isCheckout, setIsCheckOut] = useState(false)

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

  return (
    <Modal>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && <Checkout onCancel = {props.onClose}/>}
      {!isCheckout && modalActions}
      
    </Modal>
  );
};

export default Cart;
