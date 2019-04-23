import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import './Contact.css';
import axios from '../../../axios-orders';

class Contact extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = (e) => {
        e.preventDefault();
        this.setState({
            loading: true
        })
        const orderData = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customerDetails: {
                name: 'Ashima Walia',
                email: 'ashima@gmail.com',
                address: {
                    street: '21 Baker Street',
                    zicode: '1234',
                    state: 'London',
                    country: 'England'
                }
            },
            deliveryMethod: 'fastest'
        }
        console.log(orderData)
        axios.post('/orders.json', orderData)
            .then(response => {
                this.setState({ loading: false })
                this.props.history.push('/');
            })
            .catch(err => {
                this.setState({ loading: false })
            })
    }

    render() {
        let form = (
            <form>
                <input type='text' name='name' placeholder='Your Name' />
                <input type='email' name='email' placeholder='Your Email' />
                <input type='text' name='street' placeholder='Street' />
                <input type='text' name='postalCode' placeholder='Postal Code' />
                <Button btnType='success' buttonClickhandler={this.orderHandler}>ORDER</Button>
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

export default Contact;