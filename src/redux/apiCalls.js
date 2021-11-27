import { publicRequest } from "../requestMethods"
import { loginFailure, loginStart, loginSuccess, logOut } from "./userRedux"

export const login = async (dispatch, user) => {
  dispatch(loginStart())
  try {
    const res = await publicRequest.post("/login", user)
    if (res.data === "error") {
      dispatch(loginFailure())
    } else {
      dispatch(loginSuccess(res.data))
    }
  } catch (err) {
    dispatch(loginFailure())
  }
}
export const logout = async (dispatch) => {
  dispatch(logOut())
} 