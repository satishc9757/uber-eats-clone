import { Component } from 'react'
import { connect } from 'react-redux'
import { resLogoutAction } from '../../redux/reduxActions/restaurant/loginRedux'
import ResContent from './ResContent'
import ResHeader from './ResHeader'
import ResSidebar from './ResSidebar'

class ResDashboard extends Component {
    
    state = {
        isSidebarOpen: false
    }

    navigateToLoginPage = () => {
        this.props.history.push("./login");
    }
    
    handleViewSidebar = () => {
        console.log("I am here");
        this.setState({isSidebarOpen: !this.state.isSidebarOpen});
    }

    render(){
        return (
            <div>
                <ResHeader toggleSidebar={this.handleViewSidebar}/>
                <div className="wrapper">
                    <ResSidebar isOpen={this.state.isSidebarOpen} logout={this.props.resLogout} navigateToLoginPage={this.navigateToLoginPage}/>
                    <ResContent />
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


const resLogoutActions = dispatch => {
    return {
        resLogout : (data) => dispatch(resLogoutAction(data))
    } 
}


export default connect(mapStateToProps, resLogoutActions)(ResDashboard)

