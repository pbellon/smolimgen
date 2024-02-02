import { FC } from 'react';
import { Image } from 'react-konva/lib/ReactKonvaCore';
import 'konva/lib/shapes/Image';

import { ImageShape } from '../types';

type ImageShapeProps = {
  shape: ImageShape;
};

export const CanvasImageShape: FC<ImageShapeProps> = ({ shape }) => {
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
