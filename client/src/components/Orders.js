import React, { Component } from 'react';
import axios from 'axios';


class Orders extends Component{
    constructor(props) {
        super(props);
        this.state = {
            orders: []
        };
    }
    componentDidMount() {
        axios.get(`/api/v1/orders/`,{withCredentials:true})
          .then(res => {
              if(res.data.data!=null){
                this.setState({orders:res.data.data});
            }else{
                this.setState({orders:[]});
            }
          });
    }
    render(){
        let total_amount = 0;
        let addedOrders = this.state.orders.length ?
            (  
                this.state.orders.map((order,key1)=>{
                    total_amount += (order.product_qty * order.product_price);
                    let randomImage = `http://lorempixel.com/400/200/food/${key1}`;
                    return(
                       
                        
                                    <div className="collection-item" key={key1}>
                                        <div className="item-desc">
                                        
                                            <p>Ordered on : {new Date(order.createdAt).toDateString()}</p>
                                            <p>{order.customer_name}</p>
                                            <p>{order.customer_email}</p>
                                            <p>Phone: {order.customer_mobile}</p>
                                            <p>Payment ID: {order.payment_id}</p>
                                            <p>
                                            Total amount: ${order.amount}
                                            </p>
                                            <p>Payment status: {order.payment_status ? "Paid" : "Payment remaining"}</p>
                                            {order.items.map((item, key2) => {
                                                return <li className="collection-item avatar" key={key2}>
                                                    <div className="item-img"> 
                                                        <img src={randomImage} className=""/>
                                                    </div>
                                                    <div className="item-desc">
                                                        <span className="title">{item.product_name}</span>
                                                        <p>{item.product_category}</p>
                                                        <p><b>Price: {item.product_price}$</b></p> 
                                                        <p>
                                                            <b>Quantity: {item.product_qty}</b> 
                                                        </p>
                                                    </div>
                                                </li>
                                                })}
                                        </div>
                                    </div>
                                    
                         
                    )
                })
            ):

             (
                <p> You haven't ordered anything. </p>
             )
       return(
            <div className="container">
                <div className="items">
                    <h5>Your orders:</h5>
                    <ul className="collection">
                        {addedOrders}
                    </ul>
                </div>
            </div>
       )
    }
}

export default Orders;