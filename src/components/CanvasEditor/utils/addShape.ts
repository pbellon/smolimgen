import { Util } from 'konva/lib/Util';

import { CanvasEditorState, EditorShape, FontFamily } from '../types';

const createShape = (
  editorState: CanvasEditorState,
  type: EditorShape['type']
): EditorShape => {
  const id = crypto.randomUUID();

  const { width: cWidth, height: cHeight } = editorState.size;

  switch (type) {
    case 'background':
      return {
        fill: Util.getRandomColor(),
        id,
        type
      };
    case 'rect':
      return {
        fill: Util.getRandomColor(),
        x: cWidth * 0.2,
        y: cHeight * 0.2,
        height: cHeight * 0.8,
        id,
        type,
        width: cWidth * 0.8
      };
    case 'image':
      return {
        id,
        type,
        x: cWidth * 0.15,
        y: cHeight * 0.15,
        width: cWidth * 0.7,
        height: cHeight * 0.7,
        image: undefined
      };
    case 'text':
      return {
        id,
        type,
        x: cWidth * 0.2,
        y: cHeight * 0.15,
        width: cWidth * 0.6,
        height: cHeight * 0.7,
        text: 'Some text',
        align: 'left',
        fill: Util.getRandomColor(),
        fontFamily: FontFamily.ARIAL,
        fontSize: 20
      };
  }
};

export const addShape = (
  editorState: CanvasEditorState,
  shapeType: EditorShape['type']
): CanvasEditorState => {
  const newShape = createShape(editorState, shapeType);
  return {
    ...editorState,
    shapes: [...editorState.shapes, newShape]
  };
};
