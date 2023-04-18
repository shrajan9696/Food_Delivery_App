import React from "react";
import { useRef,useState } from "react";
import classes from '../Cart/CheckOut.module.css'

import Modal from "../UI/Modal";
import Invoice from "../Cart/Invoice";



const Order = (props) =>{


    const orderIdref = useRef();
      const [isShown,setIsShown] = useState(false);
      const[deatails,setDetails] = useState();
    async function submitHandler(event){
       event.preventDefault();
       
        const orderId = orderIdref.current.value;
          console.log(orderId);
        const response = await fetch('https://react-http-5bc5a-default-rtdb.firebaseio.com/orders.json');
        if(!response.ok){
           throw new Error('Something went wrong');
         }
          const data = await response.json();
         if(data.hasOwnProperty(orderId)){
            // console.log(data[orderId]);
             const userData = data[orderId];
            const rows =[];
            const headers =[];
            const userDetail = userData.user;
            const orderdetail = userData.orderedItems;
            console.log(orderdetail);
        
            for (const key in userDetail) 
            {
                headers.push(key);
                rows.push(userDetail[key]);
            }
       let Total = 0;
            orderdetail.forEach(element => {
                   Total = Total+element.price;
            });

            const netTotal = Total.toFixed(2);
        
       setDetails(<Invoice header={headers} row={rows} order={orderdetail} key={Math.random()} invoiceId={orderId} Total={netTotal} />)
       setIsShown(true);

        }
        else{
          setDetails(<p>Invalid Order Id ...</p>)
          setIsShown(true);
        }
    }


   
      


    
    return (
    <Modal>
    

<form className={classes.form} onSubmit={submitHandler} style={{"height":"auto"}}>
      <div className={classes.control}>
        <label htmlFor='Order Id'>Enter Your Order Id</label>
        
      
        <input type='text' id='name' ref={orderIdref} style={{width: "-webkit-fill-available","margin-bottom": "inherit","textAlign":"center","letterSpacing":"1px"}} placeholder="Your order id should start with hyphen '-' "/>
       
      </div>
      
       <div className={classes.actions} style={{flexDirection: "column-reverse"}}>
        <button type='button' onClick={props.onClose}>
          Cancel
        </button>
        <button className={classes.submit} onClick={submitHandler} >Confirm</button>
      </div>

      </form>
      {isShown && deatails }
</Modal>
    );

} 

export default Order;