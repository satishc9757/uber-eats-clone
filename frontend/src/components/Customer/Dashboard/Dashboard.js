import React, { Component } from 'react'
//import logo from '../../images/uber_eats_logo.png'
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from '../Header';
import Sidebar from '../Sidebar';
import Content from './Content';
import { connect } from 'react-redux';
import { custLogout } from '../../../redux/reduxActions/customer/logoutRedux';
import axios from 'axios';
import { SERVER_ENDPOINT, GRAPHQL_SERVER_ENDPOINT } from '../../constants/serverConfigs';
import cookie from 'react-cookies';
import { getCustToken } from '../../utils/ControllerUtils';
import {RESTAURANT_SEARCH} from '../../../graphql/queries'
axios.defaults.headers.common['authorization'] = getCustToken();

class Dashboard extends Component {

    state = {
        isSidebarOpen: false,
        resMainData:[],
        resData: []
    }

    navigateToLoginPage = () => {
        this.props.history.push("/login");
    }

    handleViewSidebar = () => {
        console.log("I am here");
        this.setState({isSidebarOpen: !this.state.isSidebarOpen});
    }

    onResSearch = async (text) => {

        const searchText = text;
        const url = SERVER_ENDPOINT + "/res/query?searchText="+searchText;

        try{
            const response = await axios.get(url);
            const data = response.data;
            this.setState({resData: data});
            this.setState({resMainData: data});
            console.log(" res data fetched : "+data);
        } catch(err) {
            console.log("Error while fecthing resturants "+err);
        }

    }

    onDishTypeFilter = (dishType) => {
        this.setState({
            resData: this.state.resMainData.filter(res => {
                return res.dishTypes.split(",").includes(dishType)
            })
        })
    }

    onDeliveryTypeFilter = (deliveryType) => {
        this.setState({
            resData: this.state.resMainData.filter(res => {

                return res.resDeliveryType !== null && res.resDeliveryType.includes(deliveryType);
            })
        })
    }

    async componentDidMount(){
        const custLocation = cookie.load("custLocation");

        if(custLocation){
            //const url = SERVER_ENDPOINT + "/customer/query?searchText="+custLocation;
            const url = GRAPHQL_SERVER_ENDPOINT + "/restaurantSearch";
            const query = RESTAURANT_SEARCH;
            const searchText = custLocation;
            try{
                // const response = await axios.get(url);
                //graphql
                const response = await axios.post(url, {
                    query,
                    variables: {
                        searchText
                    },
                });
                const data = response.data.data.restaurantSearch;
                this.setState({resData: data});
                this.setState({resMainData: data});
                console.log(" res data fetched : "+data);
            } catch(err) {
                console.log("Error while fecthing resturants "+err);
            }
        }

    }

    render(){
        return (
            <div>
                <Header toggleSidebar={this.handleViewSidebar}
                        onResSearch={this.onResSearch}
                        onDishTypeFilter={this.onDishTypeFilter}
                        onDeliveryTypeFilter={this.onDeliveryTypeFilter}
                        />
                <div className="wrapper">
                    <Sidebar isOpen={this.state.isSidebarOpen}
                             logout={this.props.custLogout}
                             navigateToLoginPage={this.navigateToLoginPage}/>
                    <Content resData={this.state.resData}/>
                </div>
            </div>
        )
    }


}

const mapStateToProps = state => {
    return {
        loggedIn : state.loggedIn,
        user: state.user
    }
}


// const custLogoutActions = dispatch => {
//     return {
//         custLogout : (data) => dispatch(custLogoutAction(data))
//     }
// }


export default connect(mapStateToProps, {custLogout})(Dashboard)
