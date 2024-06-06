import { SlLogout } from "react-icons/sl";
import useLogout from "../../hooks/useLogout";


const LogoutButton =()=>{

    const {loading,logout} = useLogout(); 
    return(
    <div className="mt-auto">
       {!loading? <SlLogout onClick={logout} className="w-6 h-6 text-white cursor-pointer" />:
       <span className="loading loading-spinner"/>
       }
    </div>
);
}

export default LogoutButton;