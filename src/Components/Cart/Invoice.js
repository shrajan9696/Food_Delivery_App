import React from "react";
import { useContext } from "react";
import InvoiceOrder from "./InvoiveOrder";
import './Invoice.css';

const Invoice = (props) =>{

  

  const header = props.header;
  const rows = props.row;
  const order = props.order;

  const total = props.Total;
 console.log(props.invoiceId);
    return(
        <div>
       <div style={{whiteSpace:"nowrap"}}> <p>Order-id</p></div>
       <div style={{whiteSpace:"nowrap",textAlign:"center"}}><b><p>{props.invoiceId}</p></b></div>
        <div style={{whiteSpace:"nowrap"}}><h4> Customer-Details </h4></div>
  <table>
    <thead><tr>{header.map(item => <th>{item}</th>)}</tr></thead>


    <tbody><tr>{rows.map(item=><td>{item}</td>)}</tr></tbody>
  </table>
  <div style={{whiteSpace:"nowrap"}}><h4> Order-Details </h4></div>
  <table>
  <thead>
  <tr>
  <th>id</th>
  <th>name</th>
  <th>amount</th>
  <th>price</th>
  </tr>
  </thead>
  
  <tbody>
 {order.map((item)=> <InvoiceOrder key={item.id} name={item.name} id={item.id} price={item.price} amount={item.amount} />)}
 </tbody>
 <tfoot>
 <div style={{whiteSpace:"nowrap"}}><h2>Total Amount : {total}</h2></div>
 </tfoot>
  </table>

 

        </div>
    );
}

export default Invoice;