import { FC } from 'react';

import { CanvasImageShape } from './shapes/CanvasImageShape';
import { CanvasRectShape } from './shapes/CanvasRectShape';
import { CanvasTextShape } from './shapes/CanvasTextShape';
import type { EditorShape } from './types';

type CanvasShapeProps = {
  shape: EditorShape;
};

export const CanvasShape: FC<CanvasShapeProps> = ({ shape }) => {
  switch (shape.type) {
    case 'rect':
      return <CanvasRectShape shape={shape} />;
    case 'text':
      return <CanvasTextShape shape={shape} />;
    case 'image':
      return <CanvasImageShape shape={shape} />;
  }
};
