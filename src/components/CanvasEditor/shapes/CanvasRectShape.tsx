import type { KonvaEventObject } from 'konva/lib/Node';
import { FC } from 'react';
import { Rect } from 'react-konva/lib/ReactKonvaCore';

import { CanvasShapeResizer } from './CanvasShapeResizer';
import { RectShape, ShapePropsWithSelection } from '../types';

export const CanvasRectShape: FC<
  ShapePropsWithSelection<RectShape> & {
    onClick?: (e: KonvaEventObject<MouseEvent>) => void;
  }
> = props => {
  const { isSelected, shape, onClick, onSelect, onUpdate } = props;

  return (
    <CanvasShapeResizer
      isSelected={isSelected}
      onClick={onClick}
      onSelect={onSelect}
      onUpdate={onUpdate}
      shape={shape}
    >
      <Rect
        width={shape.width}
        height={shape.height}
        fill={shape.fill}
        x={shape.x}
        y={shape.y}
        draggable
      />
    </CanvasShapeResizer>
  );
};
