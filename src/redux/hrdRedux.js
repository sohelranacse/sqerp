import { createSlice } from "@reduxjs/toolkit"

const hrdSlice = createSlice({
  name: "searchEmployee",
  initialState: {
    employeeSearchList: [],
    com_name_search: "",
    loading: false
  },
  reducers: {
    EmployeeSearchStart: (state, action) => {
      state.loading = true
      state.com_name_search = action.payload.com_name
    },
    EmployeeSearchSuccess: (state, action) => {
      state.loading = false
      state.employeeSearchList = action.payload
    },
    EmployeeSearchFailure: (state) => {
      state.loading = false
    }
  }
})

export const { EmployeeSearchStart, EmployeeSearchSuccess, EmployeeSearchFailure } = hrdSlice.actions
export default hrdSlice.reducer