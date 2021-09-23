import { Component } from 'react'
import ResContent from './ResContent'
import ResHeader from './ResHeader'
import ResSidebar from './ResSidebar'

class ResDashboard extends Component {
    
    state = {
        isSidebarOpen: false
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
                    <ResSidebar isOpen={this.state.isSidebarOpen}/>
                    <ResContent />
                </div>
            </div>
        )
    }
}

export default ResDashboard
