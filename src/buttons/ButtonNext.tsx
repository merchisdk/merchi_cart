import * as React from 'react';
import { useSelector } from 'react-redux';
import { tabIdCheckout } from '../slices/sliceCart';
import { setActiveTab } from '../store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faCircleNotch, faCreditCard } from '@fortawesome/free-solid-svg-icons';
import Button from './Button';
import { useCartContext } from '../CartProvider';

function ButtonNext() {
  const {
    classNameBtnNext,
    classNameBtnNextComplete,
  } = useCartContext();
  const {
    activeTab,
    loading,
    tabs,
  } = useSelector((s: any) => s.stateCart);
  const currentTabIndex = tabs.findIndex((t: any) => t.tabId === activeTab);
  const nextTab = tabs[currentTabIndex + 1];
  const isCheckoutTabOpen = activeTab === tabIdCheckout;
  const icon = loading ? faCircleNotch : isCheckoutTabOpen ? faCreditCard : faArrowRight;
  return (
    <Button
      className={isCheckoutTabOpen ? classNameBtnNextComplete : classNameBtnNext}
      onClick={nextTab ? () => setActiveTab(nextTab.tabId) : undefined}
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
