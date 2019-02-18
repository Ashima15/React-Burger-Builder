import React from 'react';
import BuildControl from './BuildControl/BuildControl'

import './BuildControls.css';

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Meat', type: 'meat'}
]

const buildControls = (props) => (
    <div className="BuildControls">
        <p>Current price - <strong>{props.totalPrice}</strong> </p>
        {controls.map(control => (
            <BuildControl 
                key={control.label} 
                label={control.label}
                add={() => props.addIngredients(control.type)}
                remove={() => props.removeIngredients(control.type)}
                disabledInfo={props.disabledInfo[control.type]}
            />
        ))}
        <button className="OrderButton" onClick={props.purchasing} disabled={!props.purchaseable}>Order Now</button>
    </div>
)

export default buildControls;