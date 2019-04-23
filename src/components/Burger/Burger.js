import React from 'react';

import BurgerIngredients from './BurgerIngredients/BurgerIngredients';

import './Burger.css';

const burger = (props) => {
    let transformedIngredients = Object.keys(props.ingredients)
        .map(ingredient => {
            return [...Array(props.ingredients[ingredient])].map((_, i) => {
                return <BurgerIngredients key={ingredient+i} type={ingredient} />
            })
        })
        .reduce((arr, el) => {
            return arr.concat(el)
        }, [])

    if(transformedIngredients.length === 0) {
        transformedIngredients = <p>Please add ingredients!</p>
    }

    return (
        <div className="Burger">
            <BurgerIngredients type="bread-top"></BurgerIngredients>
            {transformedIngredients}
            <BurgerIngredients type="bread-bottom"></BurgerIngredients>
        </div>
    )
}

export default burger;