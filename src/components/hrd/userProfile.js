import { Helmet } from "react-helmet"
import { useSelector } from "react-redux"

export default function UserProfile() {
  document.title = "My Profile"
  window.scrollTo(0, 0)

  const user = useSelector(state => state.user.currentUser)

  return (
    <div className="container-fluid">
      <Helmet><title>My Profile</title></Helmet>
      {/* <h1 className="h3 mb-4 text-gray-800">Profile</h1> */}

      <div className="row mb-4">

        <div className="col-lg-6">

          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-primary">Profile - {user.employee_name}</h6>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-striped">
                  <tbody>
                    <tr>
                      <td>User Username: </td>
                      <td>{user.user_username}</td>
                    </tr>                    
                    <tr>
                      <td>User ID: </td>
                      <td>{user.user_id}</td>
                    </tr>
                    <tr>
                      <td>User Role: </td>
                      <td>{user.user_sysacl_role_id}</td>
                    </tr>
                    <tr>
                      <td>Employee ID: </td>
                      <td>{user.employee_id}</td>
                    </tr>
                    <tr>
                      <td>Employee Email: </td>
                      <td>{user.employee_email}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

            </div>
          </div>

        </div>
      </div>


    </div>
  )
}
