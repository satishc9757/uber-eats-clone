import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react'
import {Modal, Button} from 'react-bootstrap'
import { Link } from 'react-router-dom';
import {SERVER_ENDPOINT} from '../../constants/serverConfigs'
import axios from'axios';

class OrderSummaryModal extends Component {

    state = {
        showSummary: false,
        orderDetailsData : [{
            dishName: "Sandwich",
            odQuantity: "2",
            odPrice: "23.00"
        }, {
            dishName: "Burrito",
            odQuantity: "3",
            odPrice: "25.00"
        }, {
            dishName: "Chipotle",
            odQuantity: "5",
            odPrice: "27.00"
        }]
    }

    handleClose = () => this.setState({
        showSummary: false,
    });

    handleShow = () => this.setState({
        showSummary: true,
    });

    async componentDidMount(){
        try{
            const orderId = this.props.orderId;

            const url = SERVER_ENDPOINT + "/res/orderdetails?orderId="+6; //hardcoded for now
            const response = await axios.get(url);
            const data = await response.data;
            console.log("order details data : "+JSON.stringify(data));
            //this.setState({orderDetailsData: data});
        } catch(err){
            console.log(err);
        }
    }

    renderItem = (item) => {
        return(
            <li class="list-group-item">
                <div class="row">
                    <div class="col-md-1 rounded-pill grey-round-bg">{item.odQuantity}</div>
                    <div class="col-md-8">{item.dishName}</div>
                    <div class="col-md-3">${item.odPrice}</div>
                </div>
            </li>
        )
    }

    render(){
        return (
            <div className="cart-modal">
                    <a  onClick={this.handleShow}>View Details</a>
                    {/* <button className="btn btn-uber rounded-pill" onClick={this.handleShow}>

                    </button> */}

                    <Modal show={this.state.showSummary} onHide={this.handleClose}>
                        {/* <Modal.Header closeButton>
                        <Modal.Title></Modal.Title>
                        </Modal.Header> */}
                        <Modal.Body>
                        <div class="container-fluid">
                            <h4>Total : ${this.props.total}</h4>
                            <div class="items">
                             <div class="card">
                                <ul class="list-group list-group-flush">
                                    {this.state.orderDetailsData.map(this.renderItem)}
                                </ul>
                                </div>
				 			</div>

                             <h5>Delivery Address</h5>
                             <p>{this.props.deliveryAddress}</p>

                             <h5>Special Instructions</h5>
                             <p>{this.props.specialInstructions ? this.props.specialInstructions : "None"}</p>
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

export default OrderSummaryModal
