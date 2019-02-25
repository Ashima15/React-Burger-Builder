import React from 'react';

import DrawerToggler from '../Sidedrawer/DrawerToggler/DrawerToggler';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

import './Toolbar.css';

const toolbar = (props) => (
    <header className="toolbar">
        <DrawerToggler clicked={props.menuClicked}/>
        <div className="logo-toolbar">
         <Logo />
        </div>
        <nav className="desktop-only">
            <NavigationItems />
        </nav>
    </header>

)

export default toolbar;