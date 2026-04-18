import axios from "axios";
import { BASE_URL } from "../constants";
import { useDispatch } from "react-redux";
import { removeSelectedFeed } from "../store/slices/feedSlice";


const UserCard = ({user}) => {
    const {firstName, lastName, about, gender, photoUrl, _id} = user;
    const dispatch = useDispatch();

    const handleInterestedOrIgnored = async(sendStatus, sendUserId)=>{

      try{
        await axios.post(`${BASE_URL}/request/send/${sendStatus}/${sendUserId}`,{},{withCredentials: true});
        dispatch(removeSelectedFeed(sendUserId));
      }
      catch(err)
      {
        console.error("Error: ", err);
      }
    } 

  return (
    <div className="card bg-base-200 w-96 border border-white shadow-sm my-10">
      <figure>
        <img
          src={photoUrl}
          alt="user profile"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName} {lastName }</h2>
        <p>
         {about}
        </p>
        <div className="card-actions justify-center">
          <button className="btn btn-primary"
           onClick={()=>handleInterestedOrIgnored("ignored", _id)}
          >Ignored</button>
          <button className="btn btn-secondary"
           onClick={()=>handleInterestedOrIgnored("interested", _id)}
          >Interested</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
