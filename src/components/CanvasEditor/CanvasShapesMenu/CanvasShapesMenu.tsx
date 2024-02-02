import { FC } from 'react';

import { Field } from '@components/Field';
import { Select } from '@components/Select';
import {
  valueToSelectOption,
  valuesToSelectOptions
} from '@utils/valuesToSelectOptions';

import styles from './CanvasShapesMenu.module.scss';
import {
  BaseShape,
  EditorShape,
  FontFamily,
  ImageShape,
  RectShape,
  TextShape
} from '../types';

type CanvasBaseShapeMenuProps<
  TType extends string,
  TShape extends BaseShape<TType>
> = {
  shape: TShape;
  onUpdate: (shape: TShape) => void;
};

const CanvasBaseShapeMenu = <
  TType extends string,
  TShape extends BaseShape<TType>
>({
  shape,
  onUpdate
}: CanvasBaseShapeMenuProps<TType, TShape>) => (
  <>
    <Field label="Width" htmlFor={`${shape.id}-width`}>
      <input
        id={`${shape.id}-width`}
        type="number"
        value={shape.width}
        onChange={e => {
          onUpdate({
            ...shape,
            width: parseInt(e.target.value)
          });
        }}
      />
    </Field>
    <Field label="Height" htmlFor={`${shape.id}-height`}>
      <input
        id={`${shape.id}-height`}
        type="number"
        value={shape.height}
        onChange={e => {
          onUpdate({
            ...shape,
            height: parseInt(e.target.value)
          });
        }}
      />
    </Field>
    <Field label="x" htmlFor={`${shape.id}-x`}>
      <input
        id={`${shape.id}-x`}
        type="number"
        value={shape.x}
        onChange={e => {
          onUpdate({
            ...shape,
            x: parseInt(e.target.value)
          });
        }}
      />
    </Field>
    <Field label="y" htmlFor={`${shape.id}-y`}>
      <input
        id={`${shape.id}-y`}
        type="number"
        value={shape.y}
        onChange={e => {
          onUpdate({
            ...shape,
            y: parseInt(e.target.value)
          });
        }}
      />
    </Field>
  </>
);

type CanvasImageShapeMenuProps = {
  shape: ImageShape;
  onUpdate: (shape: ImageShape) => void;
};

const CanvasImageShapeMenu: FC<CanvasImageShapeMenuProps> = ({
  shape,
  onUpdate
}) => (
  <>
    <CanvasBaseShapeMenu shape={shape} onUpdate={onUpdate} />
  </>
);

type CanvasRectShapeMenuProps = {
  shape: RectShape;
  onUpdate: (shape: RectShape) => void;
};

const CanvasRectShapeMenu: FC<CanvasRectShapeMenuProps> = ({
  shape,
  onUpdate
}) => (
  <>
    <CanvasBaseShapeMenu shape={shape} onUpdate={onUpdate} />
    <Field label="Fill color" htmlFor={`${shape.id}-fill`}>
      <input
        type="color"
        value={shape.fill}
        id={`${shape.id}-fill`}
        onChange={e => {
          onUpdate({
            ...shape,
            fill: e.target.value
          });
        }}
      />
    </Field>
  </>
);

type Align = 'center' | 'left' | 'right';

const alignValues: Align[] = ['center', 'left', 'right'];
const alignOptions = alignValues.map(value => {
  return {
    ...valueToSelectOption(value),
    text: value
  };
});

const fontFamilyOptions = valuesToSelectOptions([
  'Monospace',
  'Verdana',
  'Tahoma',
  'Georgia',
  'Arial',
  'Arial Black',
  'sans-serif',
  'serif',
  'Calibri',
  'Times New Roman'
]).map(opt => ({
  ...opt,
  style: {
    fontFamily: opt.value
  }
}));

type CanvasTextShapeMenuProps = {
  shape: TextShape;
  onUpdate: (shape: TextShape) => void;
};

const CanvasTextShapeMenu: FC<CanvasTextShapeMenuProps> = ({
  shape,
  onUpdate
}) => (
  <>
    <CanvasBaseShapeMenu shape={shape} onUpdate={onUpdate} />
    <Field style={{ flex: 2 }} label="Text" htmlFor={`${shape.id}-text`}>
      <textarea
        id={`${shape.id}-text`}
        onChange={e =>
          onUpdate({
            ...shape,
            text: e.target.value
          })
        }
        value={shape.text}
      />
    </Field>
    <Field label="Font size" htmlFor={`${shape.id}-fontSize`}>
      <input
        id={`${shape.id}-fontSize`}
        type="number"
        value={shape.fontSize}
        onChange={e =>
          onUpdate({
            ...shape,
            fontSize: parseInt(e.target.value, 10)
          })
        }
      />
    </Field>
    <Field label="Font color" htmlFor={`${shape.id}-fill`}>
      <input
        id={`${shape.id}-fill`}
        type="color"
        value={shape.fill}
        onChange={e =>
          onUpdate({
            ...shape,
            fill: e.target.value
          })
        }
      />
    </Field>
    <Field label="Font family" htmlFor={`${shape.id}-fontFamily`}>
      <Select
        className={styles['font-family']}
        id={`${shape.id}-fontFamily`}
        value={shape.fontFamily}
        onChange={e =>
          onUpdate({
            ...shape,
            fontFamily: e.target.value as FontFamily
          })
        }
        options={fontFamilyOptions}
      />
    </Field>
    <Field label="Text align" htmlFor={`${shape.id}-textAlign`}>
      <Select
        id={`${shape.id}-textAlign`}
        value={shape.align}
        options={alignOptions}
        onChange={e =>
          onUpdate({
            ...shape,
            align: e.target.value
          })
        }
      />
    </Field>
  </>
);

type CanvasShapeMenuProps = {
  shape: EditorShape;
  onUpdate: (shape: EditorShape) => void;
};

const CanvasShapeMenu: FC<CanvasShapeMenuProps> = ({ shape, onUpdate }) => {
  switch (shape.type) {
    case 'image':
      return <CanvasImageShapeMenu shape={shape} onUpdate={onUpdate} />;
    case 'rect':
      return <CanvasRectShapeMenu shape={shape} onUpdate={onUpdate} />;
    case 'text':
      return <CanvasTextShapeMenu shape={shape} onUpdate={onUpdate} />;
  }
};

type CanvasShapesMenuProps = {
  shapes: EditorShape[];
  onShapeUpdate: (shape: EditorShape) => void;
};

export const CanvasShapesMenu: FC<CanvasShapesMenuProps> = ({
  shapes,
  onShapeUpdate
}) => (
  <div className={styles.menu}>
    {shapes.map(shape => (
      <div className={styles.item} key={shape.id}>
        <CanvasShapeMenu shape={shape} onUpdate={onShapeUpdate} />
      </div>
    ))}
  </div>
);
