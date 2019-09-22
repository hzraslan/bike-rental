import React,{useState,useEffect} from 'react';
const styles={
    container:{
        margin:'10px'
    },
    buyBox:{
        width: '%100',
        display: 'flex',
        justifyItems: 'center',
        WebkitUserSelect: 'none'
    },
    addToCartBtnPassive:{
        width: '60px',
        border: '1px solid black',
        borderRadius: '8px',
        fontSize: '12px',
        cursor: 'pointer',
        textAlign: 'center',
        marginLeft: '30px',
        backgroundColor: '#dce6f5',
        paddingTop: '2px'
    },
    addToCartBtnActive:{
        width: '60px',
        border: '1px solid black',
        borderRadius: '8px',
        fontSize: '12px',
        cursor: 'pointer',
        textAlign: 'center',
        marginLeft: '30px',
        backgroundColor: '#34eb6e',
        paddingTop: '2px'
    },
    quantityBox:{
        width:'40px',
        padding: '5px 10px',
        border: '1px solid grey',
        borderRadius: '4px',
        margin: '5px'

    },
    quantityChangeSpans:{
        fontWeight: 'bold',
        fontSize: '20px',
        cursor: 'pointer'
    }
}
export default function Product(props) {
    const [counter, setCounter]= useState(0)
    const [styleAdd, setStyleAdd] = useState( styles.addToCartBtnPassive)
    useEffect(()=>{
        if(counter > 0){
            setStyleAdd(styles.addToCartBtnActive)
        } else{
            setStyleAdd(styles.addToCartBtnPassive)
        }
    }, [counter])
    function addToCart(){
        if(counter> 0){
            props.addToCart(counter, props.product)
        }
    }
    return (
        <div className="product-container" style={styles.container} >
            <img src={props.product.image}></img>
            <p>{props.product.name} - ${props.product.price}</p>
            <div className="buy-box" style={styles.buyBox}>
                <div className="quantity-wrap">
                    <span className="subtract-quantity" style={styles.quantityChangeSpans} onClick={() => { if(counter <=0){setCounter(0)} else{setCounter(counter -1)}}}>
                    -</span>
                    <span className="quantity-box" style={styles.quantityBox}>{counter}</span>
                    <span className="increase-quantity" style={styles.quantityChangeSpans} onClick={() => setCounter(counter +1)}>+</span>
                </div>
                <div style={styleAdd} onClick={addToCart}>Add Cart</div>
            </div>
        </div>
    )
}