import { saveAs } from 'file-saver';
import type { Stage as KStage } from 'konva/lib/Stage';
import { FC, useRef, useState } from 'react';
import { Layer, Rect, Stage, Text } from 'react-konva/lib/ReactKonvaCore';
// load required shapes
import 'konva/lib/shapes/Rect';
import 'konva/lib/shapes/Text';

import { Field } from '@components/Field';
import { Select } from '@components/Select';
import {
  valueToSelectOption,
  valuesToSelectOptions
} from '@utils/valuesToSelectOptions';

import styles from './CanvasEditor.module.scss';

type Align = 'center' | 'left' | 'right';

const alignValues: Align[] = ['center', 'left', 'right'];
const alignOptions = alignValues.map(value => {
  return {
    ...valueToSelectOption(value),
    text: value
  };
});

const fontFamilyOptions = valuesToSelectOptions([
  'Monospace',
  'Verdana',
  'Tahoma',
  'Georgia',
  'Arial',
  'Arial Black',
  'sans-serif',
  'serif',
  'Calibri',
  'Times New Roman'
]).map(opt => ({
  ...opt,
  style: {
    fontFamily: opt.value
  }
}));

const drawWatermark = (
  ctx: CanvasRenderingContext2D,
  text: string,
  fontSize: number,
  width: number,
  height: number
): void => {
  ctx.save(); // Save current state
  ctx.font = `${fontSize}px Arial`;
  ctx.fillStyle = 'grey';
  ctx.globalAlpha = 0.5;
  const { width: textWidth } = ctx.measureText(text);
  const x = width - textWidth - 10;
  const y = height - fontSize - 10;
  ctx.fillText(text, x, y);
  ctx.restore(); // Restore original state
};

export const CanvasEditor: FC = () => {
  const stageRef = useRef(null);

  const [name, setName] = useState('My canvas');
  const [bgColor, setBgColor] = useState('#bbbbbb');
  const [fontColor, setFontColor] = useState('#333333');
  const [text, setText] = useState('Some Text');
  const [fontFamily, setFontFamily] = useState('Arial');
  const [fontSize, setFontSize] = useState(24);
  const [align, setAlign] = useState('center');

  const handleSave = () => {
    const canvas = (stageRef.current as unknown as KStage)
      .getStage()
      .toCanvas();
    const ctx = canvas.getContext('2d');
    if (ctx) {
      drawWatermark(ctx, 'My generator', 20, 500, 500);
      const data = canvas.toDataURL();
      saveAs(data, `${name}.png`);
    } else {
      console.error('Could not create canvas context');
    }
  };

  return (
    <div className={styles.editor}>
      <div className={styles.controls}>
        <Field label="Name" htmlFor="name">
          <input
            id="name"
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </Field>
        <button type="button" disabled={!stageRef.current} onClick={handleSave}>
          📥 Save
        </button>
        <Field label="Background color" htmlFor="bgColor">
          <input
            id="bgColor"
            type="color"
            value={bgColor}
            onChange={e => {
              const newValue = e.target.value;
              console.log({ newValue });
              setBgColor(e.target.value);
            }}
          />
        </Field>
        <Field label="Text align" htmlFor="textAlign">
          <Select
            id="textAlign"
            value={align}
            options={alignOptions}
            onChange={e => setAlign(e.target.value)}
          />
        </Field>
        <Field label="Font size" htmlFor="fontSize">
          <input
            id="fontSize"
            type="number"
            value={fontSize}
            onChange={e => setFontSize(parseInt(e.target.value, 10))}
          />
        </Field>
        <Field label="Font color" htmlFor="fontColor">
          <input
            type="color"
            id="fontColor"
            value={fontColor}
            onChange={e => setFontColor(e.target.value)}
          />
        </Field>
        <Field label="Text" htmlFor="text">
          <textarea
            id="text"
            value={text}
            onChange={e => setText(e.target.value)}
          />
        </Field>
        <Field label="Font family" htmlFor="fontFamily">
          <Select
            className={styles['font-family']}
            id="fontFamily"
            value={fontFamily}
            onChange={e => setFontFamily(e.target.value)}
            options={fontFamilyOptions}
          />
        </Field>
      </div>
      <Stage className={styles.stage} width={500} height={500} ref={stageRef}>
        <Layer>
          <Rect fill={bgColor} x={0} y={0} width={500} height={500}></Rect>
          <Text
            wrap="word"
            width={500}
            text={text}
            fill={fontColor}
            fontSize={fontSize}
            fontFamily={fontFamily}
            align={align}
            draggable
          />
        </Layer>
      </Stage>
    </div>
  );
};
