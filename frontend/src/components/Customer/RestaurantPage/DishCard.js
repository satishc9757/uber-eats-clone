import React, { Component } from 'react';
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


class DishCard extends Component {
    
    state = {
        dishQuantity: 0,

    }

    decrementQuantity = () => {
        this.setState({
            dishQuantity: Math.max(this.state.dishQuantity - 1, 0)
        })
    }

    incrementQuantity = () => {
        this.setState({
            dishQuantity: this.state.dishQuantity + 1
        })
    }

    onAddToCart = () => {
        const dishData =  {...this.props.dish, dishQuantity: this.state.dishQuantity}
        this.props.onAddToCart(dishData);
    }

    render(){
        return (
            <div className="col-md-3">
                        
                            <div className="card">
                                <img className="card-img-top" src={this.props.dish.dishImage} alt="dish image"/>
                                <div className="card-body">
                                    <h5 className="card-title">{this.props.dish.dishName}</h5>
                                    <p className="card-text">{this.props.dish.dishDesc}</p>
                                    <p>${this.props.dish.dishPrice}</p>
                                    <div class="col">
                                                <a className="rounded-circle res-card" onClick={this.decrementQuantity}><FontAwesomeIcon icon={faMinus} /></a>
                                                <span className="small-input-display"> {this.state.dishQuantity}</span>
                                                <a className="rounded-circle res-card" onClick={this.incrementQuantity}><FontAwesomeIcon icon={faPlus} /></a> 
                                    </div>
                                    <button className="btn btn-uber rounded-pill" onClick={this.onAddToCart}>Add to cart</button>
                                
                                </div>
                            </div>
                        
                    </div>
        )
    }
    
}

export default DishCard
