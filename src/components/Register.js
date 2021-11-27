import {useState} from 'react'
import { Link, useNavigate } from "react-router-dom"
import axios from 'axios'

export default function Register() {
  document.title = "Register"
  
  const [fname, setFname] = useState('')
  const [lname, setLname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rpassword, setRPassword] = useState('')
  const [error, setError] = useState(false)

  const [success, setSuccess] = useState(false)
  const [msg, setMsg] = useState('')
  let navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault()
    setError(false)
    setSuccess(false)
    
    if (fname === "" || lname === "" || email === "" || password ==="" || rpassword === "") {
      alert('Information incomplete!')
      return true
    }
    if (password !== rpassword) {
      alert('Password mismatch!')
      return true
    }

    try {
      const res = await axios.post("/register", {
        first_name: fname,
        last_name: lname,
        email_id: email,
        password: password
      })
      if (res.data.error) {
        setMsg(res.data.error.msg)
        setSuccess(true)
      } else {
        // console.log("success")
        navigate('/login')
      }
    } catch (err) {
      setError(true)
      setSuccess(false)
    }

  }

  return (
    <div className="container">

      <div className="card o-hidden border-0 shadow-lg my-5">
        <div className="card-body p-0">
          {/* <!-- Nested Row within Card Body --> */}
          <div className="row">
            <div className="col-lg-5 d-none d-lg-block bg-register-image"></div>
            <div className="col-lg-7">
              <div className="p-5">
                <div className="text-center">
                  <h1 className="h4 text-gray-900 mb-4">Create an Account!</h1>
                </div>

                {error &&
                  <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    <strong>Something went wrong!</strong>
                  </div>
                }
                {success &&
                  <div className="alert alert-warning fade show" role="alert">
                    {msg}
                  </div>
                }
                
                <form className="user" onSubmit={handleRegister}>
                  <div className="form-group row">
                    <div className="col-sm-6 mb-3 mb-sm-0">
                      <input type="text" className="form-control form-control-user"
                        placeholder="First Name"
                        onChange={(e) => setFname(e.target.value)}
                        required
                      />
                    </div>
                    <div className="col-sm-6">
                      <input type="text" className="form-control form-control-user"
                        placeholder="Last Name"
                        onChange={(e) => setLname(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <input type="email" className="form-control form-control-user"
                      placeholder="Email Address"
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group row">
                    <div className="col-sm-6 mb-3 mb-sm-0">
                      <input type="password" className="form-control form-control-user"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    <div className="col-sm-6">
                      <input type="password" className="form-control form-control-user"
                        placeholder="Repeat Password"
                        onChange={(e) => setRPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <button type="sumit" className="btn btn-primary btn-user btn-block">
                    Register Account
                  </button>
                </form>

                <hr />
                <div className="text-center">
                  <Link className="small" to="/login">Already have an account? Login!</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
