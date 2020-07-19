import React, { Component } from 'react';
import axios from 'axios';

class Checkout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            name:'',
            email:'',
            phone:'',
            order:null,
            errors:[]
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.addOrder = this.addOrder.bind(this);
        this.paymentHandler = this.paymentHandler.bind(this);
    }
    handleInputChange(event) {
        let target = event.target;
        this.setState({
          [target.name]: target.value
        });
        console.log(this.state);
    }
    paymentHandler(e){
        e.preventDefault();
        if(this.state.name=='' || this.state.email=='' || this.state.phone==''){
            this.setState({errors:['Please fill all fields']});
            return false;
        }
        const options = {
          key: 'rzp_test_oaoX64crApmhEQ',
          name: "MERN Shop",
          description: "Test description",
          order_id: '',
          handler: async (response) => {
            try {
             const paymentId = response.razorpay_payment_id;
             console.log(response);
             this.addOrder(paymentId);
            } catch (err) {
              console.log(err);
            }
          },
          theme: {
            color: "#686CFD",
          },
        };
        const rzp1 = new window.Razorpay(options);
        rzp1.open();
        };
    componentDidMount() {
        axios.get(`/api/v1/cart/`, { withCredentials: true })
            .then(res => {
                if (res.data.data != null) {
                    this.setState({ items: res.data.data.items });
                } else {
                    this.setState({ items: [] });
                }
            });
    }
    addOrder(){
        if(this.state.name=='' || this.state.email=='' || this.state.phone==''){
            this.setState({errors:['Please fill all fields']});
            return false;
        }
        if(this.state.items.length>0){
            axios.post('/api/v1/orders/addOrder/',
            {
                name:this.state.name,
                email:this.state.email,
                phone:this.state.phone
            },
            {withCredentials:true})
            .then(res => {
                if(res.data.success){
                    this.setState({order:res.data.data});
                }
            }).catch(error=>{
                this.setState({errors:error.response.data.error});
            });
        }
    }
    render() {
        let total_amount = 0;
        let addedItems = this.state.items.length ?
            (
                this.state.items.map((item, key) => {
                    total_amount += (item.product_qty * item.product_price);
                    let randomImage = `http://lorempixel.com/400/200/food/${key}`;
                    return (

                        <li className="collection-item avatar" key={key}>
                            <div className="item-img">
                                <img src={randomImage} className="" />
                            </div>

                            <div className="item-desc">
                                <span className="title">{item.product_name}</span>
                                <p>{item.product_category}</p>
                                <p><b>Price: ${item.product_price}</b></p>
                                <p>
                                    <b>Quantity: {item.product_qty}</b>
                                </p>
                            </div>

                        </li>

                    )
                })
            ) :

            (
                <p>Cart is emptpy.</p>
            )
        return (
            
            <div className="container">
                
            { this.state.order == null && 
                (
                <div>
                <div className="Checkout">
                    <h5>Checkout</h5>
                    <ul className="collection">
                        {addedItems}
                    </ul>
                </div>
                <div className="container row">
                { this.state.items.length>0 &&
                    (<div className="collection col s12 m6 l6">
                        { this.state.errors.length > 0 &&
                        (
                        <div style={{color:'red'}}>
                            {this.state.errors.map((error, key3) => {
                                return (<p key={key3}>{error}</p>)
                            })}
                        </div>
                        )}
                         
                        <li className="collection-item">
                        
                        <div className="row">
                            <div className="input-field col s12">
                                <input id="name" type="text" name="name" className="validate" onChange={this.handleInputChange}/>
                                <label htmlFor="name">Name</label>
                            </div>
                        
                            <div className="input-field col s12">
                                <input id="email" type="email" name="email" className="validate" onChange={this.handleInputChange}/>
                                <label htmlFor="email">Email</label>
                            </div>
                        
                            <div className="input-field col s12">
                                <input id="phone" type="tel" name="phone" className="validate" onChange={this.handleInputChange}/>
                                <label htmlFor="phone">Phone</label>
                            </div>
                        </div>                        
                        </li>
                    </div>)}
                    <div className="collection col s12 m6 l6">
                    
                        <li className="collection-item"><b>Total: ${total_amount}</b></li>
                    </div>
                    <div className="checkout col s12">
                        { this.state.items.length>0 &&
                            (<button className="waves-effect waves-light btn" onClick={this.addOrder}>Place order</button>)
                        }
                    </div>
                </div>
                </div>
                )}
                { this.state.order != null && 
                (
                    <div className="row">
                        <div className="collection-item" >
                                        <div className="items">
                                        
                                            <p><b>Order summary</b></p>
                                            <p>{this.state.order.customer_name}</p>
                                            <p>{this.state.order.customer_email}</p>
                                            <p>Phone: {this.state.order.customer_mobile}</p>
                                            <p>Payment ID: {this.state.order.payment_id}</p>
                                            <p>
                                            Total amount: ${this.state.order.amount}
                                            </p>
                                            <p>Payment status: {this.state.order.payment_status ? "Paid" : "Payment remaining"}</p>
                                            <ul className="collection">
                                            {this.state.order.items.map((item, key2) => {
                                                let randomImage = `http://lorempixel.com/400/200/food/${key2}`;
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
                                            </ul>
                                        </div>
                                    </div>
                    </div>
                )}
            </div>
        )
    }
}

export default Checkout;