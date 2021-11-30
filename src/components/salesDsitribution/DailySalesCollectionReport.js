import { Helmet } from "react-helmet"
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Loader from '../Loader'
import Skeleton from "../skeleton/Skeleton"
import Select from 'react-select'
import ReactHTMLTableToExcel from "react-html-table-to-excel"

import { DSalesCollectionSearchStart, DSalesCollectionSearchSuccess, DSalesCollectionSearchFailure } from '../../redux/salesRedux'
const BASE_URL = process.env.REACT_APP_API

export default function DailySalesCollectionReport() {
  const [isLoading, setIsLoading] = useState(true)
  window.scrollTo(0, 0)

  const dispatch = useDispatch()
  const user = useSelector(state => state.user.currentUser)
  const { DailySalesCollectionList, ItemTypeNameRedux, loading } = useSelector((state) => state.sales)
  // console.log(ItemTypeNameRedux)

  const [error, setError] = useState("")
  const [errorMsg, setErrorMsg] = useState("")

  const [Type_id, setType_id] = useState('ALL')
  const [Type_name, setType_name] = useState('ALL')
  const [ItemTypeList, setItemTypeList] = useState([])

  // date
  var dt = new Date()
  const [fromDate, setFromDate] = useState(dt.getFullYear() + "-" + (dt.getMonth() + 1) + "-" + dt.getDate())
  const [toDate, setToDate] = useState(dt.getFullYear() + "-" + (dt.getMonth() + 1) + "-" + dt.getDate())

  const handleItemType = (e) => {
    setType_id(e.value)
    setType_name(e.label)
  }

  // get all business unit
  useEffect(() => {
    const getItemtype = async () => {
      const res = await axios({
        method: "get",
        url: `${BASE_URL}/sales/get_item_type`,
        headers: { token: `Bearer ${user.token}` }
      })
      if (res.data.success) {
        setItemTypeList(res.data.response)
      }
    }
    getItemtype()  
  }, [user.token])

  
  // get today report
  useEffect(() => {
    dispatch(DSalesCollectionSearchStart({ Type_name }))
    try {
      const getItemtype = async () => {
        const res = await axios({
          method: "get",
          url: `${BASE_URL}/sales/daily_sales_and_collection_report/${Type_id}/${fromDate}/${toDate}`,
          headers: { token: `Bearer ${user.token}` }
        })
        if (res.data.success) {
          setError(false)
          dispatch(DSalesCollectionSearchSuccess(res.data.response))
        } else {
          setError(true)
          setErrorMsg(res.data.response)
          dispatch(DSalesCollectionSearchFailure())
        }

        // stop loading
        setIsLoading(false)
      }
      getItemtype()

      
    } catch (err) { dispatch(DSalesCollectionSearchFailure()) }
  }, [user.token]) // eslint-disable-line

  // search
  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(DSalesCollectionSearchStart({ Type_name }))

    try {
      const getItemtype = async () => {
        const res = await axios({
          method: "get",
          url: `${BASE_URL}/sales/daily_sales_and_collection_report/${Type_id}/${fromDate}/${toDate}`,
          headers: { token: `Bearer ${user.token}` }
        })
        console.log(res.data)
        if (res.data.success) {
          setError(false)
          dispatch(DSalesCollectionSearchSuccess(res.data.response))
        } else {
          setError(true)
          setErrorMsg(res.data.response)
          dispatch(DSalesCollectionSearchFailure())
        }
      }
      getItemtype()
    } catch (err) { dispatch(DSalesCollectionSearchFailure()) }
  }
  
  return (
    <div className="container-fluid">
      <Helmet><title>Daily Sales & Collection Report</title></Helmet>
      {isLoading ? <Skeleton />
      : (
        <div className="row mb-4">

          <div className="col-lg-12">

            <div className="card shadow mb-4">
              <div className="card-header py-3">
                <h6 className="m-0 font-weight-bold text-primary">Daily Sales & Collection Report</h6>
              </div>
              <div className="card-body">
                  
              <form onSubmit={handleSubmit}>

                <div className="row col-md-12">
                      
                  <div className="form-group col-md-4">
                    <label className="control-label">Item Type <span className="required">*</span></label>
                    <Select
                      classNamePrefix="combo"
                      defaultValue={{ label: "ALL", value: "ALL" }}
                      onChange={handleItemType}
                      options={ItemTypeList.map((iType) => ({ value: iType.Type_id, label: iType.Item_Type }))}
                    />    
                  </div>
                  <div className="form-group col-md-2">
                    <label className="control-label">From Date <span className="required">*</span></label>
                    <input type="date" className="form-control" value={fromDate} onChange={(e) => setFromDate(e.target.value)} required />    
                  </div>
                  <div className="form-group col-md-2">
                    <label className="control-label">To Date <span className="required">*</span></label>
                    <input type="date" className="form-control" value={toDate} onChange={(e) => setToDate(e.target.value)} required />    
                  </div>

                  <div className="form-group col-md-1">
                    <button type="submit" className="btn btn-primary mt-30">Search</button>
                  </div>

                  
                  <div className="form-group col-md-1 mt-30">
                    {loading && <Loader />}
                  </div>

                </div>


              </form>
                  
              {error && <div className="alert alert-warning fade show" role="alert">{ errorMsg }</div> }
              
              <div className="table-responsive">
                <table className="table table-striped" id="datatable">
                  <thead>
                    <tr>
                      <th colSpan="6">Daily Sales Collection Report Item Type: {ItemTypeNameRedux}, From {fromDate} To {toDate}</th>
                    </tr>
                  </thead>
                  <thead>
                    <tr>
                      <th>SL</th>
                      <th>Sales Center</th>
                      <th className="text-right">Sales</th>
                      <th className="text-right">Return</th>
                      <th className="text-right">Gross Sales</th>
                      <th className="text-right">Collection</th>
                    </tr>
                  </thead>
                    <tbody>
                      {DailySalesCollectionList.map((DSCRow, i) => (
                        <tr key={i}>
                          <td>{i + 1}</td>
                          <td>{ DSCRow.Center_Name }</td>
                          <td className="text-right">{ DSCRow.Total_Sale }</td>
                          <td className="text-right">{ DSCRow.return_price }</td>
                          <td className="text-right">{ DSCRow.Gross_Sale }</td>
                          <td className="text-right">{ DSCRow.Total_Collection }</td>
                        </tr>
                      ))}
                      </tbody>
                      <tfoot>
                        <tr>
                          <td colSpan="2">Total</td>
                          <td></td>
                        </tr>
                      </tfoot>
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
