import { FC } from 'react';

import { CanvasBackgroundShapeMenu } from './CanvasBackgroundShapeMenu';
import { CanvasImageShapeMenu } from './CanvasImageShapeMenu';
import { CanvasRectShapeMenu } from './CanvasRectShapeMenu';
import { CanvasTextShapeMenu } from './CanvasTextShapeMenu';
import { ShapeProps } from '../types';

export const CanvasShapeMenu: FC<ShapeProps> = ({ shape, onUpdate }) => {
  switch (shape.type) {
    case 'background':
      return <CanvasBackgroundShapeMenu shape={shape} onUpdate={onUpdate} />;
    case 'image':
      return <CanvasImageShapeMenu shape={shape} onUpdate={onUpdate} />;
    case 'rect':
      return <CanvasRectShapeMenu shape={shape} onUpdate={onUpdate} />;
    case 'text':
      return <CanvasTextShapeMenu shape={shape} onUpdate={onUpdate} />;
  }
};
