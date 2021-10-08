import React, { Component } from 'react'
import cookie  from 'react-cookies';
import {SERVER_ENDPOINT} from '../../constants/serverConfigs'
import axios from'axios';
import OrderSummaryModal from './OrderSummaryModal';
import UpdateStatusModal from './UpdateStatusModal';

class OrdersList extends  Component {
    
    state = {
        ordersData : []
    }


    async componentDidMount(){
        try{
            const resId = cookie.load("resId");
            
            const url = SERVER_ENDPOINT + "/res/orders?resId="+resId;
            const response = await axios.get(url);
            const data = await response.data;
            console.log("Res Orders data : "+JSON.stringify(data));
            this.setState({ordersData: data});
        } catch(err){
            console.log(err);
        }
     
    }

    renderOrder = (order) => {
                    <div className="row" key={order.orderId}>
                        <h5>{order.custFirstName +" "+ order.custLastName}</h5>
                        <br />
                        <p className="text-muted">{order.order_status} on {order.orderTimestamp}</p>
                        <OrderSummaryModal total={order.orderTotal} deliveryAddress={order.street +","+ order.city +","+ order.state +","+ order.zipcode} orderId={order.orderId} />
                        <UpdateStatusModal orderId={order.orderId}/>
                        
                        <hr />
                    </div>
    }

    render(){
        return (
            <div className="ordersList">
                <h3>Past Orders</h3>
                <div className="container">
                    <div className="row">
                        <h5>La Vic</h5>
                        <br />
                        <p className="text-muted">Dilivered on 22-Feb-2021 02:33 pm</p>
                        <OrderSummaryModal />
                        <UpdateStatusModal/>
                        <hr />
                    </div>
                </div>
                

                {this.state.ordersData.map(this.renderOrder)}
            </div>
        )
    }
    
}

export default OrdersList
