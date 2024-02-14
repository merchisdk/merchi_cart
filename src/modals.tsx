import Cart from './Cart';
import { useSelector } from 'react-redux';
import { toggleCartOpen } from './store';
import { Modal } from 'reactstrap';
import { ButtonListWrappedOpenCart } from './buttons/ButtonOpenCartMerchiCartModal';
import { PropsCart } from './CartProvider';

interface Props extends PropsCart {
  cartButtonWrappedInContainer?: boolean;
  cartIconButtonClass?: string;
  currentUser?: any;
  customSuccessMessage?: string;
  domainId?: number;
  listContainerClass?: string;
  listItemClass?: string;
  showOpenCartButton?: boolean;
  size?: string;
  storeId?: number;
}

export function MerchiCartModal(props: Props) {
  const { modalCartOpen } = useSelector((s: any) => s.stateCart);
  const {
    cartButtonWrappedInContainer = true,
    listContainerClass,
    listItemClass,
    showOpenCartButton = true,
    size = 'xl',
  } = props;
  return (
    <>
      {showOpenCartButton && (
        <ButtonListWrappedOpenCart
          cartButtonWrappedInContainer={cartButtonWrappedInContainer}
          listContainerClass={listContainerClass}
          listItemClass={listItemClass}
        />
      )}
      <Modal
        size={size}
        className='m-auto'
        isOpen={modalCartOpen}
        toggle={toggleCartOpen}
      >
        <Cart {...props} />
      </Modal>
    </>
  );
}

export function MerchiShoppingCartModal(props: Props) {
  const { storeId } = props;
  return (
    <MerchiCartModal {...props} domainId={storeId} />
  );
}
