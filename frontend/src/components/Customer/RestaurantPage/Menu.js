import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import DishCard from './DishCard'

class Menu extends Component {
    

    onAddToCart = (dish) => {
        this.props.onAddToCart(dish);
    }    

    renderDishCard = (card) => {
        return(
            // <div className="col-md-3">
            //             <Link className="res-card" to={"/res/store/" + card.dishId}>
            //                 <div className="card">
            //                     <img className="card-img-top" src={card.dishImage} alt="dish image"/>
            //                     <div className="card-body">
            //                         <h5 className="card-title">{card.dishName}</h5>
            //                         <p className="card-text">{card.dishDesc}</p>
            //                         <p>${card.dishPrice}</p>
            //                         <div class="col"> <button className="btn-uber rounded-circle">-</button>{this.}<button className="btn-uber rounded-circle">+</button> </div>
            //                         <a href="#" class="btn btn-uber">Add to cart</a>
                                
            //                     </div>
            //                 </div>
            //             </Link>
            //         </div>

            <DishCard onAddToCart={this.onAddToCart} dish={card} />
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
