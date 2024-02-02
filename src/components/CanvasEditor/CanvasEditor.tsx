import { saveAs } from 'file-saver';
import type { Stage as KStage } from 'konva/lib/Stage';
import { FC, useRef, useState } from 'react';
import { Layer, Stage } from 'react-konva/lib/ReactKonvaCore';

import { Field } from '@components/Field';
import { Select } from '@components/Select';
import {
  valueToSelectOption,
  valuesToSelectOptions
} from '@utils/valuesToSelectOptions';

import styles from './CanvasEditor.module.scss';
import { CanvasShape } from './CanvasShape';
import { CanvasShapesMenu } from './CanvasShapesMenu';
import { CanvasEditorState, EditorShape, FontFamily } from './types';
import { drawWatermark } from './utils/drawWatermark';

type CanvasEditorProps = {
  width?: number;
  height?: number;
};

export const CanvasEditor: FC<CanvasEditorProps> = ({
  width = 500,
  height = 500
}) => {
  const stageRef = useRef(null);

  const [editorState, setEditorState] = useState<CanvasEditorState>(() => ({
    name: 'My canvas',
    height,
    width,
    shapes: [
      {
        id: '0',
        type: 'rect',
        width,
        height,
        fill: '#bbbbbb',
        x: 0,
        y: 0
      },
      {
        id: '1',
        align: 'center',
        type: 'text',
        x: 0,
        y: 0,
        width,
        height,
        text: 'Some Text',
        fontFamily: FontFamily.ARIAL,
        fontSize: 24,
        fill: '#333333'
      }
    ]
  }));

  const handleShapeUpdate = (newShape: EditorShape): void => {
    setEditorState(prevEditorState => ({
      ...prevEditorState,
      shapes: prevEditorState.shapes.map(shape => {
        if (shape.id === newShape.id) {
          return newShape;
        }
        return shape;
      })
    }));
  };

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
      </div>
      <div className={styles.shapes}>
        <CanvasShapesMenu
          shapes={editorState.shapes}
          onShapeUpdate={handleShapeUpdate}
        />
      </div>
      <Stage
        className={styles.stage}
        width={editorState.width}
        height={editorState.height}
        ref={stageRef}
      >
        {editorState.shapes.map(shape => (
          <Layer key={shape.id}>
            <CanvasShape shape={shape} />
          </Layer>
        ))}

        {/* <Layer>
          <Rect fill={bgColor} x={0} y={0} width={500} height={500}></Rect>
        </Layer>
        <Layer>
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
        </Layer> */}
      </Stage>
    </div>
  );
};
