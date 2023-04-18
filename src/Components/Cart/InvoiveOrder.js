import './Invoice.css';
const InvoiceOrder = (props) =>{
    return (
        <tr>
        <td>{props.id}</td>
        <td>{props.name}</td>
        <td>{props.amount}</td>
        <td>{props.price}</td>
        </tr>
    );
}

export default InvoiceOrder;