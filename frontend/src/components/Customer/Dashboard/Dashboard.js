import React, { Component } from 'react'
//import logo from '../../images/uber_eats_logo.png'
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from '../Header';
import Sidebar from '../Sidebar'; 
import Content from './Content';
import { connect } from 'react-redux';
import { custLogout } from '../../../redux/reduxActions/customer/loginRedux';
import axios from 'axios';
import { SERVER_ENDPOINT } from '../../constants/serverConfigs';
import cookie from 'react-cookies';

class Dashboard extends Component {

    state = {
        isSidebarOpen: false,
        resMainData:[],
        resData: [
            {resImage: "http://localhost:8000/static/images/res1.jpeg", resName: "Okayama Sushi", rating:"4.5", resDescription:"Not only is Okayama Sushi one of the most popular spots for Japanese delivery in San Jose."},
            {resImage: "http://localhost:8000/static/images/res2.jpeg", resName:"Hawaiian BBQ", rating:"4.2", resDescription:"This is among the 3 most popular places for Hawaiian delivery in San Jose on Uber Eats."},
            {resImage: "http://localhost:8000/static/images/res3.jpeg", resName: "Habana Cuba", rating:"4.4", resDescription:"This is among the 3 most popular places for Hawaiian delivery in San Jose on Uber Eats."},
            {resImage: "http://localhost:8000/static/images/res1.jpeg", resName: "Okayama Sushi", rating:"4.5", resDescription:"Not only is Okayama Sushi one of the most popular spots for Japanese delivery in San Jose."},
            {resImage: "http://localhost:8000/static/images/res2.jpeg", resName:"Hawaiian BBQ", rating:"4.2", resDescription:"This is among the 3 most popular places for Hawaiian delivery in San Jose on Uber Eats."},
            {resImage: "http://localhost:8000/static/images/res3.jpeg", resName: "Habana Cuba", rating:"4.4", resDescription:"This is among the 3 most popular places for Hawaiian delivery in San Jose on Uber Eats."},
        ]
    }

    navigateToLoginPage = () => {
        this.props.history.push("./login");
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
            const url = SERVER_ENDPOINT + "/res/query?searchText="+custLocation;
        
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

    // render(){
    //     return (
    //         <div>
    //             <nav className="sb-topnav navbar navbar-expand">
                
    //             <a className="navbar-brand ps-3" href="/home">
    //                 {/* <img alt="uber-eats-logo" src={logo} width="146" height="24"/> */}
    //                 UberEats
    //             </a>
                
    //             <button className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle" href="#!"><i className="fas fa-bars"></i></button>
                
    //             <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
    //                 <div className="input-group">
    //                     <input className="form-control" type="text" placeholder="What are you craving for?" aria-label="Search for..." aria-describedby="btnNavbarSearch" />
    //                     <button className="btn btn-primary" id="btnNavbarSearch" type="button"><FontAwesomeIcon icon={faSearch} /></button>
    //                 </div>
    //             </form>
                
    //             <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
    //                 <li className="nav-item dropdown">
    //                     <a className="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i className="fas fa-user fa-fw"></i></a>
    //                     <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
    //                         <li><a className="dropdown-item" href="#!">Settings</a></li>
    //                         <li><a className="dropdown-item" href="#!">Activity Log</a></li>
    //                         <li><hr className="dropdown-divider" /></li>
    //                         <li><a className="dropdown-item" href="#!">Logout</a></li>
    //                     </ul>
    //                 </li>
    //             </ul>
    //         </nav>
    //         </div>
    //     )
    // }
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

