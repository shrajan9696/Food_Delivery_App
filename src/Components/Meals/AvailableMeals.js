import classes from './AvailableMeals.module.css';
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import { useEffect, useState } from 'react';


const AvailableMeals = () => {

  const [meals,setMeals] = useState([]);

  const[isLoading,setIsLoading] = useState(true);

  const[httpError,sethttpError] = useState(null);


  useEffect(()=>{

    async function fetchMeals() {

  
     
      const response = await fetch('https://react-http-5bc5a-default-rtdb.firebaseio.com/meals.json');
      if(!response.ok){
         throw new Error('Something went wrong');
       }

      const data = await response.json();
      console.log(data);
      const updatedMeals = [];
      for(const key in data){
        updatedMeals.push({
          id: key,
        name: data[key].name,
        description: data[key].description,
        price: data[key].price
        })
      }
      setMeals(updatedMeals);
      setIsLoading(false);
    }
  
 
  
    fetchMeals().then(()=>console.log("success")).catch(err=>{
      setIsLoading(false);
      sethttpError(err.message);
    });
  
  

  },[]);

  
  
  if(isLoading){
    return (
      <section className ={classes.MealsLoading}>
        <p>Loading ... </p>
      </section>
    )
  }

  if(httpError){
    return(
    <section className ={classes.MealsError}>
    <p>{httpError} </p>
  </section>
    );
  }

  const mealsList = meals.map((meal) =>
  (<MealItem
    key={meal.id}
    id={meal.id}
    name={meal.name}
    description={meal.description}
    price={meal.price} />
  ));

  
  return <section className={classes.meals}>
    <Card>
      <ul>
       {mealsList}
      </ul>
    </Card>
  </section>
}
export default AvailableMeals;