import * as React from 'react';
import { useSelector } from 'react-redux';
import { tabIdCheckout } from '../slices/sliceCart';
import { setActiveTab } from '../store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faCircleNotch, faCreditCard } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'reactstrap';

interface Props {}

function ButtonNext(props: Props) {
  const {
    activeTab,
    loading,
    tabs,
  } = useSelector((s: any) => s.stateCart);
  const currentTabIndex = tabs.findIndex((t: any) => t.tabId === activeTab);
  const nextTab = tabs[currentTabIndex + 1];
  const isCheckoutTabOpen = activeTab === tabIdCheckout;
  const color = isCheckoutTabOpen ? 'success' : 'primary';
  const icon = loading ? faCircleNotch : isCheckoutTabOpen ? faCreditCard : faArrowRight;
  return (
    <Button
      color={color}
      onClick={nextTab ? () => setActiveTab(nextTab.tabId) : undefined}
      size='lg'
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
