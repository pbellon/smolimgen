// specific kind of shape based on <CanvasRectShape /> to have react that takes full canvas size

import type { KonvaEventObject } from 'konva/lib/Node';
import { FC } from 'react';

import { CanvasRectShape } from './CanvasRectShape';
import {
  BackgroundShape,
  RectShape,
  ShapePropsWithSelection,
  Size
} from '../types';

const doNothing = () => {
  // does nothing
};

const getRectShape = (shape: BackgroundShape, size: Size): RectShape => ({
  fill: shape.fill,
  height: size.height,
  id: shape.id,
  type: 'rect',
  width: size.width,
  x: 0,
  y: 0
});

// cannot be dragged
export const CanvasBackgroundShape: FC<
  ShapePropsWithSelection<BackgroundShape> & {
    size: Size;
    onClick: (e: KonvaEventObject<MouseEvent>) => void;
  }
> = ({ onClick, shape, size }) => (
  <CanvasRectShape
    isSelected={false}
    onClick={onClick}
    onSelect={doNothing}
    onUpdate={doNothing}
    shape={getRectShape(shape, size)}
  />
);
