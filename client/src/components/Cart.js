import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'

class Cart extends Component{
    constructor(props) {
        super(props);
        this.state = {
            items: []
        };
    }
    componentDidMount() {
        axios.get(`/api/v1/cart/`,{withCredentials:true})
          .then(res => {
              if(res.data.data!=null){
                this.setState({items:res.data.data.items});
            }else{
                this.setState({items:[]});
            }
          });
    }

    addQuantity(id){
        axios.put('/api/v1/cart/addToCart/'+id,{withCredentials:true})
        .then(res => {
            if(res.data.data!=null){
              this.setState({items:res.data.data.items});
            }
        });
    }
    subtractQuantity(id,qty){
        if(qty < 1){
            this.removeFromCart(id);
        }else{
            axios.put('/api/v1/cart/updateQty/'+id+'/'+qty,{withCredentials:true})
            .then(res => {
                if(res.data.data!=null){
                this.setState({items:res.data.data.items});
                }else{
                    this.setState({items:[]});
                }
            });
        }
    }
    removeFromCart(id){
        axios.delete('/api/v1/cart/removeFromCart/'+id,{withCredentials:true})
        .then(res => {
            if(res.data.data!=null){
              this.setState({items:res.data.data.items});
            }else{
                this.setState({items:[]});
            }
        });
    }
    render(){
        let total_amount = 0;
        let addedItems = this.state.items.length ?
            (  
                this.state.items.map((item,key)=>{
                    total_amount += (item.product_qty * item.product_price);
                    let randomImage = `http://lorempixel.com/400/200/food/${key}`;
                    return(
                       
                        <li className="collection-item avatar" key={key}>
                                    <div className="item-img"> 
                                        <img src={randomImage} className=""/>
                                    </div>
                                
                                    <div className="item-desc">
                                        <span className="title">{item.product_name}</span>
                                        <p>{item.product_category}</p>
                                        <p><b>Price: ${item.product_price}</b></p> 
                                        <p>
                                            <b>Quantity: {item.product_qty}</b> 
                                        </p>
                                        <div className="add-remove">
                                            <Link to="/cart"><i className="material-icons" onClick={()=>{this.addQuantity(item._id)}}>arrow_drop_up</i></Link>
                                            <Link to="/cart"><i className="material-icons" onClick={()=>{this.subtractQuantity(item._id,item.product_qty-1)}}>arrow_drop_down</i></Link>
                                        </div>
                                        <button className="waves-effect waves-light btn pink remove" onClick={()=>{this.removeFromCart(item._id)}}>Remove</button>
                                    </div>
                                    
                                </li>
                         
                    )
                })
            ):

             (
                <p>Cart is empty.</p>
             )
       return(
            <div className="container">
                <div className="cart">
                    <h5>Your cart:</h5>
                    <ul className="collection">
                        {addedItems}
                    </ul>
                </div> 
                <div className="container">
                <div className="collection">
                    
                        <li className="collection-item"><b>Total: ${total_amount}</b></li>
                    </div>
                    <div className="checkout">
                    <Link to="/checkout" className="waves-effect waves-light btn">Checkout</Link>
                    </div>
                 </div>   
            </div>
       )
    }
}

export default Cart;