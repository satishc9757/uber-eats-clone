import React, { Component } from 'react'

class Pagination extends Component {

    render(){
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(this.props.totalOrders / this.props.ordersPerPage); i++) {
            pageNumbers.push(i);
        }
        console.log("Pagination called "+this.props.totalOrders);
        return (
            <nav className="pageination">
              <ul className='pagination'>
                {pageNumbers.map(number => (
                  <li key={number} className='page-item'>
                    <button onClick={() => this.props.paginate(number)}  className='page-link'>
                      {number}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          );
    }

};


export default Pagination;