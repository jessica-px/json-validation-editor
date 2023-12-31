import { configureStore, combineReducers, PreloadedState } from '@reduxjs/toolkit'
import dirDataSlice from './dirDataSlice';
import tabsSlice from './tabsSlice';

const rootReducer = combineReducers({
  dirData: dirDataSlice,
  tabs: tabsSlice
})

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
