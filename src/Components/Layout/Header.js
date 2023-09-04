import {Fragment, useState} from 'react';
import mealsImage from '../../assets/mealsImage.jpg';
import classes from './Header.module.css';
import HeaderCartButton from './HeaderCartButton';
import HeaderMyOrder from './HeaderMyOrder';
import Login from '../SignIn';
import {
    MatchText,
    SearchProvider,
    SearchContext,
    SearchEventContext,
  } from 'react-ctrl-f';

const Header = props =>{
    const [isLogin, setLogin] = useState(false);
    const signInHandler = (data)=>{
            setLogin(data);
    }

    return <Fragment>
        <header className={classes.header}>
        <div className={classes.search}>
        <h1 className={classes.heading} >The Indian Kitchen</h1>
        </div>
        {!isLogin && <HeaderMyOrder onClick={props.onShowWithoutLogin} status={isLogin}/>} 
      {isLogin && <HeaderMyOrder showOrders={props.onShowOrders} status={isLogin}/>}  

        {isLogin && <HeaderCartButton onClick={props.onShowCart}  status={isLogin}/>}
        {!isLogin && <HeaderCartButton onClick={props.onShowWithoutLogin}  status={isLogin}/>}
       
        <Login isSignIn={signInHandler}/>
        
        </header>
        <div>
        <div className={classes['main-image']}>
            <img src="https://media.gettyimages.com/id/1223580360/photo/indian-food-background.jpg?s=170667a&w=gi&k=20&c=tMt-8ezucql4FJPn1FIZ8eMlivktUXHsI_VPcGo9RXc=" alt="a table full of delicious food" className={classes['main-image']}/>
        </div>
        </div>
    </Fragment>
}

export default Header;