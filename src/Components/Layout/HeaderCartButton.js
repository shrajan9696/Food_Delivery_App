import CartIcon from "../Cart/CartIcon";
import { useContext,useEffect,useState } from "react";
import CartContext from "../../Store/cart-context";
import classes from './HeaderCartButton.module.css'
import React from "react";
const HeaderCartButton = props =>{
    const [btnIsHighlighted,setBtnIsHighlighted] = useState(false);
    const cartCTX = useContext(CartContext);
    const {items} = cartCTX;

    useEffect(()=>{
        if(cartCTX.length === 0){
            return ;
        }
        setBtnIsHighlighted(true);

       const timer =  setTimeout(()=>{
            setBtnIsHighlighted(false);
        },300);

        return ()=>{
            clearTimeout(timer);
        }
    },[items]);
    
    const numberOfCartItems = cartCTX.items.reduce((curNumber, item)=>{
        return curNumber + item.amount;
    }, 0);

    const btnClasses = `${classes.button} ${ btnIsHighlighted ? classes.bump:''}`;
    console.log(numberOfCartItems);
    
         return <button className={btnClasses} onClick={props.onClick}>
            <span className={classes.icon}>
                <CartIcon/>
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>
                {numberOfCartItems}
            </span>
         </button>
}

export default HeaderCartButton; 