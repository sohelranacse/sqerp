import React from 'react'
import { Link } from "react-router-dom"

export default function sidebar() {
  const sidebarCollapse = () => {
    const sidebar = document.getElementsByClassName("sidebar")[0]
    sidebar.classList.toggle("toggled")
  }

  return (
    <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

      {/* <!-- Sidebar - Brand --> */}
      <Link className="sidebar-brand d-flex align-items-center justify-content-center" to="/dashboard">
        <div className="sidebar-brand-text mx-3">
          <img src="./img/logo.png" alt="logo" style={{"height": "40px"}} />
        </div>
      </Link>

      {/* <!-- Divider --> */}
      <hr className="sidebar-divider my-0" />

      {/* <!-- Nav Item - Dashboard --> */}
      <li className="nav-item active">
        <Link className="nav-link" to="/dashboard">
          <i className="fas fa-fw fa-tachometer-alt"></i>
          <span>DASHBOARD</span>
        </Link>
      </li>

      <li className="nav-item">
        <a className="nav-link collapsed" href="/" data-toggle="collapse" data-target="#collapsePages" aria-expanded="true" aria-controls="collapsePages">
          <i className="fas fa-fw fa-folder"></i>
          <span>HRD</span>
        </a>
        <div id="collapsePages" className="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">
          <div className="bg-white py-2 collapse-inner rounded">
            <Link className="collapse-item" to="/profile">My Profile</Link>
            <div className="collapse-divider"></div>

            <h6 className="collapse-header">Employee Information</h6>
            <Link className="collapse-item" to="/employee-profile">Employee Profile</Link>
          </div>
        </div>
      </li>

      <li className="nav-item">
        <a className="nav-link collapsed" href="/" data-toggle="collapse" data-target="#slaesDistriution" aria-expanded="true" aria-controls="slaesDistriution">
          <i className="fas fa-fw fa-folder"></i>
          <span>SALES & DISTRIBUTION</span>
        </a>
        <div id="slaesDistriution" className="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">
          <div className="bg-white py-2 collapse-inner rounded">
            <Link className="collapse-item" to="/daily-sales-collections">Daily Sales & Collection</Link>
            <div className="collapse-divider"></div>
          </div>
        </div>
      </li>

      {/* <!-- Nav Item - Tables --> */}
      {/* <li className="nav-item">
        <Link className="nav-link" to="/category">
          <i className="fas fa-fw fa-folder"></i>
          <span>Category</span>
        </Link>
      </li> */}

      {/* <!-- Divider --> */}
      <hr className="sidebar-divider d-none d-md-block" />

      {/* <!-- Sidebar Toggler (Sidebar) --> */}
      <div className="text-center d-none d-md-inline">
        <button className="rounded-circle border-0" id="sidebarToggle" onClick={sidebarCollapse}></button>
      </div>

    </ul>
  )
}
