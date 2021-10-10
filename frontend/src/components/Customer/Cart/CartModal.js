
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react'
import {Modal, Button} from 'react-bootstrap'
import { Link } from 'react-router-dom';
class CartModal extends Component{

    state = {
        showCart: false,
        cartInfo: {
            cartResName: "",
            cartItems : []
        }
    }


    handleClose = () => this.setState({
        showCart: false,
    });
    
    handleShow = () => this.setState({
        showCart: true,
    });

    componentDidMount(){
        // const cartInfo = sessionStorage.getItem("custCart");
        // console.log("inside component did u");
        // console.log("cartInfo : "+cartInfo);
        // if(cartInfo){
        //     this.setState({cartInfo: JSON.parse(cartInfo)});
        // }
        
    }

    renderCartItem = (item) => {
        return(
            <div class="row">
                <div class="col-md-2">{item.dishQuantity}</div>
                <div class="col-md-8">{item.dishName}</div>
                <div class="col-md-2">${item.dishPrice}</div>
            </div>         
        ) 
    }

    render(){

        let cartInfo = sessionStorage.getItem("custCart");
        
        let cartItemsData = "";
        let cartResName = "";
        
        if(!cartInfo){
            cartItemsData = <p>Cart is empty</p>;
        } else {
            cartInfo = JSON.parse(cartInfo);
            cartItemsData = cartInfo.cartItems.map(this.renderCartItem) ;
            cartResName = cartInfo.cartResName;
        }
        
        

        return (

            <div className="cart-modal">
                <button className="btn btn-uber rounded-pill" onClick={this.handleShow}>
                    <FontAwesomeIcon icon={faShoppingCart} /> 
                </button>

                <Modal show={this.state.showCart} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>{cartResName}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <div class="container-fluid">
                        {cartItemsData}
                    </div>
                    </Modal.Body>
                    <Modal.Footer>
                    {/* <Button variant="secondary" onClick={this.handleClose}>
                        Close
                    </Button> */}
                    <Link className="res-card" to={"/checkout"}>
                        <Button variant="uber" onClick={this.handleClose}>
                            Go to checkout
                        </Button>
                    </Link>
                    {/* <button type="button" class="btn btn-uber btn-lg btn-block">Go to checkout</button> */}
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
    
}

export default CartModal
