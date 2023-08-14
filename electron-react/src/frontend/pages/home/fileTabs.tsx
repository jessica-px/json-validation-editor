import { Tabs } from "@sinm/react-chrome-tabs";
import { useAppSelector, useAppDispatch } from '@redux/hooks';
import { tabsSelectors, tabsActions } from '@redux/tabsSlice';
import '@sinm/react-chrome-tabs/css/chrome-tabs.css';

export const FileTabTray = () => {
  const dispatch = useAppDispatch();
  const tabs = useAppSelector(tabsSelectors.selectOpenTabs)

  const onClose = (id: string) => {
    dispatch(tabsActions.closeTab(id))
  }

  const onReorder = (tabId: string, fromIndex: number, toIndex: number) => {
    dispatch(tabsActions.reorderTabs({ tabId, fromIndex, toIndex }))
  }

  const onSelect = (tabId: string) => {
    dispatch(tabsActions.setSelectedFile(tabId));
  }

  return (
    <Tabs
      onTabClose={onClose}
      onTabReorder={onReorder}
      onTabActive={onSelect}
      tabs={tabs}
    ></Tabs>
  );
}
