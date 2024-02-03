import { FC } from 'react';

import { ImageShape, ShapeProps } from '../types';

export const CanvasImageShapeMenu: FC<ShapeProps<ImageShape>> = ({
  shape
  // onUpdate
}) => (
  <pre>
    <code>{JSON.stringify(shape, null, 2)}</code>
  </pre>
);
