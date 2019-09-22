import React from 'react';
import '../css/styles.css'
export default function Confirmation(props) {
    function goBack(){
        props.history.push('/');
    }
    return (
        <div className="confirmation-container" >
           <p>Thank you for Shopping with us! </p> <br></br>
            <button onClick={()=>goBack()}>Continue Shopping</button>
        </div>
    )
}