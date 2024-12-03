import { useCartContext } from '../CartProvider';

interface Props {
  children: any;
  tabId: number;
}

export default function CartTabPanel({ children, tabId }: Props) {
  const { activeTabIndex, classNameCartTabPanel, tabs } = useCartContext();
  const currentTabIndex = tabs.findIndex((t: any) => t.tabId === activeTabIndex);
  const activeTabValues = tabs[currentTabIndex];
  const display = tabId === -1 && activeTabIndex === -1
    ? 'block'
    : tabId === -2 && activeTabIndex === -2
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
