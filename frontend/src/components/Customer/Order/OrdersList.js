import React, { Component } from 'react'
import cookie  from 'react-cookies';
import {SERVER_ENDPOINT} from '../../constants/serverConfigs'
import axios from'axios';
import OrderSummaryModal from './OrderSummaryModal';

class OrdersList extends  Component {
    
    state = {
        ordersData : [],
        ordersMainData: []

    }


    async componentDidMount(){
        try{
            const custId = cookie.load("custId");
            
            const url = SERVER_ENDPOINT + "/customer/orders?custId="+custId;
            const response = await axios.get(url);
            const data = await response.data;
            console.log("Orders data  : "+JSON.stringify(data));
            this.setState({ordersData: data});
            this.setState({ordersMainData: data});
        } catch(err){
            console.log(err);
        }
     
    }

    onOrderTypeChange = (event) => {
        
        const orderType = event.target.value;
        console.log(orderType);
        if(orderType === "Delivered"){
            this.setState({ordersData: this.state.ordersMainData.filter(o => {
                return o.orderStatus === "Delivered"
            })});
        } else {
            this.setState({ordersData: this.state.ordersMainData.filter(o => {
                return o.orderStatus !== "Delivered"
            })});
        }
    }

    renderOrder = (order) => {
                    const order_status_class = "alert order-status rounded-pill "+ (order.orderStatus === "Delivered"?  "alert-success": "alert-warning");
                    return(
                    <div className="row" key={order.odId}>
                        <h5>{order.resName}</h5>
                        <br />
                        <p className="text-muted">Order Placed on {order.orderTimestamp}</p>
                        <div class={order_status_class} role="alert">
                            Order Status: {order.orderStatus}
                        </div>
                        
                        <OrderSummaryModal total={order.orderTotal} deliveryAddress={order.street +","+ order.city +","+ order.state +","+ order.zipcode} orderId={order.orderId} />
                        <hr />
                    </div>
                    )
    }

    render(){
        return (
            <div className="ordersList">
                <div className="header">
                        <h3>Past Orders</h3>
                        <div class="btn-group">
                                <input type="radio" class="btn-check" name="ordersType" id="orderOn" autocomplete="off" value="Ongoing" onChange={this.onOrderTypeChange}/>
                                <label class="btn btn-outline-uber rounded-pill" for="orderOn">Ongoing</label>
                            
                                <input type="radio" class="btn-check" name="ordersType" id="orderDelivered" autocomplete="off" value="Delivered" onChange={this.onOrderTypeChange} />
                                <label class="btn btn-outline-uber rounded-pill" for="orderDelivered">Delivered</label>
                            
                        </div>
                        <br/><br/>
                    </div>
                
                <div className="container">
                    

                {this.state.ordersData.map(this.renderOrder)}

                    <div className="row">
                        <h5>La Vic</h5>
                        <br />
                        <p className="text-muted">Dilivered on 22-Feb-2021 02:33 pm</p>
                        <OrderSummaryModal />
                        <hr />
                    </div>
                </div>
                

                
            </div>
        )
    }
    
}

export default OrdersList
