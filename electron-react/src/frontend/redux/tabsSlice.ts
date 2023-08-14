import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'
import type { DirFile } from '@shared/types';
import { TabProperties } from "@sinm/react-chrome-tabs/dist/chrome-tabs";

type TabsState = {
  selectedFile: string,
  selectedLineNumber: number | null,
  openTabs: TabProperties[]
}

const initialState: TabsState = {
  selectedFile: '',
  selectedLineNumber: null,
  openTabs: []
}

const tabsSlice = createSlice({
  name: 'tabs',
  initialState,
  reducers: {
    setSelectedFile(state, action: PayloadAction<string>) {
      const fileId = action.payload;
      state.selectedFile = action.payload;

      const fileHasOpenTab = state.openTabs.some(tab => tab.id === fileId);
      if (fileHasOpenTab) {
        // set open tab to active, set all others to inactive
        state.openTabs = state.openTabs.map(tab => ({ ...tab, active: fileId === tab.id }))
      } else {
        // create new tab for selected file
        state.openTabs = [...state.openTabs, {
          id: fileId,
          title: fileId,
          favicon: false,
          active: true
        }
        ]
      }
    },
    setSelectedLineNumber(state, action: PayloadAction<number|null>) {
      state.selectedLineNumber = action.payload;
    },
    closeTab(state, action: PayloadAction<string>) {
      const tabId = action.payload;
      state.openTabs = state.openTabs.filter((tab) => tab.id !== tabId);
      if (state.selectedFile == tabId) {
        state.selectedFile = null;
      }
    },
    reorderTabs(state, action: PayloadAction<{tabId: string, fromIndex: number, toIndex: number}>) {
      const { tabId, toIndex } = action.payload;
      const beforeTab = state.openTabs.find(tab => tab.id === tabId);
      if (!beforeTab) {
        return;
      }
      const reorderedTabs = state.openTabs.filter(tab => tab.id !== tabId);
      reorderedTabs.splice(toIndex, 0, beforeTab);
      state.openTabs = reorderedTabs;
    }
  }
})

export const tabsActions = tabsSlice.actions;

const selectSelectedFile = (state: RootState): DirFile | null => {
  const selectedPath = state.tabs.selectedFile;
  if (!!selectedPath && state.dirData.entities[selectedPath].type === 'file') {
    return state.dirData.entities[selectedPath] as DirFile;
  }
  return null;
}

const selectSelectedLineNumber = (state: RootState): number | null => {
  return state.tabs.selectedLineNumber;
}

const selectOpenTabs = (state: RootState): TabProperties[] => {
  return state.tabs.openTabs.map(tab => {
    const fileData = state.dirData.entities[tab.id];
    return { ...tab, title: fileData.name };
  });
}

export const tabsSelectors = {
  selectSelectedFile,
  selectSelectedLineNumber,
  selectOpenTabs
}

export default tabsSlice.reducer
