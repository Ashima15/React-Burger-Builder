import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
    "cheese": 2,
    "meat": 4,
    "bacon": 5,
    "salad": 1
}

class BurgerBuilder extends Component {

    state={
        ingredients : {
            "cheese": 0,
            "meat": 0,
            "bacon": 0,
            "salad": 0
        },
        totalPrice: 4,
        purchaseable: false
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
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = updatedIngredientCount;

        const newPrice = INGREDIENT_PRICES[type] + this.state.totalPrice;

        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        })

        this.updatePurchaseable(updatedIngredients);
    }

    removedIngredient = (type) => {
        if(this.state.ingredients[type] <= 0) {
            return;
        }
        const updatedIngredientCount = this.state.ingredients[type] - 1;
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = updatedIngredientCount;

        const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];

        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        })

        this.updatePurchaseable(updatedIngredients);
    }

    render() {
        let disabledInfo = {...this.state.ingredients}
        for(let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        return (
            <Aux>
                <Modal>
                    <OrderSummary ingredients={this.state.ingredients}></OrderSummary>
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                    addIngredients={this.addedIngredient}
                    removeIngredients={this.removedIngredient}
                    disabledInfo={disabledInfo}
                    totalPrice={this.state.totalPrice}
                    purchaseable={this.state.purchaseable}
                />
            </Aux>
        )
    }
}

export default BurgerBuilder