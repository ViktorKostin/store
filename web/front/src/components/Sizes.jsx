import { ButtonGroup } from '@material-ui/core';

import Size from './Size'
const Sizes = ({toogleSize, productId, sizes}) => {
  return (
    <ButtonGroup aria-label="outlined primary button group">
      {sizes.map(size => 
        <Size 
          toogleSize={() => {toogleSize(productId, size.value)}}
          id={productId}
          key={size.value}
          {...size} />
      )}
    </ButtonGroup>
  );
};

export default Sizes;
