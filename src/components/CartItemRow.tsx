import * as React from 'react';
import { cartItemCurrencyAndCost } from '../utilities/currency';
import { productFeatureImageUrl } from '../utilities/product';
import { valueString } from '../utilities/variations';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Button } from '../buttons';
import { useCartContext } from '../CartProvider';
import { makeCart } from '../utilities/cart';
import { cartEmbed } from '../utilities/helpers';
import { cartItemsNeedShipment } from '../slices/sliceCart';
import {
  cartHasShippmentGroupsAndAllHaveSelectedGroups,
  initTabs,
  setDisableTab,
  tabCheckout,
  tabShipment,
  tabsWithShipment,
} from '../utilities/tabs';
import { getCartCookieToken } from '../utilities/cookie';

interface VariationListItemProps {
  variation: any;
}

function VariationListItem(props: VariationListItemProps) {
  const { variation } = props;
  const { variationField: field } = variation;
  return (
    <li>{`${field.name}: ${valueString(variation)}`}</li>
  );
}

interface VariationListProps {
  variations: any[];
}

function VariationList({ variations }: VariationListProps) {
  const { classNameVariationsList } = useCartContext();
  return (
    <ul className={classNameVariationsList}>
      {variations.map((v: any, index: number) =>
        <VariationListItem
          key={`${index}-variation`}
          variation={v}
        />
      )}
    </ul>
  );
}

interface GroupVariationItemsProps {
  count: number;
  group: any;
}

function GroupVariationItems(props: GroupVariationItemsProps) {
  const { count, group } = props;
  return (
    <li>
      Group {count} Quantity: {group.quantity}
      <VariationList variations={group.variations} />
    </li>
  );
}

interface VariationsGroupsListProps {
  groups: any[];
}

function VariationsGroupsList({ groups }: VariationsGroupsListProps) {
  const { classNameVariationsList } = useCartContext();
  return (
    <ul className={classNameVariationsList}>
      {groups.map((group: any, index: number) =>
        <GroupVariationItems
          key={`${index}-group-variations`}
          group={group}
          count={index + 1}
        />
      )}
    </ul>
  );
}

interface Props {
  cartItem: any;
  index: number;
  loading: boolean;
}

function CartItemRow({ cartItem, index }: Props) {
  const {
    alertError,
    cart,

    domainId,
    setCart,

    classNameBtnLink,
    classNameCartItemFeatureImage,
    classNameCartItemInfo,
    classNameCartItemInfoCell,
    classNameCartItemInfoCellRight,
    classNameCartItemInfoContainer,

    setCartItem,
    tabs,
    setTabs,
  } = useCartContext();
  const {
    product,
    quantity,
    variations,
    variationsGroups,
  } = cartItem;
  const { name } = product;

  const [loading, setLoading] = React.useState(false);

  async function actionDeleteCartItem() {
    setLoading(true);
    const cartToken = await getCartCookieToken((domainId as number));
    try {
      const cartEnt = makeCart({...cart}, false, cartToken);
      const cartItems = (cartEnt as any).cartItems;
      cartItems.splice(index, 1);
      (cartEnt as any).cartItems = cartItems;
      const r = await cartEnt.save({embed: cartEmbed});
      const cartJson = r.toJson();
      const needsShipping = cartItemsNeedShipment(cartJson);
      setCart({...cartJson});
      if (cart.cartItems.length === 0) {
        setTabs([...initTabs]);
      } else {
        if (needsShipping) {
          setTabs([...tabsWithShipment]);
          if (cart.cartItems.length) {
            const _tabs = [...tabs];
            _tabs[1] = setDisableTab(tabShipment, false);
            if (cartHasShippmentGroupsAndAllHaveSelectedGroups(cartJson)) {
              _tabs[2] = setDisableTab(tabCheckout, false);
            }
            setTabs([..._tabs]);
          }
        } else {
          setTabs([...initTabs]);
        }
      }
    } catch(e: any) {
      alertError(e.errorMessage || e.message || 'Unable to remove item from cart.');
    } finally {
      setLoading(false);
    }
  }
  return (
    <tr>
      <th scope='row' className={classNameCartItemInfoCell}>
        <img
          src={productFeatureImageUrl(product)}
          alt={name}
          width='70'
          className={classNameCartItemFeatureImage}
        />
        <div className={classNameCartItemInfoContainer}>
          <div className={classNameCartItemInfo}>
            <h5 style={{display: 'inline'}}>
              {name}
            </h5>
            {variations && <VariationList variations={variations} />}
          </div>
          <div className={classNameCartItemInfo}>
            {variationsGroups && <VariationsGroupsList groups={variationsGroups} />}
          </div>
        </div>
      </th>
      <td className={classNameCartItemInfoCellRight}>
        <strong>{quantity}</strong>
      </td>
      <td className={classNameCartItemInfoCellRight}>
        <strong>{cartItemCurrencyAndCost(cartItem)}</strong>
      </td>
      <td className={classNameCartItemInfoCellRight}>
        <Button
          className={classNameBtnLink}
          onClick={() => setCartItem(cartItem)}
        >
          <FontAwesomeIcon icon={faEdit} />
        </Button>
        <Button
          className={classNameBtnLink}
          onClick={actionDeleteCartItem} //TODO modify delete action
        >
          <FontAwesomeIcon
            icon={loading ? faCircleNotch : faTrashAlt}
            spin={loading}
          />
        </Button>
      </td>
    </tr>
  );
}

export default CartItemRow;
