import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: any = {
  USD: 0,
  EUR: 0,
}

const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    updateCurrency: (state, action: PayloadAction<any>) => {
      state.USD = action.payload.USD
      state.EUR = action.payload.EUR
    },
  },
})

export const { updateCurrency } = currencySlice.actions
export default currencySlice.reducer
