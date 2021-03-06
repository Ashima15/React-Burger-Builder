import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import Contact from './Contact/Contact';

class Checkout extends Component {

    checkoutCancelHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinueHandler = () => {
        this.props.history.replace('/checkout/contact')
    }

    render() {
        return (
            <div>
                <CheckoutSummary 
                    ingredients={this.props.ings} 
                    checkoutCancelHandler={this.checkoutCancelHandler}
                    checkoutContinueHandler={this.checkoutContinueHandler}
                />
                <Route 
                    path={this.props.match.path + '/contact' } 
                    component={Contact}
                />
            </div>
        )
    }
}

const mapStateToProps = state =>  {
    return {
        ings: state.ingredients
    }
}

export default connect(mapStateToProps)(Checkout);