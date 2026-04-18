import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../constants";
import { useDispatch }  from "react-redux";
import {removeUser} from "../store/slices/user";
import {useNavigate} from "react-router-dom";
import { removeConnections } from "../store/slices/connectionSlice";
import { removeFeed } from "../store/slices/feedSlice";
import { removeRequests } from "../store/slices/requestSlice";

const Navbar = () => {
  const userData = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async ()=>{
    try{
      await axios.post(`${BASE_URL}/logout`,{}, {withCredentials: true});
      dispatch(removeUser());
      dispatch(removeConnections());
      dispatch(removeFeed());
      dispatch(removeRequests());
      navigate("/login");
    }
    catch(err)
    {
        console.error("Error logging out:", err);
    }
  }
  return (
    <div className="navbar bg-base-200 shadow-sm">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          Dev Tinder
        </Link>
      </div>
      {userData && (
        <div className="flex gap-2">
          <p className="m-2">Welcome {userData?.firstName}</p>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src={userData?.photoUrl}
                />
              </div>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                  {/* <span className="badge">New</span> */}
                </Link>
              </li>
              <li>
                <Link to="/connections">Connections</Link>
              </li>
              <li>
                <Link to="/requests">Requests</Link>
              </li>
              <li>
                <Link  
                  onClick={handleLogout}
                >Logout</Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
