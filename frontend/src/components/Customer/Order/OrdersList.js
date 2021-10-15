import React, { Component } from 'react'
import cookie  from 'react-cookies';
import {SERVER_ENDPOINT} from '../../constants/serverConfigs'
import axios from'axios';
import OrderSummaryModal from './OrderSummaryModal';
import CommonHeader from '../CommonHeader';

class OrdersList extends  Component {
    
    state = {
        isSidebarOpen: false,
        ordersData : [],
        ordersMainData: []

    }

    async componentDidMount(){
        this.refreshOrdersData();
    }

    refreshOrdersData = async () => {
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

    onCancelOrder = async (orderId) => {
        try{
            console.log("order id is : "+orderId)
            const url = SERVER_ENDPOINT + "/customer/order/cancel";
            const response = await axios.post(url, {orderId: orderId});
            
            console.log("Order cancelled  : "+JSON.stringify(response));
            this.refreshOrdersData();
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
        } else if(orderType === "Cancelled"){
            this.setState({ordersData: this.state.ordersMainData.filter(o => {
                return o.orderStatus === "Cancelled"
            })});
        } else {
            this.setState({ordersData: this.state.ordersMainData.filter(o => {
                return o.orderStatus !== "Cancelled" &&  o.orderStatus !== "Delivered"
            })});
        }
    }

    renderOrder = (order) => {
                    const order_status_class = "alert order-status rounded-pill "+ (order.orderStatus === "Delivered"?  "alert-success": "alert-warning");
                    let cancelButton = "";
                    if(order.orderStatus === "Order Placed"){
                        cancelButton = <button className="btn btn-uber rounded-pill" onClick={() => this.onCancelOrder(order.orderId)}>Cancel Order</button>
                    }
                    
                    return(
                    <div className="row" key={order.odId}>
                        <h5>{order.resName}</h5>
                        <br />
                        <p className="text-muted">Order Placed on {order.orderTimestamp}</p>
                        <div class={order_status_class} role="alert">
                            Order Status: {order.orderStatus}
                        </div>
                        <div class="row">
                            <div class="col-md-4">
                                {cancelButton}
                            </div>
                        </div>
                        
                        
                        <OrderSummaryModal total={order.orderTotal} deliveryAddress={order.street +","+ order.city +","+ order.state +","+ order.zipcode} orderId={order.orderId} />
                        <hr />
                    </div>
                    )
    }

    render(){
        return (
            <div className="ordersList">
                <CommonHeader toggleSidebar={this.handleViewSidebar} 
                        />  
                <div className="orders-header">
                        <h3>Past Orders</h3>
                        <div class="btn-group">
                                <input type="radio" class="btn-check" name="ordersType" id="orderOn" autocomplete="off" value="Ongoing" onChange={this.onOrderTypeChange}/>
                                <label class="btn btn-outline-uber rounded-pill" for="orderOn">Ongoing</label>
                            
                                <input type="radio" class="btn-check" name="ordersType" id="orderDelivered" autocomplete="off" value="Delivered" onChange={this.onOrderTypeChange} />
                                <label class="btn btn-outline-uber rounded-pill" for="orderDelivered">Delivered</label>

                                <input type="radio" class="btn-check" name="ordersType" id="orderCancelled" autocomplete="off" value="Cancelled" onChange={this.onOrderTypeChange} />
                                <label class="btn btn-outline-uber rounded-pill" for="orderCancelled">Cancelled</label>
                            
                        </div>
                        <br/><br/>
                    </div>
                
                <div className="container">
                    

                {this.state.ordersData.map(this.renderOrder)}

                    
                </div>
                

                
            </div>
        )
    }
    
}

export default OrdersList
