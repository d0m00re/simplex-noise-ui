import React, {useRef, useEffect, useState} from 'react';

//        <canvas id="perlin" width="640" height="360"></canvas>

const draw = (context : CanvasRenderingContext2D | null) => {
    context?.beginPath();
    context?.arc(95, 50, 40, 0, 2 * Math.PI);
    context?.stroke();
}

function CanvaView() {
    let canvasRef = useRef<HTMLCanvasElement | null>(null);
    let canvasCtxRef = React.useRef<CanvasRenderingContext2D | null>(null);
    React.useEffect(() => {
        if (canvasRef.current) {
            canvasCtxRef.current = canvasRef.current.getContext("2d");
        }
    }, []);



  return (
    <div style={{backgroundColor : "red"}}>
        <canvas
            id="perlin"
            ref={canvasRef}
            width="640"
            height="360"
        />
        <button onClick={() => draw(canvasCtxRef.current)}>draw</button>
    </div>
  )
}

export default CanvaView;