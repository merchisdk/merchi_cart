import * as React from 'react';
import { useSelector } from 'react-redux';
import { setActiveTab, toggleCartOpen } from '../store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'reactstrap';


interface Props {
  text?: string;
}

function ButtonBack({ text }: Props) {
  const { activeTab, tabs } = useSelector((s: any) => s.stateCart);
  const currentTabIndex = tabs.findIndex((t: any) => t.tabId === activeTab);
  let nextTab = null;
  if (currentTabIndex > 0) {
    nextTab = tabs[currentTabIndex - 1];
  }
  const nextTabId = nextTab ? nextTab.tabId : 0;
  return (
    <Button
      className='pull-left'
      color='default'
      onClick={
        activeTab === 0 ?
          toggleCartOpen
        :
          () => setActiveTab(nextTabId)}
      size='lg'
    >
      <FontAwesomeIcon icon={faArrowLeft} />
      {text ? ` ${text}` : ''}
    </Button>
  );
}

export default ButtonBack;
