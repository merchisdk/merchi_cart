import * as React from 'react';
import { cartItemCurrencyAndCost } from '../utilities/currency';
import { productFeatureImageUrl } from '../utilities/product';
import { valueString } from '../utilities/variations';
import { actionDeleteCartItem, setCartItem } from '../store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Button } from '../buttons';
import { useCartContext } from '../CartProvider';

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

function CartItemRow({ cartItem, index, loading }: Props) {
  const {
    classNameBtnLink,
    classNameCartItemFeatureImage,
    classNameCartItemInfo,
    classNameCartItemInfoCell,
    classNameCartItemInfoCellRight,
    classNameCartItemInfoContainer,
  } = useCartContext();
  const {
    product,
    quantity,
    variations,
    variationsGroups,
  } = cartItem;
  const { name } = product;
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
          onClick={() => setCartItem(cartItem, index)}
        >
          <FontAwesomeIcon icon={faEdit} />
        </Button>
        <Button
          cclassName={classNameBtnLink}
          onClick={() => actionDeleteCartItem(index)}
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
