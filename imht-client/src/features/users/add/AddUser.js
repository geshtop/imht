import { useNavigate } from "react-router-dom";
import { useAddUserMutation } from "../usersApiSlice";
import "./add-user.css"
import { useEffect } from "react";
import { useGetAllCompaniesQuery } from "../../companies/companiesApiSlice";

const AddUser = () => {
  const [addUser, {data, isError, error, isSuccess, isLoading}] = useAddUserMutation()
  const  {data: companiesObject, isLoading: isCompaniesLoading} = useGetAllCompaniesQuery()

  const navigate = useNavigate()
  useEffect(()=>{
    if(isSuccess){
      navigate("/dash/users")
    }

  }, [isSuccess])
  const formSubmit = (e) =>{
    e.preventDefault()
      const data = new FormData(e.target)
      const userObject =Object.fromEntries(data.entries())
      addUser(userObject)




  }
  if(isCompaniesLoading) return <h1> Loading ...</h1>

  return (
    <div className="add-user-container">
      <form  onSubmit={formSubmit} className="add-user-form">
        <input type="text" placeholder="username" name="username" required />
        <input
          type="password"
          placeholder="password"
          name="password"
          required
        />
        <input type="text" placeholder="fullname" name="fullname" required />
        <select name="company" id="company" required>
          <option>בחר חברה</option>
          {companiesObject.data?.map(company=>{
            return <option value={company._id}>{company.name}</option>
          })}
        </select>
        <input type="email" placeholder="email" name="email" required />
       
        <input type="phone" placeholder="phone" name="phone" />
        <select name="roles" id="roles">
          <option value="User">
            הרשאה
          </option>
          <option value="Admin">מנהל</option>
          <option value="User">משתמש</option>
        </select>
        <select name="active" id="active">
          <option value={true}>
            פעיל
          </option>
          <option value={true}>כן</option>
          <option value={false}>לא</option>
        </select>
      
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddUser;
