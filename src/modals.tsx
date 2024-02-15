import { useEffect } from 'react';
import { CartComponents } from './Cart';
import { useSelector } from 'react-redux';
import {
  actionFetchTheme,
  initMerchiCart,
  store,
  toggleCartOpen,
} from './store';
import { Modal } from 'reactstrap';
import { ButtonListWrappedOpenCart } from './buttons/ButtonOpenCartMerchiCartModal';
import CartProvider, { PropsCart } from './CartProvider';
import { Provider } from 'react-redux';

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
  const { modalCartOpen } = useSelector((s: any) => s.stateCart);
  const {
    cartButtonWrappedInContainer = true,
    includeTheme,
    initialiseCart,
    domainId,
    listContainerClass,
    listItemClass,
    showOpenCartButton = true,
    size = 'xl',
  } = props;
  // Init cart and token on mount
  useEffect(() => {
    if (initialiseCart && domainId) {
      if (includeTheme) {
        actionFetchTheme(domainId);
      }
      initMerchiCart(domainId);
    }
  }, [domainId, includeTheme, initialiseCart]);
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
        <CartComponents />
      </Modal>
    </>
  );
}

export function MerchiCartModal(props: Props) {
  return (
    <Provider store={store}>
      <CartProvider {...props}>
        <CartModal {...props} />
      </CartProvider>
    </Provider>
  );
}

export function MerchiShoppingCartModal(props: Props) {
  const { storeId } = props;
  return (
    <MerchiCartModal {...props} domainId={storeId} />
  );
}
