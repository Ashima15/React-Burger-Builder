import React from 'react';
import './DrawerToggler.css';

const drawerToggler = (props) => (
    <div className="DrawerToggle" onClick={props.clicked}>
        <div></div>
        <div></div>
        <div></div>
    </div>
)

export default drawerToggler;