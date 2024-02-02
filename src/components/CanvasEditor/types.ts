export enum FontFamily {}

export type TextShape = {
  value: string;
  width: number;
  height: number;
  x: number;
  y: number;
  fontFamily: FontFamily;
};

export type ImageShape = {
  width: number;
  height: number;
  x: number;
  y: number;
  data: string;
};

export type RectShape = {
  width: number;
  height: number;
  x: number;
  y: number;
  fill: string;
};

export type Shape = RectShape | TextShape | ImageShape;

export type CanvasEditorState = {
  shapes: Shape[];
  name: string;
  width: number;
  height: number;
};
