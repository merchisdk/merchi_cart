import * as React from 'react';
import { Provider } from 'react-redux';
import Cart from './cart';
import CssCartUtility from '../css/CssCartUtility';
import CssModalHelper from '../css/CssModalHelper';
import { actionFetchTheme, initMerchiCart, store } from './store';

interface Props {
  btnClass?: string;
  cartButtonWrappedInContainer?: boolean;
  cartIconButtonClass?: string;
  containerClass?: string;
  currentUser?: any;
  customSuccessMessage?: string;
  googleApiPublicKey?: string; // for google maps
  hideFacebookLogin?: boolean;
  includeBootstrap?: boolean;
  includeModalCss?: boolean;
  includeTheme?: boolean;
  classNameListItem?: string;
  showOpenCartButton?: boolean;
  storeId: number;
  tableMode?: boolean;
}

function ShoppingCart(props: Props) {
  const {
    includeBootstrap,
    includeModalCss,
    includeTheme,
    storeId,
  } = props;
  React.useEffect(() => {
    if (includeTheme) {
      actionFetchTheme(storeId);
    }
    initMerchiCart(storeId);
  }, [storeId]);
  return (
    <Provider store={store}>
      {includeBootstrap && <CssCartUtility />}
      {includeModalCss && <CssModalHelper />}
      <Cart domainId={storeId} {...props} />
    </Provider>
  );
}

export default ShoppingCart;
