import { useCartContext } from '../CartProvider';

interface Props {
  children: any;
  tabId: number;
}

export default function CartTabPanel({ children, tabId }: Props) {
  const { activeTabIndex, classNameCartTabPanel, tabs } = useCartContext();
  const currentTabIndex = tabs.findIndex((t: any) => t.tabId === activeTabIndex);
  const activeTabValues = tabs[currentTabIndex];
  const isActive =
    (tabId === -1 && activeTabIndex === -1) ||
    (tabId === -2 && activeTabIndex === -2) ||
    !!(activeTabValues && tabId === activeTabValues.tabId);

  // Unmount inactive tabs so heavy children (payments, product form) stay out of the tree.
  if (!isActive) return null;

  return (
    <div className={classNameCartTabPanel} style={{ display: 'block' }}>
      {children}
    </div>
  );
}
