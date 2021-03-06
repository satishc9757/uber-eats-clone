import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Content extends Component {

    // renderResCard = (card) => {
    //     return(
    //         <div className="col-md-3">
    //                     <div className="card">
    //                         <img className="card-img-top" src={card.image} alt="Card image cap"/>
    //                         <div className="card-body">
    //                         <h5 className="card-title">{card.resName}</h5>
    //                         <span className="btn-grey rounded-pill">{card.rating}</span>
    //                         <p className="card-text">{card.resDesc}</p>
    //                         </div>
    //                     </div>
    //                 </div>
    //     )
    // }

    renderResCard = (card) => {
        let resDesc = "";
        if(card.resDescription){
            resDesc = card.resDescription.substring(0,100) + "...Read more";
        } 
        return(
            <div className="col-md-6">
                        <Link className="res-card" to={"/res/store/" + card.resId}>
                        <div className="card">
                            <img className="card-img-top" src={card.resImage} alt="Card image cap"/>
                            <div className="card-body">
                            <h5 className="card-title">{card.resName}</h5>
                            {/* <span className="btn-grey rounded-pill">4.5</span> */}
                            <h6>{card.resStreet}</h6>
                            <p className="card-text">{resDesc}</p>
                            </div>
                        </div>
                        </Link>
                    </div>
        )
    }

    render(){
        return (
            <div className="dashboard-content">
                <div className="container-fluid">
                    <div className="row">
                        {this.props.resData.map(res => this.renderResCard(res))}
                    </div>
                </div>
            </div>   
        )
    }
    
}

export default Content
