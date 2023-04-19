import {Fragment} from 'react';
import mealsImage from '../../assets/mealsImage.jpg';
import classes from './Header.module.css';
import HeaderCartButton from './HeaderCartButton';
import HeaderMyOrder from './HeaderMyOrder';
const Header = props =>{
    return <Fragment>
        <header className={classes.header}>
        <h1>The Indian Kitchen</h1>
        <HeaderMyOrder showOrders={props.onShowOrders}/>
        <HeaderCartButton onClick={props.onShowCart}/>
        </header>
        <div>
        <div className={classes['main-image']}>
            <img src="https://media.gettyimages.com/id/1223580360/photo/indian-food-background.jpg?s=170667a&w=gi&k=20&c=tMt-8ezucql4FJPn1FIZ8eMlivktUXHsI_VPcGo9RXc=" alt="a table full of delicious food" className={classes['main-image']}/>
        </div>
        </div>
    </Fragment>
}

export default Header;