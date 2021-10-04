import React from 'react'

const ResContent = () => {
    return (
        <div>
            <div className="container-fluid">
                        <div className="row">
                            <div class="card mb-3">
                                <img class="card-img-top res-dashboard-image" src={resImage} alt="Card image cap" />
                                <div class="card-body">
                                    <h5 class="card-title">{this.state.resTitle}</h5>
                                    <p class="card-text">{this.state.resDesc}</p>
                                    <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                                </div>
                            </div>
                        </div>
            </div>            
        </div>
    )
}

export default ResContent
