import React, { Component } from 'react';

import Aux from '../Aux/Aux';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/Sidedrawer/Sidedrawer';

import './Layout.css';

class Layout extends Component {

    state = {
        open: false
    }

    sideDrawerCloseHandler = () => {
        this.setState({ open: false })
    }   
    
    sideDrawerOpenHandler = () => {
        this.setState({ open: true })
    }

    render() {
        return (
            <Aux>
                <Toolbar menuClicked={this.sideDrawerOpenHandler}/>
                <SideDrawer open={this.state.open} closed={this.sideDrawerCloseHandler}/>
                <main className="content">
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

export default Layout;