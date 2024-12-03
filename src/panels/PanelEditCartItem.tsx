import MerchiProductForm from 'merchi_product_form';
import { tabIdItem, tabIdItems } from '../utilities/tabs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { Button, ButtonBack } from '../buttons';
import {
  CartBody,
  CartFooter,
  CartTabPanel,
} from '../components';
import { useCartContext } from '../CartProvider';
import { useState } from 'react';
import { makeCartItem } from '../utilities/cart';
import { getCartCookieToken } from '../utilities/cookie';

function cleanVariation(variation: any) {
  const { variationField = {} } = variation;
  return {
    ...variation,
    id: undefined,
    value: variation.value,
    variationField: {id: variationField.id},
    variationFiles: variation.variationFiles.map((f: any) => ({id: f.id})),
  };
}

function cleanVariationGroups(variationsGroup: any) {
  const { quantity = 0, variations = [] } = variationsGroup;
  return {
    idL: undefined,
    quantity,
    variations: variations?.map(cleanVariation),
  };
}

interface Props {
  cart: any;
}

function PanelEditCartItem({ cart }: Props) {
  const {
    activeTabIndex,
    alertError,
    alertSuccess,
    cartItem,
    domainId,
    productFormClassNames,
    classNameBtnEditCartItem,
    apiUrl,
    refetchCart,
    setActiveTabIndex,
    setCartItem,
  } = useCartContext();
  const [loading, setLoading] = useState(false);
  const formId = 'edit-cart-item-form';
  
  // This action patches the cart item
  async function actionCartItemEdit(cartItemJson: any) {
    setLoading(true);
    const cartToken = await getCartCookieToken((domainId as number));
    try {
      const {
        product,
        quantity = 0,
        taxType,
        variations = [],
        variationsGroups = [],
      } = cartItemJson;
  
      const cartItemEnt = makeCartItem({
        ...cartItem,
        id: (cartItem as any).id,
        cart: {id: (cart as any).id},
        product: product ? {id: product.id} : undefined,
        taxType: taxType ? {id: taxType.id} : undefined,
        quantity,
        variations: variations.map(cleanVariation),
        variationsGroups: variationsGroups.map(cleanVariationGroups),
      }, true, cartToken);
  
      // Save changes to the Cart Item
      await cartItemEnt.save();
  
      // Refetch the Cart and all it's relationships
      await refetchCart();
  
      // Show success alert
      alertSuccess('Item updated.');
  
      // Set active Cart tab
      setActiveTabIndex(tabIdItems);
  
      // Clear Cart Item from state
      setCartItem({});
    } catch (e: any) {
      alertError(e.errorMessage || e.message || 'Unable to edit Cart Item.');
    } finally {
      setLoading(false);
    }
  }

  function onSubmit(jobJson: any) {
    actionCartItemEdit(jobJson);
  }
  const cleanCartItem = {
    ...cartItem,
    id: undefined,
  };
  return (
    <CartTabPanel tabId={tabIdItem}>
      <CartBody style={{padding: '2rem'}}>
        {activeTabIndex === tabIdItem && cartItem?.id && cartItem?.product?.id && (
          <MerchiProductForm
            apiUrl={apiUrl}
            isCartItem={true}
            initJob={{...cleanCartItem}}
            initProduct={cartItem.product}
            onSubmit={onSubmit}
            productFormId={formId}
            hideRequestQuotationButton={true}
            hidePaymentUpfrontButton={true}
            {...productFormClassNames}
          />
        )}
      </CartBody>
      <CartFooter>
        <ButtonBack />
        <Button
          className={classNameBtnEditCartItem}
          disabled={loading}
          form={formId}
          type='submit'
        >
          {loading && <FontAwesomeIcon icon={faCircleNotch} spin />}
          {loading ? ' Loading...' : 'Save'}
        </Button>
      </CartFooter>
    </CartTabPanel>
  );
}

export default PanelEditCartItem;
