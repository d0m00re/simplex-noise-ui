import React from 'react';
import { Button, Space } from 'antd';

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
      <Button onClick={decr}>-</Button>
      <p>{props.value}</p>
      <Button onClick={incr}>+</Button>
    </div>
  )
}

export default IncrDecrNumber