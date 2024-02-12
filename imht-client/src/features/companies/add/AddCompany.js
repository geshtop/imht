import "./add-company.css"
import {useAddCompanyMutation} from "../companiesApiSlice"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
const AddCompany = () => {
  const [addCompany, {data, isError, error, isSuccess, isLoading}] = useAddCompanyMutation()
  const navigate = useNavigate()
  useEffect(()=>{
    if(isSuccess){
      navigate("/dash/companies")
    }

  }, [isSuccess])
  const formSubmit = (e) =>{
    e.preventDefault()
      const data = new FormData(e.target)
     //const companyObject =Object.fromEntries(data.entries())
      //console.log(companyObject)
      addCompany(data)




  }
  return (
    <div className="add-company-container">
        <form onSubmit={formSubmit} className="add-comapny-form">
            <input type="text" required name="name" placeholder="שם החברה" />
            <select required name="type" id="type" >
                <option value="">בחר סוג</option>
                <option value="OM">עוסק מורשה </option>
                <option value="OP">עוסק פטור </option>
                <option value="AM">עמותה </option>
                <option value="CM">חברה </option>
                <option value="SYS">מערכת </option>
            </select>
            <select  name="active" id="active" >
                <option value={true}> פעיל?</option>
                <option value={false}>לא פעיל  </option>
                <option value={true}>פעיל  </option>
               
            </select>
            <input type="file"  name="image"/>
            <button  type="submit">שלח</button>
        </form>

    </div>
  )
}

export default AddCompany