import { FC } from 'react';
import { Image } from 'react-konva/lib/ReactKonvaCore';
import 'konva/lib/shapes/Image';

import { ImageShape, ShapePropsWithSelection } from '../types';

export const CanvasImageShape: FC<ShapePropsWithSelection<ImageShape>> = ({
  shape
}) => {
  console.log({ shape });

  return (
    <Image
      image={shape.image}
      x={shape.x}
      y={shape.y}
      width={shape.width}
      height={shape.height}
    />
  );
};
