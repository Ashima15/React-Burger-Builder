import React from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    const ingredientItem = Object.keys(props.ingredients)
        .map((igKey, i) => {
            return (
                <li key={igKey+i}>
                    <span style={{textTransform: "capitalize"}}>{igKey}: </span>
                    {props.ingredients[igKey]}
                </li>
            )
        })

    return (
        <Aux>
            <h1>Order Summary</h1>
            <p>Your delicious burger has the following ingredients:</p>
            <ul>
                {ingredientItem}
            </ul>
            <p>Do you want to checkout?</p>
            <Button btnType="success" buttonClickhandler={props.successBtnHandler}>CONTINUE</Button>
            <Button btnType="danger" buttonClickhandler={props.dangerBtnHandler}>CANCEL</Button>
        </Aux>
    )
}

export default orderSummary;