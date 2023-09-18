import React, { useRef, useEffect, useState } from 'react';
import { NoiseFunction2D, createNoise2D } from 'simplex-noise';
import alea from "alea";

interface IVec2d {
    x: number;
    y: number;
}

interface IDrawPixel {
    ctx: CanvasRenderingContext2D | null;
    pos: IVec2d;
    color: string;
}

const drawPixel = (props: IDrawPixel) => {
    if (!props.ctx) return;

    props.ctx.fillStyle = props.color;
    props.ctx.fillRect(props.pos.x, props.pos.y, 1, 1)
}

interface IPerlinParams {
    seed: string;
    zoom: number;
    pos : IVec2d;
}

interface IDrawPerlinNoise {
    ctx: CanvasRenderingContext2D | null;
    dim: IVec2d;
    params: IPerlinParams
}

const drawPerlinNoise = (props: IDrawPerlinNoise) => {
    let tab: string[][] = [];

    // perlin params
    const prng = alea(props.params.seed);
    const noise2D = createNoise2D(prng);

    // gen array
    for (let y = 0; y < props.dim.y; y++) {
        let py = (props.params.pos.y + y) / props.params.zoom;
        tab.push([]);
        for (let x = 0; x < props.dim.x; x++) {
            let px = (props.params.pos.x + x) / props.params.zoom;
            tab[y].push((noise2D(px, py) < 0) ? "green" : "white")
        }
    }

    // draw perlin noise
    for (let y = 0; y < props.dim.y; y++) {
        for (let x = 0; x < props.dim.x; x++) {
            drawPixel({
                ctx: props.ctx,
                pos: { x: x, y: y },
                color: tab[y][x]
            });
        }
    }
}

function CanvaView(props: { dim: IVec2d }) {
    let canvasRef = useRef<HTMLCanvasElement | null>(null);
    let canvasCtxRef = React.useRef<CanvasRenderingContext2D | null>(null);

    const [params, setParams] = useState<IPerlinParams>({
        seed: "jack",
        zoom: 1,
        pos : {x : 0, y : 0}
    });

    const setSeed = (str: string) => setParams(old => ({ ...old, seed: str }));
    const setZoom = (zoom: number) => setParams(old => ({ ...old, zoom: zoom }));

    React.useEffect(() => {
        if (canvasRef.current) {
            canvasCtxRef.current = canvasRef.current.getContext("2d");

            drawPerlinNoise({
                ctx: canvasCtxRef.current,
                dim: props.dim,
                params: {
                    seed: "jackLapiquette",
                    zoom: params.zoom,
                    pos : {x : 0, y : 0}
                }
            });
        }
    }, []);

    return (
        <div style={{ backgroundColor: "red", display: "flex", flexDirection: "column" }}>
            <canvas
                id="perlin"
                ref={canvasRef}
                width={props.dim.x + ""}
                height={props.dim.y + ""}
            />
            <button onClick={() => drawPerlinNoise({
                ctx: canvasCtxRef.current,
                dim: props.dim,
                params: params
            })}>draw</button>

            <p>seed : </p>
            <input
                type="text"
                value={params.seed}
                onChange={(e) => setSeed(e.target.value)}
            />
            <p>zoom : {params.zoom}</p>
            <input
                type="range"
                min="1"
                max="100" value={params.zoom}
                onChange={(e) => setZoom(parseInt(e.target.value))}
            />
        </div>
    )
}

export default CanvaView;