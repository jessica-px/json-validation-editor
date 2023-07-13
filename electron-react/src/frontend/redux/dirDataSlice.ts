import { createSlice, PayloadAction, createEntityAdapter, createSelector } from '@reduxjs/toolkit'
import type { RootState } from './store'
import type { DirFile, DirectoryItem } from '@shared/types';
import { getJsonErrors } from '@shared/validateJson/validateJson';

export const dirItemsAdaptor = createEntityAdapter<DirectoryItem>({
  selectId: (item) => item.path,
  sortComparer: (a, b) => b.name.localeCompare(a.name)
})

type OtherStateValues = {
  selectedFile: string,
  selectedLineNumber: number | null
}

const initialState = dirItemsAdaptor.getInitialState<OtherStateValues>({
  selectedFile: '',
  selectedLineNumber: null
})

const dirDataSlice = createSlice({
  name: 'dirData',
  initialState,
  reducers: {
    setSelectedFile(state, action: PayloadAction<string>) {
      state.selectedFile = action.payload;
    },
    setSelectedLineNumber(state, action: PayloadAction<number>) {
      state.selectedLineNumber = action.payload;
    },
    addOne(state, action: PayloadAction<DirectoryItem>) {
      const dirItem = action.payload;
      if (dirItem.type === 'file') {
        dirItem.jsonErrors = getJsonErrors(dirItem.content);
      }

      dirItemsAdaptor.addOne(state, dirItem);
    },
    updateFile(state, action: PayloadAction<{path: string, newContent: string}>) {
      const { path, newContent } = action.payload
      const existingDirItem = state.entities[path]
      if (existingDirItem && existingDirItem.type === 'file') {
        const newJsonErrors = getJsonErrors(newContent);

        existingDirItem.content = newContent
        existingDirItem.jsonErrors = newJsonErrors
      }
    }
  }
})

export const actions = dirDataSlice.actions;

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

const selectSelectedFile = (state: RootState): DirFile | null => {
  const selectedPath = state.dirData.selectedFile;
  if (!!selectedPath && state.dirData.entities[selectedPath].type === 'file') {
    return state.dirData.entities[selectedPath] as DirFile;
  }
  return null;
}

const selectSelectedLineNumber = (state: RootState): number | null => {
  return state.dirData.selectedLineNumber;
}

export const selectors = {
  selectAll,
  selectById,
  selectIds,
  selectFileById,
  selectAllChildren,
  selectAllItemsAtPath,
  selectAllWithErrors,
  selectSelectedFile,
  selectSelectedLineNumber
}

export default dirDataSlice.reducer
