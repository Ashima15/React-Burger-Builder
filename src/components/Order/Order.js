import React from 'react';
import './Order.css';

const order = (props) => {

    const ingredrients = [];
    for(let ingredrientName in props.ingredients) {
        console.log(ingredrientName)
        console.log(props.ingredients[ingredrientName])
        debugger
        ingredrients.push({ 
            name: ingredrientName,
            amount: props.ingredients[ingredrientName]
        })
    }

    const ingredientInput = ingredrients.map(ig => {
        return (
            <span
                style = {{
                    textTransform: 'capitalize',
                    border: '1px solid #ccc',
                    padding: '5px',
                    margin: '0px 8px',
                    display: 'inline-block'
                }}
                key={ig.name}
            >
                {ig.name} ( {ig.amount} ) 
            </span>
        )
    })

    return (
        <div className='order'>
            <p>Ingredients: {ingredientInput}</p>
            <p>Price: <strong>Rs {props.price}</strong></p>
        </div>
    )
    
}

export default order;