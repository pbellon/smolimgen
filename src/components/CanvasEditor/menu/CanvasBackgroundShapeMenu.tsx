import { FC } from 'react';

import { Field } from '@components/Field';

import { BackgroundShape, ShapeProps } from '../types';

export const CanvasBackgroundShapeMenu: FC<ShapeProps<BackgroundShape>> = ({
  shape,
  onUpdate
}) => (
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
);
