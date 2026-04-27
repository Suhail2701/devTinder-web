import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { createSocketConnection } from "../socket/socket";
import axios from "axios";
import { BASE_URL } from "../constants";

const Chats = () => {
  const { targetId } = useParams();
  const loggedInUser = useSelector((store) => store.user);
  // const socket = createSocketConnection();
  const [newMessage, setNewMessage] = useState("");
  const [allMessages, setAllMessages] = useState([]);

  console.log("allMessages: ", allMessages);

  const handleChats = async ()=>{
   try
   {
        if(!loggedInUser) return;    
        const chats = await axios.get(`${BASE_URL}/chat/${targetId}`,{withCredentials:true});

        console.log("chats: ", chats);

        const extractedMessages = chats?.data?.messages?.map((msg)=>{
            return {
                firstName: msg?.senderId?.firstName,
                newMessage: msg?.message,
                photoUrl: msg?.senderId?.photoUrl,
                loggedInUserId: msg?.senderId?._id
            }
        })

        console.log("extractedMessages: ", extractedMessages);

        setAllMessages(extractedMessages    );
   }
   catch(err)
   {
    console.log(err);
   }
  }

  useEffect(()=>{
    console.log("called handleChats");
   handleChats();
  },[loggedInUser])


  useEffect(() => {
    //as soon as the page loads, the socket connection is made and the user
    //  joins the chat room with the target user
    const socket = createSocketConnection();
    socket.emit("joinChat", { loggedInUserId: loggedInUser?._id, targetId });
    console.log(loggedInUser?.firstName, "joined the chat room");

    // Listen for incoming messages from the server
    socket.on(
      "receivedMessage",
      ({ firstName, newMessage, photoUrl, loggedInUserId }) => {
        console.log(firstName + ": " + newMessage);
        setAllMessages((prev) => [
          ...prev,
          { firstName, newMessage, photoUrl, loggedInUserId },
        ]);
      },
    );

    return () => {
      socket.disconnect();
    };
  }, [loggedInUser?._id, targetId]);

  const handleNewMessage = () => {
    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      firstName: loggedInUser?.firstName,
      newMessage,
      targetId,
      loggedInUserId: loggedInUser?._id,
      photoUrl: loggedInUser?.photoUrl,
    });
  };

  return (
    <div className="w-1/2 mx-auto border border-gray-600 mt-2">
      <h1 className="text-white text-2xl my-2 p-2 text-center border-b border-gray-600">
        Chats
      </h1>
      <div className="p-3 scrollbar h-[600px] overflow-y-scroll">
        {allMessages &&
          allMessages.map((message) => {
            return loggedInUser?._id === message.loggedInUserId ? (
              <div className="chat chat-end">
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS chat bubble component"
                      src={message.photoUrl}
                    />
                  </div>
                </div>
                <div className="chat-header">
                  {message.firstName}
                  <time className="text-xs opacity-50">12:46</time>
                </div>
                <div className="chat-bubble">{message.newMessage}</div>
                <div className="chat-footer opacity-50">Seen at 12:46</div>
              </div>
            ) : (
              <div className="chat chat-start">
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS chat bubble component"
                      src={message.photoUrl}
                    />
                  </div>
                </div>
                <div className="chat-header">
                  {message.firstName}
                  <time className="text-xs opacity-50">12:45</time>
                </div>
                <div className="chat-bubble">{message.newMessage}</div>
                <div className="chat-footer opacity-50">Delivered</div>
              </div>
            );
          })}
      </div>
      <div className="flex items-center gap-3 border-t border-gray-600 p-2">
        <input
          placeholder="let's chat"
          className="p-3 bg-black"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button className="btn btn-secondary" onClick={handleNewMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chats;
