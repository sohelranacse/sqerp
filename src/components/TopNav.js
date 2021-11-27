import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/apiCalls";
import { Link } from "react-router-dom"

export default function TopNav() {
  const sidebarCollapse = () => {
    const sidebar = document.getElementsByClassName("sidebar")[0]
    sidebar.classList.toggle("toggled")
  }

  const { currentUser } = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const handleLogout = () => {
    logout(dispatch)
  }


  return (
    <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

      {/* <!-- Sidebar Toggle (Topbar) --> */}
      <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3" onClick={sidebarCollapse}>
        <i className="fa fa-bars"></i>
      </button>

      {/* <!-- Topbar Navbar --> */}
      <ul className="navbar-nav ml-auto">

        {/* <!-- Nav Item - User Information --> */}
        <li className="nav-item dropdown no-arrow">
          <a className="nav-link dropdown-toggle" href="/" id="userDropdown" role="button"
            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <span className="mr-2 d-none d-lg-inline text-gray-600 small">{currentUser.employee_name}</span>
            <img className="img-profile rounded-circle"
              src="img/undraw_profile.svg" alt="" />
          </a>

          {/* <!-- Dropdown - User Information --> */}
          <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
            aria-labelledby="userDropdown">
            <Link className="dropdown-item" to="/profile" alt="">
              <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
              Profile
            </Link>
            <div className="dropdown-divider"></div>
            <button type="button" className="dropdown-item" onClick={handleLogout}>
              <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
              Logout
            </button>
          </div>
        </li>

      </ul>

    </nav>
  )
}
