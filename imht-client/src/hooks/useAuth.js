import {useSelector} from "react-redux"
import { selectToken } from "../features/auth/authSlice"
import { jwtDecode } from "jwt-decode";
const useAuth = ()=>{
    const token  = useSelector(selectToken)
    let isAdmin = false
    let isUser = false
    if(token){
        const userDecoded = jwtDecode(token)
        //console.log("userDecoded" , userDecoded)
        const {_id, username, roles, fullname, company} = userDecoded
        isAdmin = roles ==="Admin"
        isUser = roles ==="User"
        return {username, roles, fullname, company, isAdmin, isUser, _id}

    }

    return {_id:"", username:'', isAdmin, isUser, fullname:'', company:null, roles:""}


}
export default useAuth