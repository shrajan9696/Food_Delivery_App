import { useContext } from 'react';
import CartContext from '../../../Store/cart-context';
import image from '../../../assets/mealsImage.jpg';

import classes from './MealItem.module.css';
import MealItemForm from './MealItemForm';
import Card from '../../UI/Card';
const MealItem = props =>{
    const cartCTX = useContext(CartContext);
    const price = `₹${props.price.toFixed(2)}`;

    const AddToCartHandler = (amount) =>{
            cartCTX.addItem({
                id:props.id,
                name:props.name,
                amount:amount,
                price:props.price,
                link:props.link
            })
    }
   return <li className={classes.meal}>
    <div className={classes.parent}>
        <img src={props.link}/>
    </div>
   <div className={classes.content}>
      <div><h3>{props.name}</h3></div>
       <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
         
    </div>
    
   <div>
         <MealItemForm onAddToCart = {AddToCartHandler}/>
   </div>

   </li>
}
export default MealItem;

