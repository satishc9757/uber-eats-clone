import { Component } from 'react'
import { connect } from 'react-redux'
import { resLogout } from '../../redux/reduxActions/restaurant/logoutRedux'
import ResContent from './ResContent'
import ResHeader from './ResHeader'
import ResSidebar from './ResSidebar'
import { getDishesData } from '../../redux/reduxActions/restaurant/dishesDataRedux';

class ResDashboard extends Component {

    state = {
        isSidebarOpen: false
    }

    navigateToLoginPage = () => {
        this.props.history.push("./login");
    }

    handleViewSidebar = () => {
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
        user: state.user,

    }
}


// const resLogoutActions = dispatch => {
//     return {
//         resLogout : (data) => dispatch(resLogoutAction(data))
//     }
// }


export default connect(mapStateToProps, {resLogout})(ResDashboard)
