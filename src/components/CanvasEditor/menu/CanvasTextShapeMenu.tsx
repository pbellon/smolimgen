import { FC } from 'react';

import { Field } from '@components/Field';
import { Select } from '@components/Select';
import {
  valueToSelectOption,
  valuesToSelectOptions
} from '@utils/valuesToSelectOptions';

import { FontFamily, ShapeProps, TextAlign, TextShape } from '../types';

const alignValues: TextAlign[] = ['center', 'left', 'right'];
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

export const CanvasTextShapeMenu: FC<ShapeProps<TextShape>> = ({
  shape,
  onUpdate
}) => (
  <>
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
            align: e.target.value as TextAlign
          })
        }
      />
    </Field>
  </>
);
