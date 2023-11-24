import { configureStore } from '@reduxjs/toolkit'
import currencyReducer from './currency'
import themeReducer from './theme'
import orientationReducer from './orientation'

export const store = configureStore({
  reducer: {
    currency: currencyReducer,
    theme: themeReducer,
    orientation: orientationReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
