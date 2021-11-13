
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
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
        },
        isCartChanged : false
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
    removeItem = (itemIndex)=>{

        let cartInfo = sessionStorage.getItem("custCart");

        if(cartInfo){
            cartInfo = JSON.parse(cartInfo);
            let cartItems = cartInfo.cartItems;
            cartItems = cartItems.filter((el, i) => i !== itemIndex);
            cartInfo.cartItems = cartItems;
            sessionStorage.setItem("custCart", JSON.stringify(cartInfo));
        }

        // console.log("itemIndex "+itemIndex);
        // let cartInfo = this.state.cartInfo;
        // cartInfo.cartItems = cartInfo.cartItems.filter((el, i) => i !== itemIndex);
        // console.log("cartInfo.cartItems "+ cartInfo.cartItems );
        this.setState({isCartChanged: true});
    }


    updateCart = (event, itemIndex) => {
        let cartInfo = sessionStorage.getItem("custCart");

        if(cartInfo){
            cartInfo = JSON.parse(cartInfo);
            let cartItem = cartInfo.cartItems[itemIndex];
            cartItem.dishQuantity = event.target.value;
            sessionStorage.setItem("custCart", JSON.stringify(cartInfo));
        }

        // console.log("itemIndex "+itemIndex);
        // let cartInfo = this.state.cartInfo;
        // cartInfo.cartItems = cartInfo.cartItems.filter((el, i) => i !== itemIndex);
        // console.log("cartInfo.cartItems "+ cartInfo.cartItems );
        this.setState({isCartChanged: true});
    }

    renderCartItem = (item, index) => {
        console.log("index "+index);
        return(
            <div class="row">
                <div class="col-md-2"><input className="form-control rounded-pill quantity-input" type="number" value={item.dishQuantity} onChange={(event) => this.updateCart(event, index)}/></div>
                <div class="col-md-6">{item.dishName}</div>
                <div class="col-md-2">${item.dishPrice}</div>
                <div class="col-md-2">
                    <a className="remove-icon" onClick={() => this.removeItem(index)}>
                        <FontAwesomeIcon icon={faTimesCircle} />
                    </a>
                </div>

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
            cartItemsData = cartInfo.cartItems.map(this.renderCartItem);
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
