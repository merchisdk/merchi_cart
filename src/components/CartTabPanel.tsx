import { useSelector } from 'react-redux';
import { useCartContext } from '../CartProvider';

interface Props {
  children: any;
  tabId: number;
}

export default function CartTabPanel({ children, tabId }: Props) {
  const { activeTab, tabs } = useSelector((s: any) => s.stateCart);
  const { classNameCartTabPanel } = useCartContext();
  const currentTabIndex = tabs.findIndex((t: any) => t.tabId === activeTab);
  const activeTabValues = tabs[currentTabIndex];
  const display = tabId === -1 && activeTab === -1
    ? 'block'
    : tabId === -2 && activeTab === -2
    ? 'block'
    : activeTabValues && tabId === activeTabValues.tabId
    ? 'block'
    : 'none';
  return (
    <div className={classNameCartTabPanel} style={{ display }}>
      {children}
    </div>
  );
}
