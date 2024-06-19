import { configureStore } from '@reduxjs/toolkit'
import employeeReducer from '../Pages/employeeSlice'

export const store = configureStore({
  reducer: {
    employee : employeeReducer,
  },
})