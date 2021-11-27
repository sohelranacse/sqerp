import { useState } from "react";
import axios from 'axios'
import { loginFailure, loginStart, loginSuccess } from "../redux/userRedux"
import { useDispatch, useSelector } from "react-redux";

export default function Login() {
  document.title = "Login"
  
  const { isFetching, error } = useSelector((state) => state.user)
  // console.log(useSelector((state) => state.user))
  
  
  const [formValue, setformValue] = useState({
    username: '',
    password: ''
  });
  const handleChange = (event) => {
    setformValue({
      ...formValue,
      [event.target.name]: event.target.value
    });
  }

  const loginFormData = new FormData();
  loginFormData.append("username", formValue.username)
  loginFormData.append("password", formValue.password)

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
      // const res = await axios({
      //   method: "get",
      //   url: "/user-info",
      //   headers: {token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiMjE3NiIsInVzZXJfdXNlcm5hbWUiOiIwMTcwOTYzNDIxMyIsInVzZXJfc3lzYWNsX3JvbGVfaWQiOiI0NyIsImVtcGxveWVlX2lkIjoiMjAxODA0MDAwMiIsImVtcGxveWVlX25hbWUiOiJNZC4gU29oZWwgUmFuYSIsImVtcGxveWVlX2VtYWlsIjoiMCJ9.N8j1b18UEw3BAJUQWKFOQL7lmlXfOZqGhGgIH-AHPdQ"}
      // })
      console.log(res.data)
      // dispatch(loginSuccess(res.data))
    } catch (err) {
      dispatch(loginFailure())
    }
  }
  
  return (
    <div className="container">

      {/* <!-- Outer Row --> */}
      <div className="row justify-content-center">

        <div className="col-xl-10 col-lg-12 col-md-9">

          <div className="card o-hidden border-0 shadow-lg my-5">
            <div className="card-body p-0">
              {/* <!-- Nested Row within Card Body --> */}
              <div className="row">
                <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
                <div className="col-lg-6">
                  <div className="p-5">
                    <div className="text-center">
                      <h1 className="h4 text-gray-900 mb-4">SQ Consumers-Enterprise Resource Planning</h1>
                    </div>

                    {error &&
                      <div className="alert alert-warning fade show" role="alert">
                        Wrong credentials...
                      </div>
                    }

                    <form className="user" onSubmit={handleLogin}>
                      <div className="form-group">
                        <input type="text" className="form-control form-control-user"
                          aria-describedby="emailHelp"
                          placeholder="Enter Username..."
                          name="username"
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <input type="password" className="form-control form-control-user"
                          placeholder="Password"
                          name="password"
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <div className="custom-control custom-checkbox small">
                          <input type="checkbox" className="custom-control-input" id="customCheck" />
                          <label className="custom-control-label" htmlFor="customCheck">Remember
                          Me</label>
                        </div>
                      </div>
                      <button type="submit" className="btn btn-primary btn-user btn-block">
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
