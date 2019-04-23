import React, { Component } from 'react';
import axios from '../../axios-orders';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    "cheese": 2,
    "meat": 4,
    "bacon": 5,
    "salad": 1
}

class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalPrice: 4,
        purchaseable: false,
        purchasing: false,
        loading: false,
        error: null
    }

    componentDidMount () {
        axios.get('/ingredients.json')
            .then(res => this.setState({ ingredients: res.data }))
            .catch(error => this.setState({ error: true }))
    }

    updatePurchaseable = (ingredients) => {
        const sumIngredients = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0)

        this.setState({
            purchaseable: sumIngredients > 0
        })
    }

    addedIngredient = (type) => {
        const updatedIngredientCount = this.state.ingredients[type] + 1;
        const updatedIngredients = { ...this.state.ingredients };
        updatedIngredients[type] = updatedIngredientCount;

        const newPrice = INGREDIENT_PRICES[type] + this.state.totalPrice;

        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        })

        this.updatePurchaseable(updatedIngredients);
    }

    removedIngredient = (type) => {
        if (this.state.ingredients[type] <= 0) {
            return;
        }
        const updatedIngredientCount = this.state.ingredients[type] - 1;
        const updatedIngredients = { ...this.state.ingredients };
        updatedIngredients[type] = updatedIngredientCount;

        const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];

        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        })

        this.updatePurchaseable(updatedIngredients);
    }

    purchaseHandler = () => {
        this.setState({
            purchasing: true
        })
    }

    purchaseCancelHandler = () => {
        this.setState({
            purchasing: false
        })
    }

    purchaseSuccessHandler = () => {
        // alert('You can wait for it to arrive');

        const queryParams = [];
        for(let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
        }
        queryParams.push('price=' + this.state.totalPrice)

        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryParams.join('&')
        })
    }

    render() {
        let disabledInfo = { ...this.state.ingredients }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner />;
        let orderSummary = null;
        
        if(this.state.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                        addIngredients={this.addedIngredient}
                        removeIngredients={this.removedIngredient}
                        disabledInfo={disabledInfo}
                        totalPrice={this.state.totalPrice}
                        purchaseable={this.state.purchaseable}
                        purchasing={this.purchaseHandler}
                    />
                </Aux>
            )
            orderSummary = <OrderSummary
                ingredients={this.state.ingredients}
                price={this.state.totalPrice}
                successBtnHandler={this.purchaseSuccessHandler}
                dangerBtnHandler={this.purchaseCancelHandler} >
            </OrderSummary>
        }
        
        if(this.state.loading){
            orderSummary = <Spinner />
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalCloseHandler={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        )
    }
}

export default withErrorHandler(BurgerBuilder, axios);