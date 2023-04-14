import Modal from '../UI/Modal';
import classes from './Cart.module.css';
import { useContext } from 'react';
import CartContext from '../../Store/cart-context';
import CartItem from './CartItem';
const Cart = (props) => {

  const cartCTX = useContext(CartContext);

  const totalAmount = `$${cartCTX.totalAmount.toFixed(2)}`;

  const hasItems = cartCTX.items.length;
  const cartItemRemoveHandler = (id)=>{
       cartCTX.removeItem(id);
  }

  const cartItemAddHandler = item =>{
          cartCTX.addItem({...item,amount:1});
  }

  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCTX.items.map((item) => (
       <CartItem key={item.id} name={item.name} price={item.price} amount = {item.amount} onRemove={cartItemRemoveHandler.bind(null,item.id)} onAdd={cartItemAddHandler.bind(null,item)}/>
      ))}
    </ul>
  );

  return (
    <Modal>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
        {hasItems>0 && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;
