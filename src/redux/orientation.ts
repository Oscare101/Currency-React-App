import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const orientationSlice = createSlice({
  name: 'orientation',
  initialState: 'landscape', // portrait
  reducers: {
    updateOrientation: (state, action: PayloadAction<string>) => {
      return action.payload
    },
  },
})

export const { updateOrientation } = orientationSlice.actions
export default orientationSlice.reducer
