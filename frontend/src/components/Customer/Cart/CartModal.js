
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react'
import {Modal, Button} from 'react-bootstrap'
class CartModal extends Component{

    state = {
        showCart: false,
        cartInfo: {
            cartResName: "La Vic",
            cartItems : [{ dishName: "Sandwich",
                            dishQty: 1,
                            disPrice: 15},
                            { dishName: "Burrito",
                            dishQty: 2,
                            disPrice: 20},
                            { dishName: "Burger",
                            dishQty: 1,
                            disPrice: 23}]
        }
    }


    handleClose = () => this.setState({
        showCart: false,
    });
    
    handleShow = () => this.setState({
        showCart: true,
    });


    renderCartItem = (item) => {
        return(
            <div class="row">
                <div class="col-md-2">{item.dishQty}</div>
                <div class="col-md-8">{item.dishName}</div>
                <div class="col-md-2">${item.disPrice}</div>
            </div>         
        ) 
    }

    render(){
        return (

            <div className="cart-modal">
                <button className="btn btn-uber rounded-pill" onClick={this.handleShow}>
                    <FontAwesomeIcon icon={faShoppingCart} />
                </button>

                <Modal show={this.state.showCart} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>{this.state.cartInfo.cartResName}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <div class="container-fluid">
                        {this.state.cartInfo.cartItems.map(this.renderCartItem)}   
                    </div>
                    </Modal.Body>
                    <Modal.Footer>
                    {/* <Button variant="secondary" onClick={this.handleClose}>
                        Close
                    </Button> */}
                    <Button variant="uber" onClick={this.handleClose}>
                        Go to checkout
                    </Button>
                    {/* <button type="button" class="btn btn-uber btn-lg btn-block">Go to checkout</button> */}
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
    
}

export default CartModal
