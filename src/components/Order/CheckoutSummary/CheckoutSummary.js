import React from 'react';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

import './CheckoutSummary.css';

const checkoutSummary = (props) => {
    return (
        <div className='checkoutSummary'>
            <h1>Hope it tastes well!!</h1>
            <div style={{width: '100%' , margin: 'auto'}}>
                <Burger ingredients={props.ingredients}/> 
            </div>
            <Button btnType='danger' buttonClickhandler={props.checkoutCancelHandler}>CANCEL</Button>
            <Button btnType='success' buttonClickhandler={props.checkoutContinueHandler}>CONTINUE</Button>
        </div>
    )
}

export default checkoutSummary;