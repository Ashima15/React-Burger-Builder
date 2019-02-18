import React from 'react';
import './Button.css';

const button = (props) => (
    <button className={['button', props.btnType].join(' ')} onClick={props.buttonClickhandler}>
        {props.children}
    </button>
)

export default button;