import * as React from 'react';
import { useSelector } from 'react-redux';
import { useCartContext } from '../CartProvider';
import { setActiveTab } from '../store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Button from './Button';
import { toggleCartOpen } from '../store';

interface Props {
  text?: string;
}

function ButtonBack({ text }: Props) {
  const { classNameBtnBack, onClickClose } = useCartContext();
  const { activeTab, tabs } = useSelector((s: any) => s.stateCart);
  const currentTabIndex = tabs.findIndex((t: any) => t.tabId === activeTab);
  let nextTab = null;
  if (currentTabIndex > 0) {
    nextTab = tabs[currentTabIndex - 1];
  }
  const nextTabId = nextTab ? nextTab.tabId : 0;
  const close = onClickClose || toggleCartOpen;
  return (
    <Button
      className={classNameBtnBack}
      onClick={activeTab === 0 ?
        close
      :
        () => setActiveTab(nextTabId)
      }
    >
      <FontAwesomeIcon icon={faArrowLeft} />
      {text ? ` ${text}` : ''}
    </Button>
  );
}

export default ButtonBack;
