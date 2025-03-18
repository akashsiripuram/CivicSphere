import Navbar from "../Navbar/Navbar";
import {Outlet } from "react-router-dom";

function Layout() {
    return ( 
        <div>
            
            <Navbar/>
            <Outlet/>
            
            
        </div>
     );
}

export default Layout;