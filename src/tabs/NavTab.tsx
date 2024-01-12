import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sliceCart } from '../slices/sliceCart';
import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  NavItem,
  NavLink,
} from 'reactstrap';

interface Props {
  disabled?: boolean;
  icon: any;
  name: string;
  tabId: number;
}

function NavTab({ disabled, icon, name, tabId }: Props) {
  const dispatch = useDispatch();
  const { activeTab } = useSelector((s: any) => s.stateCart);
  function toggle() {
    dispatch(sliceCart.actions.setActiveTab(tabId));
  }
  const active = activeTab === tabId;
  return (
    <NavItem className='merchi-nav-item'>
      <NavLink
        className={`merchi-nav-link ${classnames({ active })} disClass`}
        style={{cursor: 'pointer'}}
        onClick={toggle}
        disabled={disabled}
      >
        <FontAwesomeIcon icon={icon} /> {name}
      </NavLink>
    </NavItem>
  );
}

export default NavTab;
