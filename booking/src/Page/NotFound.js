
import { useContext } from 'react'
import { NavContext } from '../Context/NavContext'
import '../Style/NotFound.scss'


const NotFound = () => {
    const {OnClickLogo} = useContext(NavContext)
    return(
        <div className="not-found">
            <button onClick={OnClickLogo}> <h1 className="title"> BOOKING COCO </h1> </button>
            <h1 className='name-error'> Error 404 <br/> Page Introuvable !!! </h1>
            <span> &#10060; </span>
        </div>
    )
}


export default NotFound