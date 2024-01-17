import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sliceCart } from '../slices/sliceCart';
import { useCartContext } from '../CartProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Props {
  disabled?: boolean;
  icon: any;
  name: string;
  tabId: number;
}

function NavTab({ disabled, icon, name, tabId }: Props) {
  const dispatch = useDispatch();
  const {
    classNameCartTabItem,
    classNameCartTabItemLink,
  } = useCartContext();
  const { activeTab } = useSelector((s: any) => s.stateCart);
  function toggle() {
    dispatch(sliceCart.actions.setActiveTab(tabId));
  }
  const active = activeTab === tabId;
  return (
    <div className={classNameCartTabItem}>
      <button
        className={`${classNameCartTabItemLink} ${active ? 'active' : ''} disClass`}
        onClick={toggle}
        disabled={disabled}
      >
        <FontAwesomeIcon icon={icon} /> {name}
      </button>
    </div>
  );
}

export default NavTab;
