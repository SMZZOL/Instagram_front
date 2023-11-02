import { useSelector } from 'react-redux'
import { selectCurrentToken } from "../features/auth/authSlice"
import jwtDecode from 'jwt-decode'

const useAuth = () => {
    const token = useSelector(selectCurrentToken)


    if (token) {
        const decoded = jwtDecode(token)
        const { _id,userid, email } = decoded.UserInfo


        return { _id, userid, email }
    }

    return { _id:null, userId: '',email:'' }
}
export default useAuth