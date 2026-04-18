import axios from "axios";
import { BASE_URL } from "../constants";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addConnections } from "../store/slices/connectionSlice";
import { useSelector } from "react-redux";
import ConnectedUser from "./ConnectedUser";



const Connections = ()=>{
    const dispatch = useDispatch();
    const getConnections = useSelector((store)=>store.connections);

    const handleConnections = async()=>{
        // if(getConnections) return;
        try{
            const connections = await axios.get(`${BASE_URL}/user/connections`, {withCredentials:true});
            console.log("connections: ", connections);
            dispatch(addConnections(connections));
        }
        catch(err)
        {
            console.log("Error fetching connections: ", err.message);
        }
    }

    useEffect(()=>{
        handleConnections();
    },[])

    if(getConnections && getConnections?.data?.data?.length === 0)
    {
        return(
            <div>
                <h1 className="text-center font-bold text-3xl p-2">Connections</h1>
                <p className="text-center">You have no connections yet.</p>
            </div>
        )
    }

    return(
        <div>
            <h1 className="text-center font-bold text-3xl p-2">Connections</h1>
            {getConnections && getConnections?.data?.data.map((con)=>{
                return <ConnectedUser con={con}/>
            })}
        </div>
    )
}

export default Connections;