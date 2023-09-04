import classes from './HeaderCartButton.module.css';
import CartIcon from "../Cart/CartIcon";
const HeaderMyOrder = (props) =>{
   
    return <>
       <button className={classes.button} onClick={props.status===true?props.showOrders:props.onClick}>
    <span className={classes.icon}>
       

    </span>
   
    <span className={classes.icon}>
                <CartIcon/>
            </span>
            <span>My Orders</span>
 </button>
    </>
}

export default HeaderMyOrder;