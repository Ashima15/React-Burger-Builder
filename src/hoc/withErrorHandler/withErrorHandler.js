import React, { Component } from 'react';

import Aux from '../Aux/Aux';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {

        state = {
            error: null
        }

        componentWillMount = () => {
            this.reqInterceptors = axios.interceptors.request.use(res => {
                this.setState({ error: null })
                return res;
            })

            this.resInterceptors = axios.interceptors.response.use(res => res, err => {
                this.setState({ error: err })
            })
        }

        componentWillUnmount = () => {
            axios.interceptors.request.eject(this.reqInterceptors);
            axios.interceptors.response.eject(this.resInterceptors);
        }

        errorModalClose = () => {
            this.setState({ error: null })
        }

        render() {
            return (
                <Aux>
                    <Modal show={this.state.error} modalCloseHandler={this.errorModalClose}>
                        {this.state.error ? this.state.error.message : null }
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            )
        }
    }
}

export default withErrorHandler;