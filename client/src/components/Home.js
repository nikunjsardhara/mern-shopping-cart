import React, { Component } from 'react';
import axios from 'axios';

 class Home extends Component{
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            showLoader: true
        };
    }

    addToCart (id) {
        axios
          .put('/api/v1/cart/addToCart/'+id,{withCredentials:true})
          .then(res => {
          })
          .catch(err => {
          })
    };
    componentDidMount() {
        axios.get(`/api/v1/products`,{withCredentials:false})
          .then(res => {
            this.setState({items:res.data.data});
            this.setState({showLoader:false});
            console.log(this.state.items);
          }); 
      }

    render(){
        let itemList = this.state.items.map((item, key)=>{
            let randomImage = `http://lorempixel.com/400/200/food/${key}`;
            return(
                <div className="card" key={key}>
                        <div className="card-image">
                            <img src={randomImage} alt={item.product_name}/>
                            
                            <a className="btn-floating halfway-fab waves-effect waves-light btn tooltipped red" data-position="top" data-tooltip="Add to cart" onClick={()=>{this.addToCart(item._id)}}><i className="material-icons">add</i></a>
                        </div>

                        <div className="card-content">
                        <span className="card-title">{item.product_name}</span>
                            <p><b>Category: {item.product_category}</b></p>
                            <p><b>Price: ${item.product_price}</b></p>
                        </div>
                 </div>

            )
        })

        return(
            <div className="container">

{ this.state.showLoader && (
<div className="col s12 m4 center loader" style={{marginTop: 50}}>
    <div className="preloader-wrapper active">
        <div className="spinner-layer spinner-blue">
            <div className="circle-clipper left">
            <div className="circle"></div>
            </div><div className="gap-patch">
            <div className="circle"></div>
            </div><div className="circle-clipper right">
            <div className="circle"></div>
            </div>
        </div>

        <div className="spinner-layer spinner-red">
            <div className="circle-clipper left">
            <div className="circle"></div>
            </div><div className="gap-patch">
            <div className="circle"></div>
            </div><div className="circle-clipper right">
            <div className="circle"></div>
            </div>
        </div>

        <div className="spinner-layer spinner-yellow">
            <div className="circle-clipper left">
            <div className="circle"></div>
            </div><div className="gap-patch">
            <div className="circle"></div>
            </div><div className="circle-clipper right">
            <div className="circle"></div>
            </div>
        </div>

        <div className="spinner-layer spinner-green">
            <div className="circle-clipper left">
            <div className="circle"></div>
            </div><div className="gap-patch">
            <div className="circle"></div>
            </div><div className="circle-clipper right">
            <div className="circle"></div>
            </div>
        </div>
    </div>

</div>)}
 
                <div className="box">
                    {itemList}
                </div>
            </div>
        )
    }
}

export default Home;