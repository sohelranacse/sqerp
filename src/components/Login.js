import { useState } from "react";
import axios from 'axios'
import { loginFailure, loginStart, loginSuccess } from "../redux/userRedux"
import { useDispatch, useSelector } from "react-redux";

export default function Login() {
  document.title = "Login | SQ Consumers - Enterprise Resource Planning"
  
  const { isFetching } = useSelector((state) => state.user)
  
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loginError, setLoginError] = useState("")
  const [errorMsg, setErrorMsg] = useState("")

  // load form data
  const loginFormData = new FormData();
  loginFormData.append("username", username)
  loginFormData.append("password", password)

  const dispatch = useDispatch()

  const handleLogin = async (e) => {
    e.preventDefault()

    dispatch(loginStart())
    try {
      const res = await axios({
        method: "post",
        url: "/login",
        data: loginFormData,
        headers: { "Content-Type": "multipart/form-data" },
      })
      if (res.data.success) {
        dispatch(loginSuccess(res.data.response))
      } else {
        setLoginError(true)
        setErrorMsg(res.data.response)
        dispatch(loginFailure())
      }
    } catch (err) {
      dispatch(loginFailure())
    }
  }
  
  return (
    <div className="container">

      {/* <!-- Outer Row --> */}
      <div className="row justify-content-center">

        <div className="col-xl-6 col-lg-6 col-md-6">

          <div className="card o-hidden border-0 shadow-lg my-5">
            <div className="card-body p-0">
              {/* <!-- Nested Row within Card Body --> */}
              <div className="row">
                <div className="col-lg-12">
                  <div className="p-5">
                    <div className="text-center">
                      <h1 className="h4 text-gray-900 mb-4">SQ Consumers - Enterprise Resource Planning</h1>
                    </div>

                    {loginError &&
                      <div className="alert alert-warning fade show" role="alert">
                      { errorMsg }
                      </div>
                    }

                    <form className="user" onSubmit={handleLogin}>
                      <div className="form-group">
                        <input type="text" className="form-control form-control-user"
                          aria-describedby="emailHelp"
                          placeholder="Enter Username..."
                          onChange={(e) => setUsername(e.target.value)}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <input type="password" className="form-control form-control-user"
                          placeholder="Password"
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </div>
                      {/* <div className="form-group">
                        <div className="custom-control custom-checkbox small">
                          <input type="checkbox" className="custom-control-input" id="customCheck" />
                          <label className="custom-control-label" htmlFor="customCheck">Remember
                          Me</label>
                        </div>
                      </div> */}
                      <button type="submit" className="btn btn-primary btn-user btn-block" disabled={isFetching}>
                        Login
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  )
}
