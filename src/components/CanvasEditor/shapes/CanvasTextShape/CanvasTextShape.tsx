import 'konva/lib/shapes/Text';
import 'konva/lib/shapes/Transformer';
import type { KonvaEventObject } from 'konva/lib/Node';
import type { Text as KText } from 'konva/lib/shapes/Text';
import type { Transformer as KTransformer } from 'konva/lib/shapes/Transformer';
import { FC, useCallback, useEffect, useRef } from 'react';
import { Text, Transformer } from 'react-konva/lib/ReactKonvaCore';
import { Html } from 'react-konva-utils';

import styles from './CanvasTextShape.module.scss';
import { ShapePropsWithSelection, Size, TextShape } from '../../types';
import { px } from '../../utils/px';

export const CanvasTextShape: FC<
  ShapePropsWithSelection<TextShape> & { size: Size }
> = ({ shape, isSelected, onSelect, onUpdate, size }) => {
  console.log({ shape });

  const shapeRef = useRef<KText>(null);
  const trRef = useRef<KTransformer>(null);

  const handleClick = useCallback(() => {
    onSelect(isSelected ? undefined : shape);
  }, [isSelected, onSelect, shape]);

  const handleDragEnd = useCallback(
    (e: KonvaEventObject<DragEvent>) => {
      const newShape = {
        ...shape,
        x: e.target.x(),
        y: e.target.y()
      };
      onUpdate(newShape);
    },
    [onUpdate, shape]
  );

  const handleTransformEnd = useCallback((): void => {
    if (!shapeRef.current) {
      return;
    }
    const node = shapeRef.current;
    const scaleX = node.scaleX();
    const scaleY = node.scaleY();

    // we will reset it back
    node.scaleX(1);
    node.scaleY(1);

    const newShape = {
      ...shape,
      x: node.x(),
      y: node.y(),
      // set minimal value
      width: Math.max(5, node.width() * scaleX),
      height: Math.max(node.height() * scaleY)
    };
    onUpdate(newShape);
  }, [onUpdate, shape]);

  useEffect(() => {
    if (isSelected && trRef.current && shapeRef.current) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer()?.batchDraw();
    }
  }, [isSelected]);

  return (
    <>
      <Text
        wrap="word"
        opacity={isSelected ? 0.01 : 1}
        ref={shapeRef}
        text={shape.text}
        align={shape.align}
        onTransformEnd={handleTransformEnd}
        x={shape.x}
        y={shape.y}
        width={shape.width}
        height={shape.height}
        fill={shape.fill}
        fontFamily={shape.fontFamily}
        fontSize={shape.fontSize}
        draggable
        onDragEnd={handleDragEnd}
        onClick={handleClick}
        // TODO
        // verticalAlign={}
      />
      {isSelected ? (
        <>
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
          <Transformer
            ref={trRef}
            flipEnabled={false}
            boundBoxFunc={(oldBox, newBox) => {
              // limit resize
              if (Math.abs(newBox.width) < 5 || Math.abs(newBox.height) < 5) {
                return oldBox;
              }
              return newBox;
            }}
          />
        </>
      ) : null}
    </>
  );
};
