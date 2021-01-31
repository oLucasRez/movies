import { FC, HTMLAttributes } from 'react';

import './styles.css';

//=============================================================================
const Card: FC<HTMLAttributes<HTMLElement>> = ({ children, ...props }) => {
  return (
    <div {...props} className="tag-container title">
      {children}
    </div>
  );
};

export default Card;
