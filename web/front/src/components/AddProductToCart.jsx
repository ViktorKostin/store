import { Button } from '@material-ui/core';

const AddProductToCart = ({productId, addProduct}) => {
  return (
        <div className="purchase">
            <Button variant='outlined' onClick={() => {addProduct(productId)}}>
              Add to cart
            </Button>
        </div>
  );
};

export default AddProductToCart;
