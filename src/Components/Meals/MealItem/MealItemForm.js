import classes from './MealItemForm.module.css';
import Input from '../../UI/Input';
import { useRef,useState } from 'react';
const MealItemForm = props =>{
    const[amountIsValid,setAmountIsValid] = useState(true);
    const amountInputref = useRef();

    const submitHandler = (event) =>{
        event.preventDefault();

        const enteredAmount = amountInputref.current.value;
        const enteredAmountNumber = +enteredAmount;
        if(enteredAmount.trim().length === 0 || enteredAmountNumber < 1 || enteredAmountNumber>5){
            setAmountIsValid(false);
            return;
        }

        props.onAddToCart(enteredAmountNumber);
        
    }
    return <form className={classes.form} onSubmit={submitHandler}>
       <Input label="Amount" ref={amountInputref} input={{
       
        id:'amount',
        type:'number',
        min:'1',
        maxx:'5',
        step:'1',
        defaultValue:'1'
       }}/>
        <button>+ Add</button>
        {!amountIsValid && <p>Please enter a valid amount</p>}
    </form>
}

export default MealItemForm;