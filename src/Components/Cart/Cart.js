import React from 'react';
import ReactDOMServer from "react-dom/server";
import Modal from '../UI/Modal';
import classes from './Cart.module.css';
import { useContext,useState } from 'react';
import CartContext from '../../Store/cart-context';
import Invoice from './Invoice';
import CartItem from './CartItem';
import Checkout from './CheckOut';
import {jsPDF} from 'jspdf';
import html2canvas from "html2canvas";


const Cart = (props) => {

  const cartCTX = useContext(CartContext);

  const [isCheckout, setIsCheckOut] = useState(false);

  const[isSubmitting,setIssubmitting] = useState(false);

  const[didSubmit,setDidSubmit] = useState(false);
  
  const [pdfUrl,setPdfUrl] = useState();
  const[pdfHtml,setpdfHtml] = useState();
  const [invoiceId,setInvoiceId] = useState("");



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

  const tableGenerator = (pdfData) =>{

   let headers = [];
   let rows=[];
  const userDetail = pdfData.user;
    const orderdetail = pdfData.orderedItems;
    console.log(orderdetail);

    for (const key in userDetail) 
    {
        headers.push(key);
        rows.push(userDetail[key]);
    }

  return <Invoice header={headers} row={rows} order={orderdetail} key={Math.random()} invoiceId={pdfData.orderId} Total={totalAmount}/>

  
  }

  const pdfGenerator = (pdfData)=>{
    const tableHTML = tableGenerator(pdfData);
    console.log(tableHTML);
    
    const elementHtml = ReactDOMServer.renderToStaticMarkup(tableHTML);
    setpdfHtml(elementHtml);
    // let  a4 = [595.28, 841.89];  
    const pdf = new jsPDF("p", "pt", "a4");

    pdf.setLineWidth(0.1);
pdf.setLineHeightFactor(1.2);
    
    pdf.html(elementHtml, {
      callback: function (doc) {
        const dataUri = doc.output("datauristring");
        setPdfUrl(dataUri);
      },
      x: 20,
    y: 20
    });

  
     
}

const pdfDownloadHandler = ()=>{
 
  const pd = new jsPDF("p", "pt", "letter");
  pd.html(pdfHtml, {
    callback: function (doc) {
      doc.save("data.pdf");
    },
    x: 20,
    y: 20
  });
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
        //  console.log(response);

         const data = await response.json();
    //      console.log(data);
    //  console.log(data.name);
     setInvoiceId(data.name);
  
         setIssubmitting(false);
         setDidSubmit(true);
         cartCTX.clearCart();
         
         pdfGenerator({
          user:userData,
          orderedItems:cartCTX.items,
          orderId:data.name
         });
        

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
<iframe src={pdfUrl} width="100%" height ="400px"></iframe>
<div className={classes.actions}>
    <button className={classes['button--alt']} onClick={pdfDownloadHandler}>Download Invoice</button>
  </div>
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
