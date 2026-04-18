import axios from "axios";
import { BASE_URL } from "../constants";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addRequests } from "../store/slices/requestSlice";
import { useSelector } from "react-redux";
import RequestUser from "./requestUser";



const Requests = ()=>{
    const dispatch = useDispatch();
    const getRequests = useSelector((store)=>store.requests);

    const handleRequests = async()=>{
        try{
            const requests = await axios.get(`${BASE_URL}/user/requests/received`,{withCredentials:true});
            console.log("requests: ", requests);
            dispatch(addRequests(requests.data.data));
        }
        catch(err)
        {
            console.log("Error fetching requests: ", err.message);
        }
    }

    useEffect(()=>{
        handleRequests();
    },[]);

    if(getRequests && getRequests?.length === 0)
    {
        return(
            <div>
                <h1 className="text-center font-bold text-3xl p-2">Requests</h1>
                <p className="text-center">You have no requests yet.</p>
            </div>
        )
    }

    return(
        <div>
            <h1 className="text-3xl font-bold text-center my-6">Requests</h1>
            {getRequests && getRequests.map((req) => {
                return <RequestUser req={req} />;
            })}
        </div>
    )
}

export default Requests;