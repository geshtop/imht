import Search from "../../../components/search/Search"
import {useGetAllCompaniesQuery, useDeleteCompanyMutation} from "../companiesApiSlice"
import {Link, useSearchParams} from "react-router-dom"
import "./companies-list.css"
import useGetFilePath from "../../../hooks/useGetFilePath"
const CompaniesList = () => {
   const  {data: companiesObject, isError, error, isLoading, isSuccess} = useGetAllCompaniesQuery()
   const [deleteCompany,{isSuccess: isDeleteSuccess}] = useDeleteCompanyMutation()
    const deleteClick = (company) =>{
        if(window.confirm ("בטוח שברצונך למחוק את החברה?")){
            deleteCompany({_id: company._id})
        }
       
    }
    const [searchParams] = useSearchParams()
    const q = searchParams.get("q")
    const {getFilePath} = useGetFilePath()

   if(isLoading) return <h1> Loading ...</h1>
   if(isError) return <h1>{ JSON.stringify( error)}</h1>
    const filteredData = !q? [...companiesObject.data] : companiesObject.data.filter(company=>company.name.indexOf(q) > -1)
  return (
    <div className="companies-list">
        <div className="companies-list-top">
            <Search placeholder="חיפוש לפי שם חברה" />
            <Link to="/dash/companies/add"  className="companies-list-add-button">
                הוספת חברה
            </Link>
        </div>
        <table className="companies-list-table">
            <thead>
                <tr>
                    <td>שם החברה</td>
                    <td>נוצר ב </td>
                    <td> סוג</td>
                    <td>פעיל </td>
                    <td>פעולות </td>
                </tr>
            </thead>
            <tbody>
                {filteredData?.map(company=>(
                    <tr key={company._id}>
                        <td>
                            <div className="companies-list-company">
                                <img 
                                src={ getFilePath(company.image)}
                                alt=""
                                width={40}
                                height={40}
                                className="companies-list-company-image" />
                                {company.name}
                            </div>
                        </td>
                        <td>
                            {company.createdAt?.toString().slice(4,16)}
                        </td>
                        <td>
                            {company.type}
                        </td>
                        <td>
                            {company.active? "פעיל " : "לא פעיל"}
                        </td>
                        <td>
                            <div className="companies-list-buttons">

                           
                            <Link to={`/dash/companies/${company._id}`} className="companies-list-button companies-list-view">
                                צפייה
                            </Link>
                            <button onClick={()=>{deleteClick(company)}}  className="companies-list-button companies-list-delete">
                                מחיקה
                            </button>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}

export default CompaniesList