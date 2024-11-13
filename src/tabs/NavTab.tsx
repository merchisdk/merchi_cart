import * as React from 'react';
import { useCartContext } from '../CartProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Props {
  disabled?: boolean;
  icon: any;
  name: string;
  tabId: number;
}

function NavTab({ disabled, icon, name, tabId }: Props) {
  const {
    activeTabIndex,
    classNameCartTabItem,
    classNameCartTabItemLink,
    setActiveTabIndex,
  } = useCartContext();
  function toggle() {
    setActiveTabIndex(tabId);
  }
  const active = activeTabIndex === tabId;
  return (
    <div className={classNameCartTabItem}>
      <button
        className={`${classNameCartTabItemLink} ${active ? 'active' : ''}`}
        onClick={toggle}
        disabled={disabled}
      >
        <FontAwesomeIcon icon={icon} /> {name}
      </button>
    </div>
  );
}

export default NavTab;
