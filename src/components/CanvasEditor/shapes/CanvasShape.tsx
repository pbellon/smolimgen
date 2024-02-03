import type { KonvaEventObject } from 'konva/lib/Node';
import { FC } from 'react';

import { CanvasBackgroundShape } from './CanvasBackgroundShape';
import { CanvasImageShape } from './CanvasImageShape';
import { CanvasRectShape } from './CanvasRectShape';
import { CanvasTextShape } from './CanvasTextShape';
import type { ShapePropsWithSelection, Size } from '../types';

export const CanvasShape: FC<
  ShapePropsWithSelection & {
    size: Size;
    onBackgroundClick: (e: KonvaEventObject<MouseEvent>) => void;
  }
> = ({ isSelected, onBackgroundClick, onSelect, onUpdate, shape, size }) => {
  switch (shape.type) {
    case 'background':
      return (
        <CanvasBackgroundShape
          isSelected={isSelected}
          onClick={onBackgroundClick}
          onSelect={onSelect}
          onUpdate={onUpdate}
          shape={shape}
          size={size}
        />
      );
    case 'rect':
      return (
        <CanvasRectShape
          isSelected={isSelected}
          onSelect={onSelect}
          onUpdate={onUpdate}
          shape={shape}
        />
      );
    case 'text':
      return (
        <CanvasTextShape
          isSelected={isSelected}
          onSelect={onSelect}
          onUpdate={onUpdate}
          shape={shape}
          size={size}
        />
      );
    case 'image':
      return (
        <CanvasImageShape
          isSelected={isSelected}
          onSelect={onSelect}
          onUpdate={onUpdate}
          shape={shape}
        />
      );
  }
};
