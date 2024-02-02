import { FC } from 'react';
import { Text } from 'react-konva/lib/ReactKonvaCore';
import 'konva/lib/shapes/Text';

import { TextShape } from '../types';

type TextShapeProps = {
  shape: TextShape;
};

export const CanvasTextShape: FC<TextShapeProps> = ({ shape }) => {
  console.log({ shape });

  return (
    <Text
      wrap="word"
      text={shape.text}
      align={shape.align}
      x={shape.x}
      y={shape.y}
      width={shape.width}
      fill={shape.fill}
      fontFamily={shape.fontFamily}
      fontSize={shape.fontSize}
    />
  );
};
