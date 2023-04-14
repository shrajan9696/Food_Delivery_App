import CartIcon from "../Cart/CartIcon";
import { useContext } from "react";
import CartContext from "../../Store/cart-context";
import classes from './HeaderCartButton.module.css'
import React from "react";
const HeaderCartButton = props =>{
    const cartCTX = useContext(CartContext);
    const numberOfCartItems = cartCTX.items.reduce((curNumber, item)=>{
        return curNumber + item.amount;
    }, 0);
    console.log(numberOfCartItems);
    
         return <button className={classes.button} onClick={props.onClick}>
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