import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Currency } from '../constants/interfaces'

const initialState: Currency[] = []

const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    updateCurrency: (state, action: PayloadAction<Currency[]>) => {
      state.splice(0, state.length, ...action.payload)
    },
  },
})

export const { updateCurrency } = currencySlice.actions
export default currencySlice.reducer
