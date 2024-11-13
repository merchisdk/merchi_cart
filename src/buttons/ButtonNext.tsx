import * as React from 'react';
import { tabIdCheckout } from '../utilities/tabs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faCircleNotch, faCreditCard } from '@fortawesome/free-solid-svg-icons';
import Button from './Button';
import { useCartContext } from '../CartProvider';

function ButtonNext() {
  const {
    activeTabIndex,
    classNameBtnNext,
    classNameBtnNextComplete,
    loading,
    setActiveTabIndex,
    tabs,
  } = useCartContext();
  const currentTabIndex = tabs.findIndex((t: any) => t.tabId === activeTabIndex);
  const nextTab = tabs[currentTabIndex + 1];
  const isCheckoutTabOpen = activeTabIndex === tabIdCheckout;
  const icon = loading ? faCircleNotch : isCheckoutTabOpen ? faCreditCard : faArrowRight;
  return (
    <Button
      className={isCheckoutTabOpen ? classNameBtnNextComplete : classNameBtnNext}
      onClick={nextTab ? () => setActiveTabIndex(nextTab.tabId) : undefined}
      disabled={loading}
    >
      <FontAwesomeIcon icon={icon} spin={loading} />
      <span style={{marginLeft: '5px'}}>
        {loading ? 'Loading...' : 'Next'}
      </span>
    </Button>
  );
}

export default ButtonNext;
