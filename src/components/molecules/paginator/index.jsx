import React from 'react';
import PropTypes from 'typedefs/proptypes';
import { combineClassNames } from 'utils';
import { AnchorButton, Button } from 'components/atoms/button';

const propTypes = {
  className: PropTypes.string,
  paginator: PropTypes.paginator,
};

/**
 * Renders a pagination component.
 * Dependent on the `Button` and `AnchorButton` components.
 * @param {object} paginator - Pagination data fo the component.
 */
const Paginator = ({
  className,
  paginator: {
    pageNumber,
    totalPages,
    baseUrl,
    slugOrderingSegment,
  },
}) => {
  if (totalPages <= 1) return null;

  /*
    Up to 3 buttons (apart from next and previous):
    - page 1: 1,2,...{totalPages}
    - page 2: 1,2....{totalPages}
    - page 3: 1...3....{totalPages}
    - page X: 1,... X...{totalPages}
    - page {totalPages-2}: 1,...{totalPages-2}...{totalPages}
    - page {totalPages-1}: 1,...{totalPages-1},{totalPages}
    - page {totalPages}: 1,...{totalPages-1},{totalPages}
    - totalPages < 3: all
  */
  let buttons = [];
  if (totalPages <= 3)
    buttons = Array.from({ length: totalPages }, (v, i) => i + 1);
  else if (pageNumber <= 2)
    buttons = [1, 2, '...', totalPages];
  else if (totalPages - pageNumber <= 2)
    buttons = [1, '...', totalPages - 1, totalPages];
  else
    buttons = [1, '...', pageNumber, '...', totalPages];

  return (
    <div className={ combineClassNames`paginator ${className}` } >
      { pageNumber > 1 &&
      <AnchorButton
        className='previous-page icon icon-chevron-left'
        link={ {
          internal: true,
          url: `${baseUrl}/${slugOrderingSegment}/${pageNumber - 1}`,
        } }>
        { '\u200b' }
      </AnchorButton> }
      {
        buttons.map((buttonNumber, i) => (
          buttonNumber === '...' ?
            <span
              className='paginator-separator'
              key={ `sep-${i}` }
            >
              { buttonNumber }
            </span> :
            buttonNumber === pageNumber ?
              <Button
                className='current-page'
                key={ buttonNumber }
              >
                { buttonNumber }
              </Button> :
              <AnchorButton
                key={ buttonNumber }
                link={ {
                  internal: true,
                  url: `${baseUrl}/${slugOrderingSegment}/${buttonNumber}`,
                } }
              >
                { buttonNumber }
              </AnchorButton>
        ))
      }
      { pageNumber < totalPages &&
      <AnchorButton
        className='next-page icon icon-chevron-right'
        link={ {
          internal: true,
          url: `${baseUrl}/${slugOrderingSegment}/${pageNumber + 1}`,
        } }>
        { '\u200b' }
      </AnchorButton> }
    </div>
  );
};

Paginator.propTypes = propTypes;

export default Paginator;
