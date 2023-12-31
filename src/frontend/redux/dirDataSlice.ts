import { createSlice, PayloadAction, createEntityAdapter, createSelector } from '@reduxjs/toolkit'
import type { RootState } from './store'
import type { DirFile, DirectoryItem } from '@shared/types';
import { getJsonErrors } from '@shared/validateJson/validateJson';

export const dirItemsAdaptor = createEntityAdapter<DirectoryItem>({
  selectId: (item) => item.path,
  sortComparer: (a, b) => b.name.localeCompare(a.name)
})

type OtherStateValues = {
  directoryPath: string | null
}

const initialState = dirItemsAdaptor.getInitialState<OtherStateValues>({
  directoryPath: null
});

const dirDataSlice = createSlice({
  name: 'dirData',
  initialState,
  reducers: {
    setDirectoryPath(state, action: PayloadAction<string>) {
      const dirPath = action.payload;
      state.directoryPath = dirPath;
    },
    addOne(state, action: PayloadAction<DirectoryItem>) {
      const dirItem = action.payload;
      if (dirItem.type === 'file') {
        dirItem.jsonErrors = getJsonErrors(dirItem.content);
      }

      dirItemsAdaptor.addOne(state, dirItem);
    },
    updateFile(state, action: PayloadAction<{path: string, newContent: string, updateDiskContent: boolean}>) {
      const { path, newContent, updateDiskContent } = action.payload
      const existingDirItem = state.entities[path]
      if (existingDirItem && existingDirItem.type === 'file') {
        const newJsonErrors = getJsonErrors(newContent);

        existingDirItem.content = newContent
        existingDirItem.jsonErrors = newJsonErrors
        if (updateDiskContent) {
          existingDirItem.contentOnDisk = newContent;
        }
      }
    },
  }
})

export const dirDataActions = dirDataSlice.actions;

// Export the customized selectors for this adapter using `getSelectors`
const {
  selectAll,
  selectById,
  selectIds,
  // Pass in a selector that returns the posts slice of state
} = dirItemsAdaptor.getSelectors<RootState>(state => state.dirData)

const selectFileById = createSelector(
  [selectById],
  (targetItem) => {
    if (targetItem.type === 'file') {
      return targetItem as DirFile;
    }
  }
)

const selectAllChildren = createSelector(
  [selectById, selectAll],
  (targetItem, allDirItems) => {
    if (targetItem.type === 'dir') {
      return allDirItems.filter(item => targetItem.childPaths.includes(item.path))
    }
  }
)

const selectAllItemsAtPath = (rootPath: string) => createSelector(
  [selectAll],
  (allDirItems) => {
    return allDirItems.filter(item => item.path == rootPath + '/' + item.name);
  }
)

const selectAllWithErrors = createSelector(
  [selectAll],
  (allDirItems) => {
    return allDirItems.filter(item => item.type === 'file' && item.jsonErrors.length > 0) as DirFile[];
  }
)

const selectDirectoryPath = (state: RootState): string | null => {
  return state.dirData.directoryPath;
}

export const dirDataSelectors = {
  selectAll,
  selectById,
  selectIds,
  selectFileById,
  selectAllChildren,
  selectAllItemsAtPath,
  selectAllWithErrors,
  selectDirectoryPath
}

export default dirDataSlice.reducer
