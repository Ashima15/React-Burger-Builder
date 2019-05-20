import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

import './Contact.css';

import axios from '../../../axios-orders';

class Contact extends Component {
    state = {
        order: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your E-Mail'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipcode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zip code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 10
                },
                valid: false,
                touched: false
            },
            state: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'State'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: 'fastest',
                validation: {

                },
                valid: true
            },
        },
        formIsValid: false,
        loading: false
    }

    orderHandler = (e) => {
        e.preventDefault();
        this.setState({
            loading: true
        })

        const formData = {}
        for(let key in this.state.order) {
            formData[key] = this.state.order[key].value;
        }

        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: formData
        }

        console.log(order)
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({ loading: false })
                this.props.history.push('/');
            })
            .catch(err => {
                this.setState({ loading: false })
            })
    }

    checkValidity = (value, rules) => {
        let isValid = true;

        if(rules.required) {
            isValid = value.trim !== '' && isValid;
        }

        if(rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if(rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        console.log(isValid)
        return isValid;
    }

    inputChange = (e, inputIdentifier) => {
        let updatedOrder = this.state.order;
        updatedOrder[inputIdentifier].value = e.target.value;
        updatedOrder[inputIdentifier].touched = true;
        updatedOrder[inputIdentifier].valid = this.checkValidity(e.target.value, updatedOrder[inputIdentifier].validation)
        
        debugger
        let formIsValid = true;
        for(let inputIdentifier in updatedOrder) {
            formIsValid = updatedOrder[inputIdentifier].valid && formIsValid;
        }

        console.log(formIsValid)

        this.setState({
            order: updatedOrder,
            formIsValid
        })
    }

    render() {

        let formElements = [];
        for(let key in this.state.order) {
            formElements.push({
                id: key,
                config: this.state.order[key]
            })
        }

        let form = (
            <form>
                
                {
                    formElements.map(formElement => (
                        <Input 
                            key={formElement.id}
                            elementType={formElement.config.elementType} 
                            elementConfig={formElement.config.elementConfig} 
                            value={formElement.value}
                            changed={(e) => this.inputChange(e, formElement.id)}
                            validity={!formElement.config.valid}
                            shouldValidate={formElement.config.validation}
                            touched={formElement.config.touched}
                        />
                    ))
                }
                
                <Button disabled={!this.state.formIsValid} btnType='success' buttonClickhandler={this.orderHandler}>ORDER</Button>
            </form>
        )
        if(this.state.loading) 
            form = <Spinner />


        return (
            <div className='contact-form-container'>
                <h4>Enter your contact details</h4>
                {form}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}

export default connect(mapStateToProps)(Contact);