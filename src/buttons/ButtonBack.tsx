import * as React from 'react';
import { useCartContext } from '../CartProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Button from './Button';

interface Props {
  text?: string;
}

function ButtonBack({ text }: Props) {
  const {
    activeTabIndex,
    classNameBtnBack,
    onClickClose,
    setActiveTabIndex,
    tabs,
    toggleCartModal,
  } = useCartContext();
  const currentTabIndex = tabs.findIndex((t: any) => t.tabId === activeTabIndex);
  let nextTab = null;
  if (currentTabIndex > 0) {
    nextTab = tabs[currentTabIndex - 1];
  }
  const nextTabId = nextTab ? nextTab.tabId : 0;
  const close = onClickClose || toggleCartModal;
  return (
    <Button
      className={classNameBtnBack}
      onClick={activeTabIndex === 0 ?
        close
      :
        () => setActiveTabIndex(nextTabId)
      }
    >
      <FontAwesomeIcon icon={faArrowLeft} />
      {text ? ` ${text}` : ''}
    </Button>
  );
}

export default ButtonBack;
