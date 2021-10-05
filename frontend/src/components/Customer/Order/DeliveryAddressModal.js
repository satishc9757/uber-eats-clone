import React, { Component } from 'react'
import {Modal, Button} from 'react-bootstrap'
import countryList from '../../constants/countryList';
class DeliveryAddressModal extends Component {
    
    state = {
        showCart: false,
        address: {id: "",
                street: "",
                city: "",
                state: "",
                zipcode: "",
                country: ""
        }
    }

    handleClose = () => this.setState({
        showCart: false,
    });
    
    handleShow = () => this.setState({
        showCart: true,
    });

    onChangeField = (event) => {
        let curAddress = {...this.state.address};
        curAddress[event.target.name] = event.target.value;
        this.setState({address: curAddress});
    }

    render() {
        return (
            <div className="delivery-modal">
                <button className="btn btn-uber rounded-pill" onClick={this.handleShow}>
                    Add address
                </button>

                <Modal show={this.state.showCart} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Delivery address</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <div class="container-fluid">
                    <div className="mb-3">
                                        <div className="form-floating mb-3 mb-md-0">
                                                    <input className={"form-control" + (this.state.custFirstNameError ? " invalid-input": "")} id="street" type="text" 
                                                        name="street"
                                                        value = {this.state.address.street}
                                                        onChange = {this.onChangeField}
                                                        placeholder="Street address" 
                                                        required/>  
                                                    <label htmlFor="street">Street address</label>
                                                    {/* <div className="invalid">{this.state.custFirstNameError}</div> */}
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-md-6">
                                            <div className="form-floating mb-3 mb-md-0">
                                                <input className={"form-control"} id="city" type="text" 
                                                    name="city"
                                                    value = {this.state.address.city}
                                                    onChange = {this.onChangeField}
                                                    placeholder="Enter City" 
                                                    required/>  
                                                <label htmlFor="city">City</label>
                                                {/* <div className="invalid">{this.state.custFirstNameError}</div> */}
                                            </div>
                                        </div>
                                        
                                        <div className="col-md-6">
                                            <div className="form-floating">
                                                <input className="form-control" id="state" type="text" 
                                                    name="state"
                                                    value = {this.state.address.state}
                                                    onChange = {this.onChangeField}
                                                    placeholder="Select State" />
                                                <label htmlFor="state">State</label>
                                                {/* <div className="invalid">{this.state.custLastNameError}</div> */}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-md-6">
                                            <div className="form-floating">
                                                <input className="form-control" id="zipcode" type="text" 
                                                    name="zipcode"
                                                    value = {this.state.address.zipcode}
                                                    onChange = {this.onChangeField}
                                                    placeholder="Enter Zipcode" />
                                                <label htmlFor="zipcode">Zipcode</label>
                                                {/* <div className="invalid">{this.state.custLastNameError}</div> */}
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-floating">
                                            <select className="form-control form-select" 
                                                name="country"
                                                value = {this.state.address.country}
                                                onChange = {this.onChangeField}>
                                                <option selected></option>
                                                {countryList.map((c) => {
                                                    return (<option value={c}>{c}</option>)})}
                                            </select>
                                                <label htmlFor="country">Country</label>
                                                {/* <div className="invalid">{this.state.custLastNameError}</div> */}
                                            </div>
                                        </div> 
                                    </div>
                    </div>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="uber" onClick={() => {
                            this.props.onAddDeliveryAddress(this.state.address);
                            this.handleClose();
                    }}>
                        Add
                    </Button>

                    {/* <button type="button" class="btn btn-uber btn-lg btn-block">Go to checkout</button> */}
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
    
}

export default DeliveryAddressModal
