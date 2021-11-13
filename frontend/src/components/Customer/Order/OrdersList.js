import React, { Component } from 'react'
import cookie  from 'react-cookies';
import {SERVER_ENDPOINT} from '../../constants/serverConfigs'
import axios from'axios';
import OrderSummaryModal from './OrderSummaryModal';
import CommonHeader from '../CommonHeader';
import { connect } from 'react-redux';
import { getOrders } from '../../../redux/reduxActions/restaurant/getOrdersRedux';
import Pagination from '../../Pagination';

class OrdersList extends  Component {

    state = {
        isSidebarOpen: false,
        ordersData : [],
        ordersMainData: [],
        currentPage: 1,
        ordersPerPage: 5
    }

    async componentDidMount(){
        const custId = cookie.load("custId");
        await this.props.getOrders(custId);
        this.setState({ordersData: this.props.orders});
        this.setState({ordersMainData: this.props.orders});
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

            //console.log("Order cancelled  : "+JSON.stringify(response));
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

    onChangeField = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    paginate = pageNumber => this.setState({currentPage: pageNumber});

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


                        <OrderSummaryModal specialInstructions={order.specialInstructions} total={order.orderTotal} deliveryAddress={order.street +","+ order.city +","+ order.state +","+ order.zipcode} orderId={order.orderId} />
                        <hr />
                    </div>
                    )
    }

    render(){
        console.log("render called "+this.state.currentPage )
        const indexOfLastPost = this.state.currentPage * this.state.ordersPerPage;
        const indexOfFirstPost = indexOfLastPost - this.state.ordersPerPage;
        const currentOrders = this.state.ordersData.slice(indexOfFirstPost, indexOfLastPost);
        return (
            <div className="ordersList">
                <CommonHeader toggleSidebar={this.handleViewSidebar}
                        />
                <div className="orders-header">
                        <div class="row">
                            <div className="col-md-2">
                                <h3>Past Orders</h3>
                            </div>
                            <div className="col-md-2">
                                                <select
                                                    name="ordersPerPage"
                                                    value = {this.state.ordersPerPage}
                                                    onChange = {this.onChangeField}>
                                                    <option value="2">2</option>
                                                    <option value="5" selected="true">5</option>
                                                    <option value="10">10</option>
                                                </select>
                            </div>
                            <div className="col-md-8">

                            </div>
                        </div>

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


                {currentOrders.map(this.renderOrder)}


                </div>

                <Pagination ordersPerPage={this.state.ordersPerPage}
                            totalOrders={this.state.ordersData.length}
                            paginate={this.paginate}/>

            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        orders : state.res_orders.ordersData,
    }
}

export default connect(mapStateToProps, {getOrders})(OrdersList);

// export default OrdersList
