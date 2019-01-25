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
        {controls.map(control => (
            <BuildControl key={control.label} label={control.label}/>
        ))}
    </div>
)

export default buildControls;