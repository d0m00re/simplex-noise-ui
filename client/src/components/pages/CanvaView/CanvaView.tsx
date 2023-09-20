import React, { useRef, useEffect, useState } from 'react';
import { createNoise2D } from 'simplex-noise';
import alea from "alea";
import { Button, Row, Col, Input } from "antd";
import ColorSelectorList, { IColorElem } from './../../molecules/ColorSelectorList';
import cloneDeep from "lodash/cloneDeep";

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
    pos: IVec2d;
    colorPalette: IColorElem[]
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
            let noiseVal = ((noise2D(px, py) + 1) / 2) * 100;

            // let find color
            let iColor = props.params.colorPalette.findIndex(e => noiseVal < e.lowerThan);
            let colorNoise = (iColor !== -1) ? props.params.colorPalette[iColor].color : "yellow";
            tab[y].push(colorNoise);
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
        pos: { x: 0, y: 0 },
        colorPalette: [
            { color: "#FFFFFF", lowerThan: 20 },
            { color: "#000000", lowerThan: 100 }]
    });

    const setSeed = (str: string) => setParams(old => ({ ...old, seed: str }));
    const setZoom = (zoom: number) => setParams(old => ({ ...old, zoom: zoom }));
    const setPosX = (x: number) => setParams(old => ({ ...old, pos: { ...old.pos, x: x } }));
    const setPosY = (y: number) => setParams(old => ({ ...old, pos: { ...old.pos, y: y } }));
    const pushColorPaletteElem = (colorPaletteElem: IColorElem) => setParams(old => ({ ...old, colorPalette: [...old.colorPalette, colorPaletteElem] }));
    const deleteColorPaletteElem = (i: number) => {

        let newColorPalette = params.colorPalette.filter((elem, index) => index !== i);
        setParams(old => ({ ...old, colorPalette: newColorPalette }))
    };
    const updateColorPaletteElem = (colorPaletteElem: IColorElem, i: number) => {
        let dupColorPalette = cloneDeep(params.colorPalette);
        dupColorPalette[i] = colorPaletteElem;
        setParams(old => ({ ...old, colorPalette: dupColorPalette }));
    }

    const update = () => {
        if (canvasRef.current) {
            canvasCtxRef.current = canvasRef.current.getContext("2d");

            drawPerlinNoise({
                ctx: canvasCtxRef.current,
                dim: props.dim,
                params: params
            });
        }
    }

    React.useEffect(() => {
        update();
    }, []);

    useEffect(() => {
        update();
    }, [params]);

    return (
        <Row justify={"center"} align="middle" style={{ backgroundColor: "grey", padding: '12px', height: "100%" }} >
                <Col span={11} style={{ backgroundColor: "orange" }}>
                    <canvas
                        id="perlin"
                        style={{ width: "600px", height: "600px" }}
                        ref={canvasRef}
                        width={props.dim.x + ""}
                        height={props.dim.y + ""}
                    />
                </Col>
                <Col span={11} style={{ backgroundColor: "orange" }}>
                    <p>seed : </p>
                    <Input
                        type="text"
                        value={params.seed}
                        onChange={(e) => setSeed(e.target.value)}
                    />
                    <p>zoom : {params.zoom}</p>
                    <Input
                        type="range"
                        min="1"
                        max="100" value={params.zoom}
                        onChange={(e) => setZoom(parseInt(e.target.value))}
                    />

                    <p>pos : {params.pos.x} {params.pos.y}</p>
                    <Row>
                        <p>x</p>
                        <Input
                            type="range"
                            min="0"
                            max="1000" value={params.pos.x}
                            onChange={(e) => setPosX(parseInt(e.target.value))}
                        />
                    </Row>
                    <Row>
                        <p>y</p>
                        <Input
                            type="range"
                            min="0"
                            max="1000" value={params.pos.y}
                            onChange={(e) => setPosY(parseInt(e.target.value))}
                        />
                    </Row>
                    <p>color palette</p>
                    <ColorSelectorList
                        list={params.colorPalette}
                        pushOne={pushColorPaletteElem}
                        delOne={deleteColorPaletteElem}
                        updateOne={updateColorPaletteElem}
                    />
                </Col>
        </Row>
    )
}

export default CanvaView;