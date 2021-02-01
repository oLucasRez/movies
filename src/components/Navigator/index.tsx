import { FC, HTMLAttributes, useContext } from 'react';

import PageContext from '../../contexts/PageContext';
import Circle from '../Circle';

import './styles.css';

interface NavigatorProps extends HTMLAttributes<HTMLElement> {
  totalPages: number;
}
//=============================================================================
const Navigator: FC<NavigatorProps> = ({ totalPages, ...props }) => {
  const [currentPage, setCurrentPage] = useContext(PageContext);

  const showFirst = () => totalPages > 5 && (currentPage ?? 1) > 3;
  const showLast = () =>
    totalPages > 5 && (currentPage ?? totalPages) < totalPages - 2;

  const getMiddle = () => {
    if (!currentPage) return [];
    if (totalPages <= 5) {
      let array: number[] = [];
      for (let i = 1; i <= totalPages; i++) array.push(i);
      return array;
    }

    const o____ = currentPage === 1;
    const _o___ = currentPage === 2;
    const ___o_ = currentPage === totalPages - 1;
    const ____o = currentPage === totalPages;

    let a: number;
    if (o____) a = 2;
    else if (_o___) a = 1;
    else if (___o_) a = -1;
    else if (____o) a = -2;
    else a = 0;

    return [
      currentPage - 2 + a,
      currentPage - 1 + a,
      currentPage + a,
      currentPage + 1 + a,
      currentPage + 2 + a
    ];
  };

  return (
    <div {...props} className="navigator-container">
      {showFirst() ? (
        <>
          <div
            className="side-number title"
            onClick={() => {
              if (setCurrentPage) setCurrentPage(1);
            }}
          >
            1
          </div>
          ...
        </>
      ) : null}

      {getMiddle().map((number, index) => {
        if (number === currentPage)
          return (
            <Circle key={index} className="main-number" size={4}>
              {number}
            </Circle>
          );
        return (
          <div
            key={index}
            className="side-number title"
            onClick={() => {
              if (setCurrentPage) setCurrentPage(number);
            }}
          >
            {number}
          </div>
        );
      })}

      {showLast() ? (
        <>
          ...
          <div
            className="side-number title"
            onClick={() => {
              if (setCurrentPage) setCurrentPage(totalPages);
            }}
          >
            {totalPages}
          </div>
        </>
      ) : null}
    </div>
  );
};

export default Navigator;
