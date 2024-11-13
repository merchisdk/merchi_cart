import { CartComponents } from './Cart';
import { Modal } from 'reactstrap';
import { ButtonListWrappedOpenCart } from './buttons/ButtonOpenCartMerchiCartModal';
import CartProvider, { PropsCart, useCartContext } from './CartProvider';

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

function CartModal(props: Props) {
  const { isCartModalOpen, toggleCartModal } = useCartContext();
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
        isOpen={isCartModalOpen}
        toggle={toggleCartModal}
      >
        <CartComponents />
      </Modal>
    </>
  );
}

export function MerchiCartModal(props: Props) {
  return (
    <CartProvider {...props}>
      <CartModal {...props} />
    </CartProvider>
  );
}

export function MerchiShoppingCartModal(props: Props) {
  const { storeId } = props;
  return (
    <MerchiCartModal {...props} domainId={storeId} />
  );
}
