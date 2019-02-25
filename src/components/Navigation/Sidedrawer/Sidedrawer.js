import React from 'react';

import './Sidedrawer.css';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Aux from '../../../hoc/Aux/Aux';
import Backdrop from '../../UI/Backdrop/Backdrop';

const sidedrawer = (props) => {
    let attachedClasses = ["sidedrawer"];
    props.open ? attachedClasses.push("open") : attachedClasses.push("close");

    return (
        <Aux>
            <Backdrop show={props.open} clickBackdrop={props.closed}/>
            <div className={attachedClasses.join(' ')}>
                <div className="logo-sidedrawer">
                    <Logo />
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Aux>
        
    )
}

export default sidedrawer;