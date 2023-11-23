import { configureStore } from '@reduxjs/toolkit'
import currencyReducer from './currency'
import themeReducer from './theme'

export const store = configureStore({
  reducer: {
    currency: currencyReducer,
    theme: themeReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
