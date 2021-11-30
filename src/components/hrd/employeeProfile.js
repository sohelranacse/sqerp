import { Helmet } from "react-helmet"
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Loader from '../Loader'
import Skeleton from "../skeleton/Skeleton"
import Select from 'react-select'
import ReactHTMLTableToExcel from 'react-html-table-to-excel'

import { EmployeeSearchStart, EmployeeSearchSuccess, EmployeeSearchFailure } from '../../redux/hrdRedux'
const BASE_URL = process.env.REACT_APP_API


export default function UserProfile() {
  const [isLoading, setIsLoading] = useState(true)
  window.scrollTo(0, 0)
  
  const dispatch = useDispatch()

  const user = useSelector(state => state.user.currentUser)
  const { employeeSearchList, com_name_search, loading } = useSelector((state) => state.hrd)
  // console.log(com_name_search)
  const [error, setError] = useState("")
  const [errorMsg, setErrorMsg] = useState("")
  const [businessUnit, setbusinessUnit] = useState([])

  const [com_id, setComId] = useState('ALL')
  const [com_name, setComName] = useState('ALL')

  const formData = new FormData();
  formData.append("com_id", com_id)

  const handleBusinessUnit = (e) => {
    // setComId(e.target.value)
    // setComName(e.target.options[e.target.selectedIndex].text)
    setComId(e.value)
    setComName(e.label)
  }


  const handleSubmit = async (e) => {
    e.preventDefault()
    dispatch(EmployeeSearchStart({ com_name }))

    try {
      const res = await axios({
        method: "post",
        url: `${BASE_URL}/search-employee`,
        data: formData,
        headers: { "Content-Type": "multipart/form-data", token: `Bearer ${user.token}` }
      })

      if (res.data.success) {
        setError(false)
        dispatch(EmployeeSearchSuccess(res.data.response))
        // console.log(res.data)
      } else {
        setError(true)
        setErrorMsg(res.data.response)
        dispatch(EmployeeSearchFailure())
      }
    } catch (err) {
      dispatch(EmployeeSearchFailure())
    }
  }

  // get all business unit
  useEffect(() => {
    setIsLoading(true)

    const getBusinessUnit = async () => {
      const res = await axios({
        method: "get",
        url: `${BASE_URL}/business-unit`,
        headers: { token: `Bearer ${user.token}` }
      })
      if (res.data.success) {
        setbusinessUnit(res.data.response)
      }
    }
    getBusinessUnit()    
  }, [user.token])

  setTimeout(() => setIsLoading(false), 100)
  return (
    <div className="container-fluid">
      <Helmet><title>Employee Profile</title></Helmet>
      {isLoading ? <Skeleton />
      : (
        <div className="row mb-4">
          <div className="col-lg-12">

            <div className="card shadow mb-4">
              <div className="card-header py-3">
                <h6 className="m-0 font-weight-bold text-primary">Employee Profile</h6>
              </div>
              <div className="card-body">

                <form onSubmit={handleSubmit}>

                  <div className="row col-md-12">
                    
                    <div className="form-group col-md-4">
                      <label className="control-label">Business Unit</label>
                      <Select
                        classNamePrefix="combo"
                        defaultValue={{ label: "ALL", value: "ALL" }}
                        onChange={handleBusinessUnit}
                        options={businessUnit.map((bUnit) => ({ value: bUnit.com_id, label: bUnit.company_name }))}
                      />
                    </div>

                    <div className="form-group col-md-1">
                      <button type="submit" className="btn btn-primary mt-30">Search</button>
                    </div>

                    
                    <div className="form-group col-md-1 mt-30">
                      {loading && <Loader />}
                    </div>

                  </div>
                  
                  
                </form>

                {error &&
                  <div className="alert alert-warning fade show" role="alert">
                  { errorMsg }
                  </div>
                }

                <div className="table-responsive">
                  <table className="table table-striped" id="datatable">
                    <thead>
                      <tr>
                        <th colSpan="26">{ com_name_search ? `Employee information Report Business Unit: ${com_name_search}` : "Employee information Report" }</th>
                      </tr>
                    </thead>
                    <thead>
                      <tr>
                        <th>SL</th>
                        <th>Employee ID</th>
                        <th>Employee Name</th>
                        <th>Present Address</th>
                        <th>Permanent Address</th>
                        <th>Supervisor</th>
                        <th>Official Email</th>
                        <th>ID Card Number</th>
                        <th>National ID Number</th>
                        <th>Bank Account Number</th>
                        <th>DOB</th>
                        <th>Blood Group</th>
                        <th>HR Designation</th>
                        <th>Card Designation</th>
                        <th>Posting Location</th>
                        <th>Business Unit</th>
                        <th>Department</th>
                        <th>Business Function</th>
                        <th>Education</th>
                        <th>Join Date</th>
                        <th>Phone</th>
                        <th>Personal Contact</th>
                        <th>TIN Number</th>
                        <th>Current Salary</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        employeeSearchList.map((row, i) => (
                          <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{row.employee_id}</td>
                            <td>{row.employee_name}</td>
                            <td>{row.employee_address}</td>
                            <td style={{"whiteSpace": "nowrap"}}>{row.village}, {row.union_name}, {row.thana_name}<br />{row.district_name}, {row.division_name}</td>
                            <td>{row.supervisor}</td>
                            <td>{row.official_email}</td>
                            <td>{row.id_card_no}</td>
                            <td>{row.national_id_number}</td>
                            <td>{row.bank_account_number}</td>
                            <td>{row.employee_dob}</td>
                            <td>{row.blood_group}</td>
                            <td>{row.designation_name}</td>
                            <td>{row.hr_designation_name}</td>
                            <td>{row.posting_location}</td>
                            <td>{row.company_name}</td>
                            <td>{row.Department_name}</td>
                            <td>{row.business_function_name}</td>
                            <td>{row.highest_education_name}</td>
                            <td>{row.join_date}</td>
                            <td>{row.employee_phone}</td>
                            <td>{row.personal_contact_number}</td>
                            <td>{row.tin_no}</td>
                            <td>{row.em_salary}</td>
                          </tr>
                        ))
                      }                    
                    </tbody>
                  </table>
                </div>
                  
                <ReactHTMLTableToExcel
                  className="btn btn-primary mt-30" table="datatable"
                  filename={new Date().toLocaleString()}
                  sheet="tablexls" buttonText="Export to Excel"
                />

              </div>
            </div>

          </div>
        </div>
      )}


    </div>
  )
}
