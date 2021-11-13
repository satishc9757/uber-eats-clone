import React, { Component } from 'react'
import { Card, FormControl, InputGroup, ListGroup, Radio } from 'react-bootstrap'
import DeliveryAddressModal from './DeliveryAddressModal';
import axios from'axios';
import {SERVER_ENDPOINT} from '../../constants/serverConfigs'
import cookie  from 'react-cookies';
import CommonHeader from '../CommonHeader';
import { connect } from 'react-redux';
import { placeOrder } from '../../../redux/reduxActions/customer/placeOrders'
import { width } from 'dom-helpers';
import { getCustToken } from '../../utils/ControllerUtils';
 //redux/reduxActions/restaurant/getOrdersRedux';

class CheckoutPage extends Component{

    state = {
        isSidebarOpen: false,
        cartInfo: {
            cartResName: "",
            cartItems : []
        },
        deliveryFee: 3.00,
        serviceFee: 5.00,
        deliveryAddresses: [],
        // [{
        //     street: "754, The Alameda ",
        //     city: "San Jose",
        //     state: "CA",
        //     zipcode: "95126",
        //     country: "US"
        // },
        // {
        //     street: "754, The Alameda ",
        //     city: "San Jose",
        //     state: "CA",
        //     zipcode: "95126",
        //     country: "US"
        // },
        // {
        //     street: "754, The Alameda ",
        //     city: "San Jose",
        //     state: "CA",
        //     zipcode: "95126",
        //     country: "US"
        // }],
        selectedDeliveryAddressIndex : 0,
        custId: "",
        specialInstructions:""
    }

    navigateToLoginPage = () => {
        this.props.history.push("/login");
    }

    handleViewSidebar = () => {

        this.setState({isSidebarOpen: !this.state.isSidebarOpen});
    }

    onChangeField = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    async componentDidMount(){
        const custId = cookie.load('custId');

        try {axios.defaults.headers.common['authorization'] = getCustToken();
            const url = SERVER_ENDPOINT + "/customer/order/address?custId="+custId;
            const response = await axios.get(url);
            const data = await response.data;
            console.log("Addresses data : "+JSON.stringify(data));
            this.setState({deliveryAddresses: data});

            //Cart data
            const custCart = sessionStorage.getItem("custCart");
            console.log("inside component did u");
            console.log("cartInfo : "+custCart);
            if(custCart){
                this.setState({cartInfo: JSON.parse(custCart)});
            }

            //user info
            if(custId){
                this.setState({custId: custId});
                console.log("cust id" +this.state.custId );
            }

        } catch(err){
            console.log(err);
        }
    }

    subTotalAmount = () => {
        let total = 0;
        const reducer = (previousValue, currentValue) => previousValue + (parseFloat(currentValue.dishPrice) * parseFloat(currentValue.dishQuantity));
        total += this.state.cartInfo.cartItems.reduce(reducer, 0);

        return total;
    };

    totalAmount = () => {
        let total = 0;
        total += this.subTotalAmount();
        total += this.state.deliveryFee;
        total += this.state.serviceFee;

        return total;
    };

    decimalFormat = (num) => {
        num = parseFloat(num);
        return num.toFixed(2);
    }

    onAddDeliveryAddress = (address) => {
        console.log("New Address : "+address);
        console.log("state : "+this.state);
        this.setState({deliveryAddresses: [...this.state.deliveryAddresses, address]});
    }

    onChangeDeliveryAddress = (event) => {
        console.log(event.target.value);
        this.setState({selectedDeliveryAddressIndex: event.target.value});
    }

    renderCartItem = (item) => {
        return(
            <li class="list-group-item">
                <div class="row">
                    <div class="col-md-1 rounded-pill grey-round-bg">{item.dishQuantity}</div>
                    <div class="col-md-9">{item.dishName}</div>
                    <div class="col-md-2">${this.decimalFormat(item.dishPrice)}</div>
                </div>
            </li>
        )
    }

    renderDeliveryAddress = (address, index) => {

        return(
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="deliveryAddress" id={index} value={index} onChange={this.onChangeDeliveryAddress}/>
                                <label class="form-check-label" for={index}>
                                    {address.street}, {address.city}, {address.state}, {address.country}, {address.zipcode}
                                </label>
                            </div>
        )
    }


    onPlaceOrder = async (event) => {
        // const url = SERVER_ENDPOINT+"/customer/order/create";
        try{
            const payload = {
                cartItems: this.state.cartInfo.cartItems,
                deliveryAddress: this.state.deliveryAddresses[this.state.selectedDeliveryAddressIndex],
                deliveryFee: this.state.deliveryFee,
                serviceFee: this.state.serviceFee,
                custId: this.state.custId,
                resId: this.state.cartInfo.cartResId,
                cartTotal: this.decimalFormat(this.totalAmount()),
                specialInstructions: this.state.specialInstructions
            }
            console.log("payload : "+JSON.stringify(payload));

            //const response = await axios.post(url, payload);

            await this.props.placeOrder(payload);

            sessionStorage.clear();
            //console.log("Response from order create : "+response.data);
            this.props.history.push("/orders");
        } catch(err){
            console.log("Error from order create : "+err);
        }
    }

    render(){
        return (
            <div className="checkoutPage">
             <CommonHeader toggleSidebar={this.handleViewSidebar}
                        />

            <div class="container">
		        {/* <div class="block-heading">
		          <h2>Shopping Cart</h2>
		          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc quam urna, dignissim nec auctor in, mattis vitae leo.</p>
		        </div> */}
		        <div class="content">
                    <div class="row">
	 					<div class="col-md-12 col-lg-8">
                             <h4>Your items</h4>
	 						<div class="items">
                             <div class="card">
                                <div class="card-header">
                                    <h5>{this.state.cartInfo.cartResName}</h5>
                                </div>
                                <ul class="list-group list-group-flush">
                                    {this.state.cartInfo.cartItems.map(this.renderCartItem)}
                                </ul>
                            </div>
                            <input className="full-width" placeholder="Add a note for the store" name="specialInstructions" id="specialInstructions" type="text" value={this.state.specialInstructions} onChange={this.onChangeField}/>
				 		</div>


                             <br/><br/>
                             <h4>Delivery address</h4>
                             {this.state.deliveryAddresses.map(this.renderDeliveryAddress)}
                             <DeliveryAddressModal onAddDeliveryAddress = {this.onAddDeliveryAddress}/>

			 			</div>
			 			<div class="col-md-12 col-lg-4">
			 				<div class="shopping-summary">
			 					<h3>Order Summary</h3>
			 					<div class="shopping-summary-item"><span class="text">Subtotal</span><span class="price">${this.decimalFormat(this.subTotalAmount())}</span></div>
			 					<div class="shopping-summary-item"><span class="text">Delivery Fee</span><span class="price">${this.decimalFormat(this.state.deliveryFee)}</span></div>
			 					<div class="shopping-summary-item"><span class="text">Service Fee</span><span class="price">${this.decimalFormat(this.state.serviceFee)}</span></div>
			 					<div class="shopping-summary-item"><span class="text">Total</span><span class="price">${this.decimalFormat(this.totalAmount())}</span></div>
			 					<button type="button" class="btn btn-success btn-lg" onClick={this.onPlaceOrder}>Place order</button>
				 			</div>
			 			</div>
		 			</div>
		 		</div>
	 		</div>


            </div>
        )
    }

}


const mapStateToProps = state => {
    return {
        orderPlaced : state.place_order.orderPlaced,

    }
}

export default connect(mapStateToProps, {placeOrder})(CheckoutPage);

//export default CheckoutPage
