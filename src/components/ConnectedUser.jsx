import { Link } from "react-router-dom";
const ConnectedUser = ({con})=>{
    const {firstName, lastName, about, photoUrl, _id} = con;
    return(
        <div className="flex justify-between items-center  w-[350px] mx-auto bg-base-300 shadow-sm p-4 m-3 rounded-lg">
            <div className="w-4/12 rounded-full overflow-hidden" >
                <img src={photoUrl} alt="Profile"/>
            </div>
            <div className="w-8/12 p-4 text-center">
                <p className="text-2xl">{firstName} {lastName}</p>
                <p>{about}</p>
            </div>
            <div>
                <Link to={`/chats/${_id}`}>
                    <button className="btn btn-primary">Chat</button>
                </Link>
            </div>
        </div>
    )
}

export default ConnectedUser;