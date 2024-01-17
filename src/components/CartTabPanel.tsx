import * as React from 'react';
import { useSelector } from 'react-redux';
import { useCartContext } from '../CartProvider';

interface Props {
  children: any;
  tabId: number;
}

export default function CartTabPanel({ children, tabId }: Props) {
  const { stateCart: { activeTab, tabs }} = useSelector((s: any) => s);
  const { classNameCartTabPanel } = useCartContext();
  const activeTabValues = tabs[activeTab];
  const display = tabId === activeTabValues.tabId ? 'block' : 'none';
  return (
    <div className={classNameCartTabPanel} style={{ display }}>
      {children}
    </div>
  );
}
