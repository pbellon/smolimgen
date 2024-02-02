import 'konva/lib/shapes/Rect';
import { FC } from 'react';
import { Rect } from 'react-konva/lib/ReactKonvaCore';

import { RectShape } from '../types';

type RectShapeProps = {
  shape: RectShape;
};

export const CanvasRectShape: FC<RectShapeProps> = ({ shape }) => {
  console.log({ shape });

  return (
    <Rect
      width={shape.width}
      height={shape.height}
      fill={shape.fill}
      x={shape.x}
      y={shape.y}
    />
  );
};
