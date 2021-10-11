import React, { Component } from 'react'
import cookie  from 'react-cookies';
import {SERVER_ENDPOINT} from '../../constants/serverConfigs'
import axios from'axios';
import OrderSummaryModal from './OrderSummaryModal';
import UpdateStatusModal from './UpdateStatusModal';
import ResHeader from '../ResHeader';

class OrdersList extends  Component {
    
    state = {
        ordersData : [],
        ordersMainData: [],
        isSidebarOpen: false
    }

    handleViewSidebar = () => {
        this.setState({isSidebarOpen: !this.state.isSidebarOpen});
    }

    onSuccessfulUpdate = () => {
        this.refreshOrders();
    }

     refreshOrders = async() => {
        try{
            const resId = cookie.load("resId");
            
            const url = SERVER_ENDPOINT + "/res/orders?resId="+resId;
            const response = await axios.get(url);
            const data = await response.data;
            console.log("Res Orders data : "+JSON.stringify(data));
            this.setState({ordersData: data});
            this.setState({ordersMainData: data});
        } catch(err){
            console.log(err);
        }
     }

    async componentDidMount(){
        // try{
        //     const resId = cookie.load("resId");
            
        //     const url = SERVER_ENDPOINT + "/res/orders?resId="+resId;
        //     const response = await axios.get(url);
        //     const data = await response.data;
        //     console.log("Res Orders data : "+JSON.stringify(data));
        //     this.setState({ordersData: data});
        //     this.setState({ordersMainData: data});
        // } catch(err){
        //     console.log(err);
        // }
        this.refreshOrders();
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
                        <div className="row" key={order.orderId}>
                            <h5>{order.custFirstName +" "+ order.custLastName}</h5>
                            <br />
                            <p className="text-muted">{order.order_status} on {order.orderTimestamp}</p>
                            <div class={order_status_class} role="alert">
                                Order Status: {order.orderStatus}
                            </div>
                            <OrderSummaryModal total={order.orderTotal} deliveryAddress={order.street +","+ order.city +","+ order.state +","+ order.zipcode} orderId={order.orderId} />
                            <UpdateStatusModal onSuccessfulUpdate={this.onSuccessfulUpdate}  orderId={order.orderId}/>
                            
                            <hr />
                        </div>
                    )
    }

    render(){
        return (
            <div className="ordersList">
                <ResHeader/>

                <div className="orders-header">
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
                </div>
                

                
            </div>
        )
    }
    
}

export default OrdersList
