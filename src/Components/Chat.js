import axios from 'axios';
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as signalR from "@microsoft/signalr"


const URL = "https://chatting-dat-lom.somee.com"
function Chat({ tags }) {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [connection,setConnection] = useState(null)
    
    const handleGetAll =async (tags)=>{
      try {
        const response = await axios.post(`${URL}/api/chat/filter`, tags);
        
        setMessages(response.data)
      } catch (error) {
        console.error('Error sending message:', error);
        throw error;
      }
    }


    useEffect(() => {
      handleGetAll(tags)
      const newConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${URL}/chathub`)
      .configureLogging(signalR.LogLevel.Information).build();
      setConnection(newConnection);
      newConnection.start().then(()=>{
      }).catch((error)=>console.log("ERROR OCCURED: ",error))

      newConnection.on("ReceiveMessage",(message)=>{
        console.log("Received Message: ",messages);
        console.log(tags);
        if(tags==""||message.tags.split(',').some(tag => tags.includes(tag))){
          console.log(messages);
          setMessages(prev=>[...prev,message])
        }
      })

      return ()=>{
        if(newConnection){
          newConnection.off("ReceiveMessage");
          newConnection.stop()
        }
      }
    
    },[]);
    const handleMessageSend = async () => {
      if(connection && message.trim() !== ""){
        try{
          const tagsString = tags.join(",")
          const messageDto = {
            message:message,
            tags:tagsString
          }
          await connection.invoke("sendMessage", messageDto);
          console.log("Message Sent:", messageDto);
          setMessage('')
        }catch(error){console.log(error)};
      }
      }

      useEffect(()=>{
        handleGetAll(tags)
      },[tags])
    return (
      <div className="vh-100 d-flex flex-column bg-white p-3 border border-primary-subtle">
      <div className="mb-3" style={{ maxHeight: 'calc(100vh - 150px)', overflowY: 'auto' }}>
        {messages.map((msg, index) => (
          <div key={index} className="mb-2">
            <div className="card ">
              <div className="container-fluid">
                <p>{msg.message}</p>
                <div>
                  {msg.tags.split(",").map((tag, tagIndex) => (
                    <span key={tagIndex} className="badge bg-primary me-2 ">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-auto ">
        <input
          type="text"
          className="form-control mb-2 border border-primary-subtle"
          placeholder="Enter your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleMessageSend}>
          Send
        </button>
      </div>
    </div>
    
    );
}

export default Chat;
