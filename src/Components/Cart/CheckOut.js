import classes from './CheckOut.module.css';
import { useRef,useState } from 'react';

const isEmpty = value =>{ return value.trim()===''};
// const isNotFiveChars = value =>{value.trim().length!==5};


const Checkout = (props) => {

  const [formInputsIsValidity,setFormInputsIsValidity] = useState({
    name:true,
    street:true,
    city:true,
    postal:true
   
  });

  const nameInputRef = useRef();
    const streetInputref = useRef();
    const postalInputRef = useRef();
    const cityInputref = useRef();


  const confirmHandler = (event) => {
    event.preventDefault();

    
      const enteredName = nameInputRef.current.value;
      const enteredStreet=streetInputref.current.value;
      const enteredPostalCode = postalInputRef.current.value;
      const enteredCityCode= cityInputref.current.value;

      

      const enteredNameIsValid = !isEmpty(enteredName);
      const enteredStreetIsValid = !isEmpty(enteredStreet);
      const enteredCityIsValid = !isEmpty(enteredCityCode);
      const enteredPostalIsValid = !isEmpty(enteredPostalCode); 

      setFormInputsIsValidity({
        name:enteredNameIsValid,
        street:enteredStreetIsValid,
        city:enteredCityIsValid,
        postal:enteredPostalIsValid
        
      })

      const formIsValid = enteredNameIsValid && enteredStreetIsValid && enteredCityIsValid && enteredPostalIsValid;


     if(!formIsValid){
      return;
     }

     props.onConfirm({
      name:enteredName,
      street:enteredStreet,
      city:enteredCityCode,
      postalCode:enteredPostalCode

     })
    
    
  };
  const nameControlClasses = `${classes.control} ${
    formInputsIsValidity.name ? '' : classes.invalid
  }`;

  const streetControlClasses = `${classes.control} ${
    formInputsIsValidity.street ? '' : classes.invalid
  }`;

  const cityControlClasses = `${classes.control} ${
    formInputsIsValidity.city ? '' : classes.invalid
  }`;

  const postalControlClasses = `${classes.control} ${
    formInputsIsValidity.postal ? '' : classes.invalid
  }`;


  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={nameInputRef} />
        {!formInputsIsValidity.name && <p>Please enter a valid name</p>}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' ref={streetInputref} />
        {!formInputsIsValidity.street && <p>Please enter a valid street</p>}
      </div>
      <div className={postalControlClasses}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' ref={postalInputRef} />
        {!formInputsIsValidity.postal && <p>Please enter a valid postal</p>}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref={cityInputref} />
        {!formInputsIsValidity.city && <p>Please enter a valid city</p>}
      </div>
       <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit} onClick={confirmHandler}>Confirm</button>
      </div>

      </form>

     
   
  );
};

export default Checkout;

