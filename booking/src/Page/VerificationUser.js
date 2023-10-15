import { useContext } from "react"
import { Navigate, Outlet } from "react-router-dom"
import { UserContext } from "../Context/UserContext"




const VerificationUser = () => {
    const {user} = useContext(UserContext)

    if(!user){
        return <Navigate to="/" />
    }

    return(
        <div className="verif">
            <Outlet />
        </div>
    )
}


export default VerificationUser