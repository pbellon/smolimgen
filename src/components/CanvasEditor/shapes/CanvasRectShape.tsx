import 'konva/lib/shapes/Rect';
import type { KonvaEventObject } from 'konva/lib/Node';
import { FC } from 'react';
import { Rect } from 'react-konva/lib/ReactKonvaCore';

import { RectShape, ShapePropsWithSelection } from '../types';

export const CanvasRectShape: FC<
  ShapePropsWithSelection<RectShape> & {
    onClick?: (e: KonvaEventObject<MouseEvent>) => void;
  }
> = ({ shape, onClick }) => {
  console.log({ shape });

  return (
    <Rect
      onClick={e => {
        onClick?.(e);
      }}
      width={shape.width}
      height={shape.height}
      fill={shape.fill}
      x={shape.x}
      y={shape.y}
    />
  );
};
