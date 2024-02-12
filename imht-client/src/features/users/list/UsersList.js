import React from 'react'
import Search from '../../../components/search/Search';
import { Link } from 'react-router-dom';
import "./users-list.css"
import { useGetAllUsersQuery, useDeleteUserMutation } from '../usersApiSlice';

const UsersList = () => {
  const  {data: usersObject, isError, error, isLoading, isSuccess} = useGetAllUsersQuery()
  const [deleteUser,{isSuccess: isDeleteSuccess}] = useDeleteUserMutation()
   const deleteClick = (user) =>{
       if(window.confirm ("בטוח שברצונך למחוק את החברה?")){
          deleteUser({_id: user._id})
       }
      
   }
  if(isLoading) return <h1> Loading ...</h1>
  if(isError) return <h1>{ JSON.stringify( error)}</h1>
    return (
        <div className="users-list">
          <div className="users-list-top">
            <Search placeholder="Search for a user..." />
            <Link className="users-list-add-button" to="/dash/users/add">משתמש חדש</Link>
              
           
          </div>
          <table className="users-list-table">
            <thead>
              <tr>
                <td>שם</td>
                <td>שם משתמש</td>
                <td>מייל</td>
                <td>חברה</td>
                <td>נוצר ב</td>
                <td>הרשאה</td>
                <td>פעיל</td>
                <td>פעולות</td>
              </tr>
            </thead>
            <tbody>
              {usersObject.data.map((user) => (
                <tr key={user.id}>
                  <td>
                    <div className="users-list-user">
                      {user.fullname}
                    </div>
                  </td>
                  <td>{user.username}</td>

                  <td>{user.email}</td>
                  <td>{user.company?.name}</td>

                  <td>{user.createdAt?.toString().slice(4, 16)}</td>
                  <td>{user.roles==="Admin" ? "מנהל" : "משתמש"}</td>
                  <td>{user.active ? "כן" : "לא"}</td>
                  <td>
                    <div className="users-list-buttons">
                      <Link className='users-list-button users-list-view' to={`/dash/users/${user._id}`}>
                          צפייה
                      </Link>
                   
                        <button onClick={()=>deleteClick(user)} className="users-list-button users-list-delete">
                          מחיקה
                        </button>
                     
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
        </div>
      );
}

export default UsersList