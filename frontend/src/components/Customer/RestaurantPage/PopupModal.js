
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react'
import {Modal, Button} from 'react-bootstrap'
import { Link } from 'react-router-dom';
class PopupModal extends Component{

    state = {
        showPopup: false,
        
    }

    handleClose = () => {
        this.props.onClosePopup();
    }
    
    handleShow = () => this.setState({
        showPopup: true,
    });

    componentDidMount() {
        this.setState({showPopup: this.props.showPopup});   
    }
    onNewOrder = () => {
        
        this.props.onNewOrder();
        this.setState({
            showPopup: false,
        })
    }


    render(){
       
        return (

            <div className="cart-modal">
                <Modal show={this.props.showPopup} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Create New Order?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div class="container-fluid">
                            <p>Create New Order?</p>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                    
                    <Button variant="uber" onClick={this.handleClose}>
                            Cancel
                    </Button>
                    <Button variant="uber" onClick={this.onNewOrder}>
                            New Order
                    </Button>
                    
                    {/* <button type="button" class="btn btn-uber btn-lg btn-block">Go to checkout</button> */}
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
    
}

export default PopupModal
