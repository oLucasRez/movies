import { FC, HTMLAttributes, useContext, useState } from 'react';

import PageContext from '../../contexts/PageContext';
import Circle from '../Circle';

import './styles.css';

interface NavigatorProps extends HTMLAttributes<HTMLElement> {
  totalPages: number;
}
//=============================================================================
const Navigator: FC<NavigatorProps> = ({ totalPages, ...props }) => {
  const [currentPage, setCurrentPage] = useContext(PageContext);
  // const [numbers, setNumbers] = useState<number[]>([1]);

  // const defineNumbers = () => {
  //   if (!currentPage) return [];

  //   const totalNumbers = totalPages < 11 ? totalPages : 11;
  //   const _numbers: number[] = [];

  //   for (
  //     let i = currentPage - totalNumbers / 2;
  //     i < currentPage + totalNumbers / 2;
  //     i++
  //   ) {
  //     _numbers.push(i);
  //   }

  //   return _numbers;
  // };

  // console.log(defineNumbers());

  return (
    <div {...props} className="navigator-container">
      {[1, 2, 3, 4, 5].map((number, index) => {
        if (number === currentPage)
          return (
            <Circle key={index} className="main-number" size={4}>
              {number}
            </Circle>
          );
        return (
          <div
            className="side-number title"
            onClick={() => {
              if (setCurrentPage) setCurrentPage(number);
            }}
          >
            {number}
          </div>
        );
      })}
      ...
      <div className="side-number title">{totalPages}</div>
    </div>
  );
};

export default Navigator;
