import { Helmet } from "react-helmet"
import { useSelector } from "react-redux";

export default function Dashboard() {
  window.scrollTo(0, 0)

  const { currentUser } = useSelector((state) => state.user)
  console.log(currentUser)

  return (
    <div className="container-fluid">
      <Helmet><title>Dashboard</title></Helmet>

      {/* <!-- Page Heading --> */}
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
      </div>

      {/* <!-- Content Row --> */}
      <div className="row">

        <div className="col-lg-4">
          <div className="card mb-4">
              <div className="card-header">HRD REPORT</div>
              <div className="card-body">
                  Human Resource Report Section
              </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="card mb-4">
              <div className="card-header">PRODUCTION REPORT</div>
              <div className="card-body">
                  Production Report Section
              </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="card mb-4">
              <div className="card-header">SALES & DISTRIBUTION REPORT</div>
              <div className="card-body">
                  Sales & Distibution Report Section
              </div>
          </div>
        </div>
        
      </div>

    </div>
  )
}
