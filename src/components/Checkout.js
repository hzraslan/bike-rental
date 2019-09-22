import React, {useEffect, useState} from 'react';
import '../css/styles.css';
export default function Checkout(props) {
    const [cart, setCart] = useState(props.cart)
    const [subtotal, setSubtotal] = useState(0)

    const cheoutBtnActive = <div className="checkout-button-active" onClick={checkOutOrder}>Checkout</div>
    const checkoutBtnPassive = <div className="checkout-button-passive">Checkout</div>
    useEffect(()=>{
        setCart(props.cart)
       subtotalChange()
    }, [props.cartChanged])
    function checkOutOrder (){
        props.checkoutOrder()
    }
    function removeItem(key){
        props.removeItem(cart[key][0])
        subtotalChange()
    }
    function subtotalChange(){
        let a = 0
        for(let key in cart){
            a +=cart[key][0].price * cart[key][1]
            setSubtotal(a)
        }
    }
    return (
        <div className="checkout-container" >

            <div className="order-box">
                <div className="header-order">
                    <div className="order-name">Name</div>
                    <div className="due">Price</div>
                    <div className="count">Quantity</div>
                </div>
            {
                Object.keys(cart).map((key, i)=>{
                            return(
                                <div key={i.toString()} className="order" >
                                    <div className="order-name">{key}</div>
                                    <div className="due">${cart[key][0].price* cart[key][1]}</div>
                                    <div className="count">{cart[key][1]}</div>
                                    <div className="remove-item" onClick={()=>removeItem(key)}> remove</div>
                                </div>
                            )
                        })
            }
            </div>
            <div className="subtotal-order order">
                    <div className="subtotal">Subtotal</div>
                    <div className="subtotal-amount">${subtotal}</div>
                    {
                        props.checkOutValid ? cheoutBtnActive: checkoutBtnPassive
                    }
                </div>
        </div>
    )
}