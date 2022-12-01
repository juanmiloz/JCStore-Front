import { Outlet} from 'react-router-dom'
import {default as Navbar} from './Navbar'
import jwt_decode from 'jwt-decode'


export default function JCStore() {
    //const navigate = useNavigate()

    var userId;

    const getUser = async () => {
        let token = localStorage.getItem("webToken")
        userId = jwt_decode(token).userId   
        
        let url = 'http://localhost:8080/users/'+userId

        const res = await fetch(url,{
            method:'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        const answer = await res.json()
        
        localStorage.setItem("currentUser",JSON.stringify(answer))
    }
    
    getUser();

    return (
        <div>
            <Navbar></Navbar>

            <Outlet />
        </div>
    );
}