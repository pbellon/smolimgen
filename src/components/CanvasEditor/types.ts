import type { Image as KonvaImage } from 'konva/lib/shapes/Image';
import type { Rect as KonvaRect } from 'konva/lib/shapes/Rect';
import type { Text as KonvaText } from 'konva/lib/shapes/Text';
import type { Transformer as KonvaTransformer } from 'konva/lib/shapes/Transformer';
export type { KonvaEventObject } from 'konva/lib/Node';

export { KonvaImage, KonvaRect, KonvaText, KonvaTransformer };

export enum FontFamily {
  ARIAL = 'Arial'
}

export type TextAlign = 'center' | 'left' | 'right';

export type BaseShape<Type extends string> = {
  type: Type;
  id: string;
};

export type ResizableShapeProps = Position & Size;

export type TextShape = BaseShape<'text'> & {
  align: TextAlign;
  fill: string;
  fontFamily: FontFamily;
  fontSize: number;
  text: string;
} & ResizableShapeProps;

export type ImageShape = BaseShape<'image'> & {
  image: CanvasImageSource | undefined;
} & ResizableShapeProps;

export type RectShape = BaseShape<'rect'> & {
  fill: string;
} & ResizableShapeProps;

export type BackgroundShape = BaseShape<'background'> & {
  fill: string;
};

export type EditorShape = RectShape | TextShape | ImageShape | BackgroundShape;

export type EditorShapeType = EditorShape['type'];

export type KonvaNodeTypeForShape<TShape extends EditorShape> =
  TShape extends RectShape
    ? KonvaRect
    : TShape extends TextShape
      ? KonvaText
      : TShape extends ImageShape
        ? KonvaImage
        : never;

export type OnShapeUpdateHandler<TShape extends EditorShape = EditorShape> = (
  shape: TShape
) => void;

export type ShapeProps<TShape extends EditorShape = EditorShape> = {
  shape: TShape;
  onUpdate: OnShapeUpdateHandler<TShape>;
};

export type ShapePropsWithSelection<TShape extends EditorShape = EditorShape> =
  ShapeProps<TShape> & {
    isSelected: boolean;
    onSelect: (shape: TShape | undefined) => void;
  };

export type Size = {
  height: number;
  width: number;
};

export type Position = {
  x: number;
  y: number;
};

export type CanvasEditorState = {
  selectedShapeId: string | undefined;
  shapes: EditorShape[];
  name: string;
  size: Size;
};
