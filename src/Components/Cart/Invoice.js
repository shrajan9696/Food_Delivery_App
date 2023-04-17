import InvoiceOrder from "./InvoiveOrder";

const Invoice = (props) =>{

  const header = props.header;
  const rows = props.row;
  const order = props.order;

  
 
    return(
        <div>
            <h1> Customer Details </h1>
  <table>
    <thead><tr>{header.map(item => <th>{item}</th>)}</tr></thead>


    <tbody><tr>{rows.map(item=><td>{item}</td>)}</tr></tbody>
  </table>
  <h1> Order detail </h1>
  <table>
  <thead>
  <tr>
  <th>id</th>
  <th>name</th>
  <th>amount</th>
  <th>price</th>
  </tr>
  </thead>


 {order.map((item)=> <InvoiceOrder key={item.id} name={item.name} id={item.id} price={item.price} amount={item.amount}/>)}
   
    
  </table>
        </div>
    );
}

export default Invoice;