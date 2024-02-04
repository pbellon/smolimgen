import { saveAs } from 'file-saver';
import type { KonvaEventObject } from 'konva/lib/Node';
import type { Stage as KStage } from 'konva/lib/Stage';
import {
  ChangeEventHandler,
  FC,
  MouseEventHandler,
  useCallback,
  useRef,
  useState
} from 'react';
import { Layer, Stage } from 'react-konva/lib/ReactKonvaCore';

import { Field } from '@components/Field';
import { useLog } from '@hooks/useLog';
import { capitalize } from '@utils/capitalize';

import styles from './CanvasEditor.module.scss';
import { CanvasShapeMenu } from './menu';
import { CanvasShape } from './shapes/CanvasShape';
import { CanvasEditorState, EditorShape, FontFamily } from './types';
import { addShape } from './utils/addShape';
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
    size: {
      height,
      width
    },
    selectedShapeId: undefined,
    shapes: [
      {
        id: crypto.randomUUID(),
        type: 'background',
        fill: '#bbbbbb'
      },
      {
        id: crypto.randomUUID(),
        align: 'center',
        type: 'text',
        x: 10,
        y: 10,
        width: 400,
        height: 30,
        text: 'Some Text',
        fontFamily: FontFamily.ARIAL,
        fontSize: 24,
        fill: '#333333'
      }
    ]
  }));

  useLog('CanvasEditor', editorState);

  const setSelectedShape = useCallback((shapeId: string | undefined): void => {
    setEditorState(prevEditorState => ({
      ...prevEditorState,
      selectedShapeId: shapeId
    }));
  }, []);

  const handleStageClick = useCallback(
    (e: KonvaEventObject<MouseEvent>) => {
      if (e.target === e.target.getStage()) {
        setSelectedShape(undefined);
      }
    },
    [setSelectedShape]
  );

  const handleBackgroundClick = useCallback(
    (e: KonvaEventObject<MouseEvent>) => {
      console.log('handleBackgroundClick', { e });
      setEditorState(prev => ({
        ...prev,
        selectedShapeId: undefined
      }));
    },
    []
  );

  const handleNameUpdate: ChangeEventHandler<HTMLInputElement> = useCallback(
    e => {
      setEditorState(prevEditorState => ({
        ...prevEditorState,
        name: e.target.value
      }));
    },
    []
  );

  const handleHeightUdpate: ChangeEventHandler<HTMLInputElement> = useCallback(
    e => {
      setEditorState(prevEditorState => ({
        ...prevEditorState,
        size: {
          ...prevEditorState.size,
          height: parseInt(e.target.value, 10)
        }
      }));
    },
    []
  );

  const handleWidthUdpate: ChangeEventHandler<HTMLInputElement> = useCallback(
    e => {
      setEditorState(prevEditorState => ({
        ...prevEditorState,
        size: {
          ...prevEditorState.size,
          width: parseInt(e.target.value, 10)
        }
      }));
    },
    []
  );

  const handleSave = () => {
    const canvas = (stageRef.current as unknown as KStage)
      .getStage()
      .toCanvas();
    const ctx = canvas.getContext('2d');
    if (ctx) {
      drawWatermark(ctx, 'My generator', 20, 500, 500);
      const data = canvas.toDataURL();
      saveAs(data, `${editorState.name}.png`);
    } else {
      console.error('Could not create canvas context');
    }
  };

  const isShapeSelected = useCallback(
    (shape: EditorShape): boolean => editorState.selectedShapeId === shape.id,
    [editorState]
  );

  const handleShapeSelect = useCallback(
    (shape: EditorShape | undefined): void => {
      setSelectedShape(shape?.id);
    },
    [setSelectedShape]
  );

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

  const handleCreateShape = useCallback(
    (type: EditorShape['type']): MouseEventHandler<Element> =>
      () => {
        setEditorState(prevEditorState => addShape(prevEditorState, type));
      },
    []
  );

  return (
    <div className={styles.editor}>
      <div className={styles.controls}>
        <Field label="Name" htmlFor="canvasName">
          <input
            id="canvasName"
            onChange={handleNameUpdate}
            type="text"
            value={editorState.name}
          />
        </Field>
        <Field label="Width" htmlFor="canvasWidth">
          <input
            type="number"
            id="canvasWidth"
            value={editorState.size.width}
            onChange={handleWidthUdpate}
          />
        </Field>
        <Field label="Height" htmlFor="canvasHeight">
          <input
            type="number"
            id="canvasHeight"
            value={editorState.size.height}
            onChange={handleHeightUdpate}
          />
        </Field>

        <button type="button" disabled={!stageRef.current} onClick={handleSave}>
          📥 Save
        </button>
      </div>
      <div className={styles.menu}>
        {editorState.shapes.map(shape => (
          <div className={styles.menu__item} key={shape.id}>
            <CanvasShapeMenu shape={shape} onUpdate={handleShapeUpdate} />
          </div>
        ))}
        {/* New shape control */}
        <div className={styles.menu__item}>
          {(['text', 'rect', 'background'] as EditorShape['type'][]).map(
            type => (
              <button
                key={type}
                type="button"
                onClick={handleCreateShape(type)}
              >
                Create new <code>{capitalize(type)}</code> shape
              </button>
            )
          )}
        </div>
      </div>
      <div className={styles.stage}>
        <Stage
          width={editorState.size.width}
          height={editorState.size.height}
          ref={stageRef}
          onClick={handleStageClick}
        >
          {editorState.shapes.map(shape => (
            <Layer key={shape.id}>
              <CanvasShape
                shape={shape}
                onBackgroundClick={handleBackgroundClick}
                onUpdate={handleShapeUpdate}
                isSelected={isShapeSelected(shape)}
                onSelect={handleShapeSelect}
                size={editorState.size}
              />
            </Layer>
          ))}
        </Stage>
      </div>
    </div>
  );
};
