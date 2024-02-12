import { useNavigate, useParams } from "react-router-dom";
import { useGetAllCompaniesQuery } from "../../companies/companiesApiSlice";
import { useGetAllUsersQuery, useUpdateUserMutation } from "../usersApiSlice";
import "./single-user.css"
import { useEffect } from "react";
const SingleUser = () => {
  const {userId} = useParams()
  const  {data: usersObject, isError, error, isLoading, isSuccess} = useGetAllUsersQuery()
  const {data:companies, isLoading: isCompaniesLoading} = useGetAllCompaniesQuery()
  const [updateUser, {isSuccess: isUpdateSuccess}] = useUpdateUserMutation()
  const navigate = useNavigate()
  useEffect(()=>{
    if(isUpdateSuccess){
      navigate("/dash/users")
    }
  }, [isUpdateSuccess])
  const formSubmit = (e) =>{
      e.preventDefault()
      const data = new FormData(e.target)
      const userObject =Object.fromEntries(data.entries())
      console.log(userObject)
     updateUser(userObject)

  } 


  if(isLoading || isCompaniesLoading) return <h1> Loading ...</h1>
  if(isError) return <h1>{ JSON.stringify( error)}</h1>
  const user = usersObject.data.find(u => u._id === userId)
  if(!user) return <h1>{ "Not found"}</h1>

 
    return (
      <div className="single-user-container">
        <div className="single-user-info">
          <div className="single-user-img-container">
            <img src={user.company?.image || "/noavatar.png"} alt="" fill />
          </div>
          {user.username}
        </div>
        <div className="single-user-form-container">
          <form  onSubmit={formSubmit} className="single-user-form">
            <input name="_id" defaultValue={user._id} type="hidden" />
            <label>שם משתמש</label>
            <input readOnly={true} type="text" name="username" defaultValue={user.username} />
            <label>סיסמא</label>
            <input type="password" name="password" />
            <label>שם מלא</label>
            <input type="text" name="fullname" placeholder="שם מלא" defaultValue={user.fullname} />
            <label>חברה</label>
            <select name="company" id="company" required>
          {companies.data.map(company=>{
            return <option selected={company._id === user.company?._id} value={company._id}>{company.name}</option>
          })}
        </select>
            <label>מייל</label>
            <input type="email" name="email" placeholder="מייל "  defaultValue={user.email} />
          
            <label>טלפון</label>
            <input type="text" name="phone" placeholder="טלפון " defaultValue={user.phone} />
           
            <label>הרשאה</label>
            <select name="roles" id="roles">
              <option value="Admin" selected={user.roles ==="Admin"}>מנהל</option>
              <option value="User" selected={user.roles ==="User"}>משתמש</option>
            </select>
            <label>פעיל?</label>
            <select name="active" id="active">
              <option value={true} selected={user.active}>כן</option>
              <option value={false} selected={!user.active}>לא</option>
            </select>
            <button>עדכן</button>
          </form>
        </div>
      </div>
    );
  };
  
  export default SingleUser;
  