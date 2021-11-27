import { Navigate, Route, Routes } from "react-router-dom"
import "./App.css"

import Sidebar from "./components/Sidebar"
import TopNav from "./components/TopNav"
import Footer from "./components/Footer"

import Login from "./components/Login"
import Register from "./components/Register"
import Dashboard from "./components/Dashboard"

// hrd
import UserProfile from "./components/hrd/userProfile"
import EmployeeProfile from "./components/hrd/employeeProfile"

// sales & distribution
import DailySalesCollectionReport from "./components/salesDsitribution/DailySalesCollectionReport"

import NotFound from "./components/NotFound"
import { useSelector } from "react-redux"

function App() {
  const user = useSelector(state => state.user.currentUser)
  
  return (
    <>
      {
        user ?
          <>
            <Sidebar />
          
            <div id="content-wrapper" className="d-flex flex-column">
              <div id="content">

                <TopNav />

                <Routes>
                  <Route path="/*" element={<Navigate to="/dashboard" />} />
                  <Route path="/dashboard" element={<Dashboard />} />

                  {/* hrd */}
                  <Route path="/profile" element={<UserProfile />} />
                  <Route path="/employee-profile" element={<EmployeeProfile />} />

                  {/* sales & distribution */}
                  <Route path="/daily-sales-collections" element={<DailySalesCollectionReport />} />

                  {/* 404 */}
                  <Route path="*" element={<Navigate to="/notfound" />} />
                  <Route path="/notfound" element={<NotFound />} />
                </Routes>

              </div>
              <Footer />
            </div>
          </>
        :
        <Routes>
          <Route path="/*" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      }
    </>
  );
}

export default App;
