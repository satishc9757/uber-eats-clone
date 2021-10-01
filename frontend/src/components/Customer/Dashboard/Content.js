import React, { Component } from 'react'

class Content extends Component {
    
    resInfo = [
        {image: "http://localhost:8000/static/images/res1.jpeg", resName: "Okayama Sushi", rating:"4.5", resDesc:"Not only is Okayama Sushi one of the most popular spots for Japanese delivery in San Jose."},
        {image: "http://localhost:8000/static/images/res2.jpeg", resName:"Hawaiian BBQ", rating:"4.2", resDesc:"This is among the 3 most popular places for Hawaiian delivery in San Jose on Uber Eats."},
        {image: "http://localhost:8000/static/images/res3.jpeg", resName: "Habana Cuba", rating:"4.4", resDesc:"This is among the 3 most popular places for Hawaiian delivery in San Jose on Uber Eats."},
        {image: "http://localhost:8000/static/images/res1.jpeg", resName: "Okayama Sushi", rating:"4.5", resDesc:"Not only is Okayama Sushi one of the most popular spots for Japanese delivery in San Jose."},
        {image: "http://localhost:8000/static/images/res2.jpeg", resName:"Hawaiian BBQ", rating:"4.2", resDesc:"This is among the 3 most popular places for Hawaiian delivery in San Jose on Uber Eats."},
        {image: "http://localhost:8000/static/images/res3.jpeg", resName: "Habana Cuba", rating:"4.4", resDesc:"This is among the 3 most popular places for Hawaiian delivery in San Jose on Uber Eats."},
    ];

    renderResCard = (card) => {
        return(
            <div className="col-md-3">
                        <div className="card">
                            <img className="card-img-top" src={card.image} alt="Card image cap"/>
                            <div className="card-body">
                            <h5 className="card-title">{card.resName}</h5>
                            <span className="btn-grey rounded-pill">{card.rating}</span>
                            <p className="card-text">{card.resDesc}</p>
                            </div>
                        </div>
                    </div>
        )
    }

    render(){
        return (
            <div className="dashboard-content">
                <div className="container-fluid">
                    <div className="row">
                        {this.resInfo.map(res => this.renderResCard(res))}
                    </div>
                </div>
            </div>   
        )
    }
    
}

export default Content
