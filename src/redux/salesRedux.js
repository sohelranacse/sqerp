import { createSlice } from "@reduxjs/toolkit"

const salesSlice = createSlice({
  name: "searchEmployee",
  initialState: {
    DailySalesCollectionList: [],
    ItemTypeNameRedux: "",
    loading: false
  },
  reducers: {
    DSalesCollectionSearchStart: (state, action) => {
      state.loading = true
      state.ItemTypeNameRedux = action.payload.Type_name
    },
    DSalesCollectionSearchSuccess: (state, action) => {
      state.loading = false
      state.DailySalesCollectionList = action.payload
    },
    DSalesCollectionSearchFailure: (state) => {
      state.loading = false
    }
  }
})

export const { DSalesCollectionSearchStart, DSalesCollectionSearchSuccess, DSalesCollectionSearchFailure } = salesSlice.actions
export default salesSlice.reducer