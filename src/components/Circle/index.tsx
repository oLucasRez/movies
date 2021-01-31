import { FC, HTMLAttributes } from 'react';

import './styles.css';

interface CircleProps extends HTMLAttributes<HTMLElement> {
  size: number;
}
//=============================================================================
const Circle: FC<CircleProps> = ({ children, size, ...props }) => {
  return (
    <div
      {...props}
      style={{
        width: size + 'rem',
        height: size + 'rem',
        fontSize: size / 3 + 'rem'
      }}
      id="circle-container"
    >
      <div className="title">{children}</div>
    </div>
  );
};

export default Circle;
