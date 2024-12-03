import { useCartContext } from '../CartProvider';
import { tabIdClearCart } from '../utilities/tabs';
import Button from './Button';

function ButtonClearCart() {
  const { classNameBtnCartClear, setActiveTabIndex } = useCartContext();
  return (
    <Button
      className={classNameBtnCartClear}
      onClick={() => setActiveTabIndex(tabIdClearCart)}
    >
      Clear cart
    </Button>
  );
}

export default ButtonClearCart;
