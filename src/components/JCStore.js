import { /*Link,*/ Outlet/*,useNavigate*/ } from 'react-router-dom'
import {default as Navbar} from './Navbar'

export default function JCStore() {
    //const navigate = useNavigate()

    return (
        <div>
            <Navbar></Navbar>

            <Outlet />
        </div>
    );
}