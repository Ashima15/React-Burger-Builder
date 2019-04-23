import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import queryString from 'query-string';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import Contact from './Contact/Contact';

class Checkout extends Component {

    state = {
        ingredients: { }
    }

    componentDidMount() {
        const queryParams = queryString.parse(this.props.location.search);
        const ingredients = {};
        let price = 0;
        for(let i in queryParams) {
            if(i === 'price') {
                price = +queryParams[i];
            } else {
                ingredients[i] = Number(queryParams[i]);
            }
        }
        this.setState({ ingredients, price });
    }

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
                    ingredients={this.state.ingredients} 
                    checkoutCancelHandler={this.checkoutCancelHandler}
                    checkoutContinueHandler={this.checkoutContinueHandler}
                />
                <Route 
                    path={this.props.match.path + '/contact' } 
                    render={(props) => (<Contact ingredients={this.state.ingredients} price={this.state.price} {...props}/>)}
                />
            </div>
        )
    }
}

export default Checkout;