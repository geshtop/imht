import { useNavigate, useParams } from "react-router-dom";
import "./single-company.css";
import {useGetAllCompaniesQuery , useUpdateCompanyMutation} from "../companiesApiSlice"
import { useEffect } from "react";
import useGetFilePath from "../../../hooks/useGetFilePath";
const SingleCompany = () => {
  const {companyId} = useParams()
  const  {data: companiesObject, isError, error, isLoading, isSuccess} = useGetAllCompaniesQuery()
  const [updateCompany, {isSuccess: isUpdateSuccess}] = useUpdateCompanyMutation()
  const navigate = useNavigate()
  const {getFilePath} = useGetFilePath()

  useEffect(()=>{
    if(isUpdateSuccess){
      navigate("/dash/companies")
    }
  }, [isUpdateSuccess])
  const formSubmit = (e) =>{
      e.preventDefault()
      const data = new FormData(e.target)
      //const companyObject =Object.fromEntries(data.entries())
      updateCompany(data)

  } 


  if(isLoading) return <h1> Loading ...</h1>
  if(isError) return <h1>{ JSON.stringify( error)}</h1>
  const company = companiesObject.data.find(comp => comp._id === companyId)
  if(!company) return <h1>{ "Not found"}</h1>

  return (
    <div className="single-company-container">
      <div className="single-company-info">
        <div className="single-company-img-container">
          <img src={getFilePath(company.image)} />
        </div>
        {company.name}
      </div>
      <div className="single-comapny-form-container">
        <form onSubmit={formSubmit} className="single-company-form">
          <input name="_id" defaultValue={company._id} type="hidden" />
          <label>שם החברה</label>
          <input
            defaultValue={company.name}
            type="text"
            name="name"
            placeholder="הכנס שם חברה"
          />
          <label>סוג החברה</label>
          <select required name="type" id="type">
            <option selected={company.type === "OM"} value="OM">
              עוסק מורשה{" "}
            </option>
            <option selected={company.type === "OP"} value="OP">
              עוסק פטור{" "}
            </option>
            <option selected={company.type === "AM"} value="AM">
              עמותה{" "}
            </option>
            <option selected={company.type === "CM"} value="CM">
              חברה{" "}
            </option>
            <option selected={company.type === "SYS"} value="SYS">
              מערכת{" "}
            </option>
          </select>
          <label>פעיל </label>
          <select name="active" id="active">
            <option selected={!company.active} value={false}>
              לא פעיל{" "}
            </option>
            <option selected={company.active} value={true}>
              פעיל{" "}
            </option>
          </select>
          <label>לוגו חברה</label>
          <input type="file"  name="image"/>
          <button>עדכן</button>
        </form>
      </div>
    </div>
  );
};

export default SingleCompany;
