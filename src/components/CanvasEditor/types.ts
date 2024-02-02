export enum FontFamily {
  ARIAL = 'Arial'
}

export type BaseShape<Type extends string> = {
  type: Type;
  id: string;
  x: number;
  y: number;
  height: number;
  width: number;
};

export type TextShape = BaseShape<'text'> & {
  align: string;
  fill: string;
  fontFamily: FontFamily;
  fontSize: number;
  text: string;
};

export type ImageShape = BaseShape<'image'> & {
  image: CanvasImageSource;
};

export type RectShape = BaseShape<'rect'> & {
  fill: string;
};

export type EditorShape = RectShape | TextShape | ImageShape;

export type CanvasEditorState = {
  shapes: EditorShape[];
  name: string;
  width: number;
  height: number;
};
