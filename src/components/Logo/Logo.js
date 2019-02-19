import React from 'react';
import './Logo.css';
import burgerLogo from '../../assets/images/burger-logo.png'

const logo = () => (
    <div className="logo">
        <img src={burgerLogo}/>
    </div>
)

export default logo;