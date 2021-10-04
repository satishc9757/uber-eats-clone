import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Menu extends Component {
    

    renderDishCard = (card) => {
        return(
            <div className="col-md-3">
                        <Link className="res-card" to={"/res/store/" + card.dishId}>
                            <div className="card">
                                <img className="card-img-top" src={card.dishImage} alt="dish image"/>
                                <div className="card-body">
                                    <h5 className="card-title">{card.dishName}</h5>
                                    <p className="card-text">{card.dishDesc}</p>
                                    <p>${card.dishPrice}</p>
                                    <div class="col"> <button className="btn-uber rounded-pill">-</button><a href="#" class="border">1</a><button className="btn-uber rounded-pill">+</button> </div>
                                    <a href="#" class="btn btn-uber">Add to cart</a>
                                
                                </div>
                            </div>
                        </Link>
                    </div>
        )
    }

    render(){
        return (
            <div className="dashboard-content">
                
                    <div className="row">
                        {this.props.dishData.map(res => this.renderDishCard(res))}
                    </div>
                
            </div>   
        )
    }
    
}

export default Menu
