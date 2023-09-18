import React from 'react'

interface Props {
  value : number;
  step : number;
  setValue : (v : number) => void;
}

function IncrDecrNumber(props: Props) {
  const decr = () => {props.setValue(props.value - props.step)}
  const incr = () => {props.setValue(props.value + props.step)}
  
  return (
    <div style={{display : "flex", gap : "5px"}}>
      <button onClick={decr}>-</button>
      <p>{props.value}</p>
      <button onClick={incr}>+</button>
    </div>
  )
}

export default IncrDecrNumber