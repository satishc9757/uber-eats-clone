import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react'
import {Modal, Button} from 'react-bootstrap'
import { Link } from 'react-router-dom';
import {GRAPHQL_SERVER_ENDPOINT, SERVER_ENDPOINT} from '../../constants/serverConfigs'
import axios from'axios';
import { UPDATE_ORDER_STATUS } from '../../../graphql/mutations';

class UpdateStatusModal  extends Component {

    state = {
        showUpdate: false,
        resStatus:"",
        orderId:""
    }

    handleClose = () => this.setState({
        showUpdate: false,
    });

    handleShow = () => this.setState({
        showUpdate: true,
    });

    componentDidMount(){
        const orderId = this.props.orderId;
        this.setState({orderId: orderId});
    }
    handleSubmit = async (event) => {
        event.preventDefault();
        console.log("here is the prop : ",this.props.resId);
        // const url = SERVER_ENDPOINT+"/res/order/status";
            // axios
            //     .put(url, {orderId: this.state.orderId, orderStatus: this.state.resStatus})
            //     .then(response => {
            //         console.log(response);
            //         this.setState({
            //             showUpdate: false,
            //         });
            //         this.props.onSuccessfulUpdate();
            //     })
            //     .catch(err => {
            //         console.log(err);
            //     });

            const url = GRAPHQL_SERVER_ENDPOINT + "/updateOrderStatus";
            const query = UPDATE_ORDER_STATUS;

            const response = await axios.post(url, {
                query,
                variables: {orderId: this.state.orderId, orderStatus: this.state.resStatus},
            });
            console.log("Response from order status update : "+JSON.stringify(response))
            console.log("Response data : "+JSON.stringify(response.data))
            const data = await response.data.data.updateOrderStatus;
            if(data){
                this.setState({
                                showUpdate: false,
                            });
                this.props.onSuccessfulUpdate();
            }
    }

    onChangeField = (event) => {
        this.setState({resStatus: event.target.value});
    }

    render(){
        return (
            <div className="cart-modal">
                    {/* <a  onClick={this.handleShow}>View Details</a> */}
                    <button className="btn btn-uber rounded-pill" onClick={this.handleShow}>
                        Update Status
                    </button>

                    <Modal show={this.state.showUpdate} onHide={this.handleClose}>
                        <Modal.Header>
                        <Modal.Title>Update Order Status</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                        <div class="container-fluid">
                            <form onSubmit={this.handleSubmit}>
                            <div className="form-floating">
                                                <select
                                                    name="resStatus"
                                                    value = {this.state.resStatus}
                                                    onChange = {this.onChangeField}>
                                                    <option selected></option>
                                                    <option value="Order Received">Order Received</option>
                                                    <option value="Preparing">Preparing</option>
                                                    <option value="On the way">On the way</option>
                                                    <option value="Delivered">Delivered</option>
                                                    <option value="Pick up Ready">Pick up Ready</option>
                                                    <option value="Picked up">Picked up</option>
                                                    <option value="Cancelled">Cancel</option>
                                                </select>

                                                    {/* <div className="invalid">{this.state.custLastNameError}</div> */}
                                                </div>
                                                <input type="submit" className="btn btn-uber"/>
                            </form>
                        </div>
                        </Modal.Body>
                        <Modal.Footer>
                        {/* <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button> */}

                            <Button variant="uber" onClick={this.handleClose}>
                                Close
                            </Button>
                        {/* <button type="button" class="btn btn-uber btn-lg btn-block">Go to checkout</button> */}
                        </Modal.Footer>
                    </Modal>
                </div>
        )
    }

}

export default UpdateStatusModal
