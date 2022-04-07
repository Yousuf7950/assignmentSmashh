import React from 'react';
import './Entry.css';

export default function Calculate(props){
    return(
        <div  className='FormStyle' >
            <label>Base = <b>{props.base}</b></label>
            <label>Distance Cost Breakdown = <b>{(props.exitInterchange * props.cost).toFixed(2) }</b></label>
            <label>Subtotal =<b> {props.base + (props.exitInterchange * props.cost )}</b></label>
            <label>Discount = <b>{props.discount>0?100-(props.discount*100):0}%</b></label>
            <label>Total = <b>{((props.base + (props.exitInterchange * props.cost )) * props.discount ).toFixed(2)}</b></label>
        </div>
    )
}