import React, { Component } from 'react'
import axios from 'axios';
class ResDishRegistration extends Component {

    state = {
      dishName: "",
      dishMainIngredients: "",
      dishImage: "",
      dishPrice: "",
      dishDesc: "",
      dishCategory: "",
      dishType:""
    }

    onChangeField = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    handleImageFile = (event) => {
        console.log("Files are "+event.target.files[0]);
        this.setState({dishImage: event.target.files[0]});
    }

    onFormSubmit = (event) => {
        event.preventDefault();
        console.log("props"+ JSON.stringify(this.props));
        console.log("Here in the on submit "+ event);
        //const isValid = this.validateInputs(); --validation disabled for now
        const isValid = true;
        //console.log("isValid : "+ isValid);
        console.log("dishImage "+ this.state.dishImage);
        if(isValid){
            const url = "http://localhost:8000/res/dish";
            axios
                .post(url, this.state)
                .then(response => {
                    console.log(response);
                    //this.props.history.push("./home");
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }

    render(){
        return (
            <div className="dish_reg">
                <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-7">
                        <div className="card shadow-lg border-0 rounded-lg mt-5">
                            <div className="card-header"><h3 className="text-center">New Dish Addition</h3></div>
                            <div className="card-body">
                                <form className="needs-validation" noValidate onSubmit={this.onFormSubmit}>
                                    
                                        <div className="form-floating mb-3">
                                                <input className={"form-control" + (this.state.custFirstNameError ? " invalid-input": "")} id="dishName" type="text" 
                                                    name="dishName"
                                                    value = {this.state.dishName}
                                                    onChange = {this.onChangeField}
                                                    required/>  
                                                <label htmlFor="dishName">Dish Name</label>
                                                {/* <div className="invalid">{this.state.custFirstNameError}</div> */}
                                            </div>
                                  
                                   <div className="form-floating mb-3">
                                        <input className="form-control" id="dishMainIngredients" type="text" 
                                            name="dishMainIngredients"
                                            value = {this.state.dishMainIngredients}
                                            onChange = {this.onChangeField}
                                            />
                                        <label htmlFor="dishMainIngredients">Ingredients</label>
                                        {/* <div className="invalid">{this.state.custEmailError}</div> */}
                                    </div>

                                    <div className="form-floating mb-3">
                                        <input className="form-control" id="dishImage" type="file" 
                                            name="dishImage"
                                            onChange = {this.handleImageFile}
                                            />
                                        <label htmlFor="dishImage">Image</label>
                                        {/* <div className="invalid">{this.state.custEmailError}</div> */}
                                    </div>

                                    <div className="form-floating mb-3">
                                        <textarea class="form-control" 
                                            name="dishDesc"
                                            id="dishDesc"
                                            value = {this.state.dishDesc}
                                            onChange = {this.onChangeField} 
                                            rows="4"></textarea>
                                            <label htmlFor="dishDesc">Description</label>
                                            {/* <div className="invalid">{this.state.custEmailError}</div> */}
                                    </div>

                                    <div className="form-floating mb-3">
                                        <input className="form-control" id="dishCategory" type="text" 
                                            name="dishCategory"
                                            value = {this.state.dishCategory}
                                            onChange = {this.onChangeField}
                                            />
                                        <label htmlFor="dishCategory">Category</label>
                                        {/* <div className="invalid">{this.state.custEmailError}</div> */}
                                    </div>
                                    
                                    <div className="row mb-3">
                                        <div className="col-md-6">
                                            <div className="form-floating">
                                                <input className="form-control" id="dishPrice" type="number" 
                                                    name="dishPrice"
                                                    value = {this.state.dishPrice}
                                                    onChange = {this.onChangeField}
                                                     />
                                                <label htmlFor="dishPrice">Price</label>
                                                {/* <div className="invalid">{this.state.custLastNameError}</div> */}
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-floating">
                                            <select className="form-control form-select" 
                                                name="dishType"
                                                value = {this.state.dishType}
                                                onChange = {this.onChangeField}>
                                                <option selected></option>
                                                <option value="Veg">Veg</option>
                                                <option value="Non-Veg">Non-Veg</option>
                                                <option value="Vegan">Vegan</option>
                                            </select>
                                                <label htmlFor="dishType">Type</label>
                                                {/* <div className="invalid">{this.state.custLastNameError}</div> */}
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="mt-4 mb-0">
                                        {/* <div className="d-grid"><a className="btn btn-primary btn-block">Create Account</a></div> */}
                                        <button className="d-grid btn btn-uber" type="submit">Add Dish</button>
                                    </div>
                                </form>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
            </div>
        )
    }
    
}

export default ResDishRegistration
