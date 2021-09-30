import React, {Component} from 'react'
import axios from 'axios';
import { SERVER_ENDPOINT } from '../../constants/serverConfigs';

class ResProfileCard extends Component{
    
    state = {
        
    }

    async componentDidMount(){
        try {
            const response = await axios.get(SERVER_ENDPOINT + "/res/2");
            const data = await response.data;
            console.log("Res data : "+JSON.stringify(data))
            this.setState(data[0]);
        } catch(err){
            console.log(err);
        }
    }

    render(){
        return (
            
                <div className="col-md-6">
                                <div class="card">
                                    <div class="card-header">
                                        Profile
                                    </div>
                                    <div class="card-body">
                                        <ul class="list-group list-group-flush">
                                        <li class="list-group-item">Cras justo odio</li>
                                        <li class="list-group-item">Dapibus ac facilisis in</li>
                                        <li class="list-group-item">Vestibulum at eros</li>
                                    </ul>
                                    <a href="#" class="btn btn-uber">Edit Profile</a>
                                    </div>
                                </div>
                </div>
            
        )
    }
}

export default ResProfileCard
