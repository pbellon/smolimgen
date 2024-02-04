import 'konva/lib/shapes/Transformer';
import { FC } from 'react';
import { Text } from 'react-konva/lib/ReactKonvaCore';
import { Html } from 'react-konva-utils';

import styles from './CanvasTextShape.module.scss';
import { ShapePropsWithSelection, Size, TextShape } from '../../types';
import { px } from '../../utils/px';
import { CanvasShapeResizer } from '../CanvasShapeResizer';

export const CanvasTextShape: FC<
  ShapePropsWithSelection<TextShape> & { size: Size }
> = ({ shape, isSelected, onSelect, onUpdate, size }) => (
  <CanvasShapeResizer
    contentWhenSelected={
      <Html
        divProps={{
          className: styles['holder'],
          style: {
            width: px(size.width),
            height: px(size.height)
          }
        }}
      >
        <textarea
          className={styles.textarea}
          autoFocus={isSelected}
          style={{
            left: px(shape.x),
            top: px(shape.y),
            width: px(shape.width),
            height: px(shape.height),
            fontSize: `${shape.fontSize}px`,
            fontFamily: shape.fontFamily,
            textAlign: shape.align,
            color: shape.fill
          }}
          value={shape.text}
          onChange={e => {
            onUpdate({
              ...shape,
              text: e.target.value
            });
          }}
        />
      </Html>
    }
    onSelect={onSelect}
    onUpdate={onUpdate}
    isSelected={isSelected}
    shape={shape}
  >
    <Text
      align={shape.align}
      draggable
      fill={shape.fill}
      fontFamily={shape.fontFamily}
      fontSize={shape.fontSize}
      height={shape.height}
      opacity={isSelected ? 0.01 : 1}
      text={shape.text}
      width={shape.width}
      wrap="word"
      x={shape.x}
      y={shape.y}
      // TODO
      // verticalAlign={}
    />
  </CanvasShapeResizer>
);
