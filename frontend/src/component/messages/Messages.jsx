import { useEffect,useRef } from "react";
import useGetMessage from "../../hooks/useGetMessages";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import Message from "./Message";
import useListenMessage from "../../hooks/useListenMessage";

const Messages = ()=>{
    const {messages,loading} = useGetMessage();
    useListenMessage();//get message from socket

    const lastMessageRef = useRef();

    // console.log("message",messages);

    useEffect(()=>{
     
      setTimeout(()=>{
        lastMessageRef.current?.scrollIntoView({behavior:"smooth"});
      },100)
    },[messages])
    return(
        <div className="px-4 flex-1 relative overflow-auto">
          
          {!loading&&messages.length>0&&messages.map((e)=>(
            <div key={e._id} ref={lastMessageRef}>
              <Message  message={e}/>
            </div>
          ))}

          {loading&& [...Array(3)].map((e,index)=><MessageSkeleton key={index}/>)}
          {!loading&& messages.length ===0&&(<p className="text-center">Send a message to start the conversation</p>)}
        </div>
    );
}

export default Messages;