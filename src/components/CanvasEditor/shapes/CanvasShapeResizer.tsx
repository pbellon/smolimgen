import 'konva/lib/shapes/Transformer';
import {
  ReactElement,
  cloneElement,
  useCallback,
  useEffect,
  useMemo,
  useRef
} from 'react';
import { Text, Image, Rect, Transformer } from 'react-konva/lib/ReactKonvaCore';

import {
  ImageShape,
  KonvaEventObject,
  KonvaNodeTypeForShape,
  KonvaTransformer,
  RectShape,
  TextShape
} from '../types';

type SupportedEditorShape = RectShape | ImageShape | TextShape;

type SupportedChildren =
  | ReactElement<typeof Text>
  | ReactElement<typeof Image>
  | ReactElement<typeof Rect>;

type CanvasShapeResizerProps<TShape extends SupportedEditorShape> = {
  children: SupportedChildren;
  contentWhenSelected?: ReactElement;
  isSelected: boolean;
  onClick?: (e: KonvaEventObject<MouseEvent>) => void;
  onSelect: (shape: TShape | undefined) => void;
  onUpdate: (shape: TShape) => void;
  shape: TShape;
};

export const CanvasShapeResizer = <TShape extends SupportedEditorShape>(
  props: CanvasShapeResizerProps<TShape>
): JSX.Element => {
  const {
    children: childrenProp,
    contentWhenSelected,
    isSelected,
    onClick,
    onSelect,
    onUpdate,
    shape
  } = props;
  const shapeRef = useRef<KonvaNodeTypeForShape<TShape>>(null);
  const trRef = useRef<KonvaTransformer>(null);

  const handleClick = useCallback(
    (e: KonvaEventObject<MouseEvent>) => {
      onClick?.(e);
      onSelect(isSelected ? undefined : shape);
    },
    [onClick, onSelect, isSelected, shape]
  );

  const handleDragEnd = useCallback(
    (e: KonvaEventObject<DragEvent>) => {
      const newShape = {
        ...shape,
        x: e.target.x(),
        y: e.target.y()
      };
      console.log('handleDragEnd', e, newShape);
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

  const children = useMemo(
    () =>
      cloneElement(childrenProp as JSX.Element, {
        ref: shapeRef,
        onClick: handleClick,
        onTransformEnd: handleTransformEnd,
        onDragEnd: handleDragEnd
      }),
    [childrenProp, handleClick, handleDragEnd, handleTransformEnd]
  );

  return (
    <>
      {children}
      {isSelected && (
        <>
          {contentWhenSelected}
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
      )}
    </>
  );
};
