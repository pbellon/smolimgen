import cx from 'classnames';
import { FC } from 'react';

import { CanvasBackgroundShapeMenu } from './CanvasBackgroundShapeMenu';
import { CanvasImageShapeMenu } from './CanvasImageShapeMenu';
import { CanvasRectShapeMenu } from './CanvasRectShapeMenu';
import styles from './CanvasShapeMenu.module.scss';
import { CanvasTextShapeMenu } from './CanvasTextShapeMenu';
import { EditorShape, ShapeProps } from '../types';

const CanvasShapeMenuForShape: FC<ShapeProps> = ({ shape, onUpdate }) => {
  switch (shape.type) {
    case 'background':
      return <CanvasBackgroundShapeMenu shape={shape} onUpdate={onUpdate} />;
    case 'image':
      return <CanvasImageShapeMenu shape={shape} onUpdate={onUpdate} />;
    case 'rect':
      return <CanvasRectShapeMenu shape={shape} onUpdate={onUpdate} />;
    case 'text':
      return <CanvasTextShapeMenu shape={shape} onUpdate={onUpdate} />;
  }
};

type CanvasShapeMenuProps = ShapeProps & {
  canMoveDown: boolean;
  canMoveUp: boolean;
  onMoveDown: () => void;
  onMoveUp: () => void;
  onRemove: () => void;
};

const CanvasShapeTitle: FC<{ shape: EditorShape }> = ({ shape }) => {
  switch (shape.type) {
    case 'text':
      return 'Text';
    case 'background':
      return 'Background';
    case 'image':
      return 'Image';
    case 'rect':
      return 'Rectangle';
  }
};

export const CanvasShapeMenu: FC<CanvasShapeMenuProps> = ({
  shape,
  onUpdate,
  onMoveDown,
  onMoveUp,
  onRemove,
  canMoveDown,
  canMoveUp
}) => (
  <div
    className={cx(styles['shape-menu'], styles[`shape-menu--${shape.type}`])}
  >
    <h3>
      <CanvasShapeTitle shape={shape} />
    </h3>
    <div className={styles['shape-menu__controls']}>
      <div className={styles['shape-menu__position']}>
        <button
          className={cx(
            styles['shape-menu__control'],
            styles['shape-menu__position--up']
          )}
          disabled={!canMoveUp}
          onClick={onMoveUp}
          type="button"
        >
          ⏶
        </button>
        <button
          className={cx(
            styles['shape-menu__control'],
            styles['shape-menu__position--down']
          )}
          disabled={!canMoveDown}
          onClick={onMoveDown}
        >
          ⏷
        </button>
      </div>
      <button
        title="Remove shape"
        className={styles['shape-menu__control']}
        onClick={onRemove}
      >
        🗑
      </button>
    </div>
    {/* <div className={styles['shape-menu__fields']}> */}
    <CanvasShapeMenuForShape shape={shape} onUpdate={onUpdate} />
    {/* </div> */}
  </div>
);
