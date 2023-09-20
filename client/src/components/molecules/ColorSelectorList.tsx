import { ColorPicker, Space, Button, InputNumber } from 'antd';

export interface IColorElem {
    color : string; // string or rgb or rgba
    lowerThan : number; // between 0 and 1
}

export interface IColorSelectorList {
    list : IColorElem[];
    pushOne : (colorPaletteElem: IColorElem) => void;
    delOne : (i: number) => void;
    updateOne : (colorPaletteElem: IColorElem, i: number) => void
}

function ColorSelectorList(props: IColorSelectorList) {
  return (
    <div style={{display : 'flex', flexDirection : "column"}}>
        {props.list.map((elem, i ) =>
            <Space key={i}>
                <ColorPicker
                    defaultFormat='hex'
                    value={elem.color}
                    onChange={(e, hex) => props.updateOne({...elem, color : hex}, i)}
                />
                <InputNumber
                    min={0}
                    max={100}
                    value={elem.lowerThan}
                    onChange={(e) => props.updateOne({...elem, lowerThan : e ?? 0}, i)}
                />
            </Space>
        )}
        <Button onClick={() => props.pushOne({color : "green", lowerThan : 0})}>Add one</Button>
    </div>
  )
}

export default ColorSelectorList