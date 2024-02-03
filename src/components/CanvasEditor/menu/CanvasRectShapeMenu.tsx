import { FC } from 'react';

import { Field } from '@components/Field';

import { RectShape } from '../types';

type CanvasRectShapeMenuProps = {
  shape: RectShape;
  onUpdate: (shape: RectShape) => void;
};
export const CanvasRectShapeMenu: FC<CanvasRectShapeMenuProps> = ({
  shape,
  onUpdate
}) => (
  <>
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
