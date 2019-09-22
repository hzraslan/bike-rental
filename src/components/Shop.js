import React, { useState } from 'react';
import Checkout from './Checkout';
import fetchAndSortProducts from './fetchProducts';
import Product from './Product';
const styles = {
    navigation: {
        width: '%100',
        height: '100px'
    },
    home:{
        display: 'flex',
        padding: '10px',
        width: '%100',
        flexWrap: 'wrap'
    },
    productWrapper:{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        marginTop: '20px',
        width: '%70'
    },
    checkoutContainer:{
        width: '400px',
        border: '1px #ddd solid',
        float: 'right',
        height: '300px',
        marginTop: '30px',
        padding: '30px',
        borderRadius: '8px'
    }
}
export default function Shop(props) {
    const [ products ] = useState(fetchAndSortProducts())
    const [checkOutValid, setCheckOutValid] = useState(false)
    const [cart, setCart] = useState({})
    const [cartChanged, setCartChanged] = useState(0)
    const [subtotal, setSubtotal] = useState(0)
    
    function addToCart(count, product){
        if(product.name in cart){
            if(cart[product.name][1]!= count){
                cart[product.name][1]= count
            } else {
                return
            }
        } else {
           cart[product.name] = [product, count]
        }
        if(product.product_type == 'bike'){
            setCheckOutValid(true)
        }
        setCartChanged(cartChanged +1)
        setSubtotal(0)
        calculateSubTotal()
    }
    function removeItem(item){
        if (item.name in cart){
            delete cart[item.name]
            if(item.product_type == 'bike'){
                setCheckOutValid(false)
                for(let key in cart){
                    if(cart[key][0].product_type == 'bike'){
                        setCheckOutValid(true)
                    }
                }
            }
            calculateSubTotal()
        }
        setCartChanged(cartChanged +1)
    }
    function checkoutOrder (){
        setCart({})
        setCheckOutValid(false)
        setCartChanged(0)
        setSubtotal(0)
        props.history.push('/done');
    }

    function calculateSubTotal (){
        for(let key in cart){
            setSubtotal(subtotal + cart[key][0].price * cart[key][1])
        }
    }
    return (
        <div className="shop-container"  >
            <div className="nav" style={styles.navigation}></div>
            <div className="home" style={styles.home}>
                <div className="products-container">
                    {
                    Object.keys(products).map((key, i)=>{
                        return(
                                <div key={i.toString()} className="product-type-wrapper" style={styles.productWrapper}>
                                    {
                                        products[key].map((product)=>{
                                            return(
                                                <Product product={product} key={product.id.toString()} addToCart={addToCart} setCheckOut={()=> setCheckOutValid(true)}></Product>
                                            )
                                        })
                                    }
                                </div>
                            )
                        })
                    }
                </div>
                <div className="checkout-container" style={styles.checkoutContainer}>
                    <Checkout 
                    cart={cart} 
                    checkOutValid={checkOutValid} 
                    cartChanged={cartChanged} 
                    removeItem={removeItem}
                    checkoutOrder={checkoutOrder}
                    subtotal={subtotal}>
                    </Checkout>
                </div>
            </div>
        </div>
    )
}