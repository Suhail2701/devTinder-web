import UserCard from "./userCard";
import axios from "axios";
import { BASE_URL } from "../constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../store/slices/feedSlice";
import { useEffect } from "react";


const Feed = () => {
    const dispatch = useDispatch();
    const getFeed = useSelector((store)=>store.feed); 
    console.log("feed: ", getFeed?.data);
  const handleFeed = async () => {
    // if(!getFeed) return;
    try {
      const feed = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });
      console.log("feed hhhh: ", feed?.data);
      console.log("feed data: ", feed?.data?.data);
      dispatch(addFeed(feed?.data?.data));
    } catch (err) {
      console.log("Error: ", err.message);
    }
  };

  useEffect(()=>{
    handleFeed();
  },[])

  if(!getFeed || getFeed.length === 0) return <p className="text-2xl text-center mt-10">No more users to show</p>;

  return (
    <div className="h-[850px] flex flex-col  items-center">
      {/* {getFeed && getFeed?.data.map((user) => {
        return <UserCard key={user._id} user={user} />;
      })} */}
      {getFeed && <UserCard user={getFeed[0]} />}
    </div>
  );
};

export default Feed;
