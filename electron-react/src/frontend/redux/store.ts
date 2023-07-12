import { configureStore, combineReducers, PreloadedState } from '@reduxjs/toolkit'
import dirDataSlice from './dirDataSlice'

const rootReducer = combineReducers({
  dirData: dirDataSlice
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
