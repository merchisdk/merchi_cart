import * as React from 'react';
import { cartItemCurrencyAndCost } from '../utilities/currency';
import { productFeatureImageUrl } from '../utilities/product';
import { valueString } from '../utilities/variations';
import { actionDeleteCartItem, setCartItem } from '../store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'reactstrap';

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

function VariationList(props: VariationListProps) {
  const { variations } = props;
  return (
    <ul className='list-unstyled list-inline'>
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

function VariationsGroupsList(props: VariationsGroupsListProps) {
  const { groups } = props;
  return (
    <ul className='list-unstyled list-inline'>
      {groups.map((group: any, index: number) =>
        <GroupVariationItems
          key={`${index}-group-variations`}
          group={group}
          count={index + 1} />)}
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
    product,
    quantity,
    variations,
    variationsGroups: groups,
  } = cartItem;
  const { name } = product;
  return (
    <tr>
      <th scope='row' className='border-0'>
        <img
          src={productFeatureImageUrl(product)}
          alt={name}
          width='70'
          className='img-rounded m-10'
        />
        <div className='ml-3 d-inline-block align-middle'>
          <span className='text-muted font-weight-normal font-italic d-block'>
            <h5 style={{display: 'inline'}}>
              <a href='#'>
                {name}
              </a>
            </h5>
            {variations && <VariationList variations={variations} />}
          </span>
          <span className='text-muted font-weight-normal font-italic d-block'>
            {groups && <VariationsGroupsList groups={groups} />}
          </span>
        </div>
      </th>
      <td className='border-0 align-middle'>
        <strong>{quantity}</strong>
      </td>
      <td className='border-0 align-middle text-right'>
        <strong>{cartItemCurrencyAndCost(cartItem)}</strong>
      </td>
      <td className='border-0 align-middle text-right'>
        <Button
          color='link'
          onClick={() => setCartItem(cartItem, index)}
        >
          <FontAwesomeIcon icon={faEdit} />
        </Button>
        <Button
          color='link'
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
