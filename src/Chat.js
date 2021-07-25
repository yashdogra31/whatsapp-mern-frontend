import React, { useState,useEffect } from 'react';
import { Avatar, IconButton } from '@material-ui/core';
import { SearchOutlined, AttachFile, MoreVert } from "@material-ui/icons";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import Pusher from 'pusher-js'
import axios from './axios'
import "./Chat.css";
import {useParams} from 'react-router-dom'
//import firebase from 'firebase';
import { useStateValue } from './StateProvider';


function Chat() {
    const [messages, setMessages] = useState([]);
    const [input,setInput] = useState('');  
    const {roomId} = useParams();
    const [roomName,setRoomName] = useState('');
    const [{user},dispatch] = useStateValue();

    useEffect(() => {
        if(roomId){
            axios.get(`/rooms/${roomId}`)
            .then(response=>{
                setRoomName(response.data.name)
            })

            axios.get(`/messages/${roomId}`)
            .then(response=>{
                setMessages(response.data)
            })
        }        
    }, [roomId])

    useEffect(() => {
        const pusher = new Pusher('834b44f5b5742b9a84cd', {
          cluster: 'eu'
        });
        const channel = pusher.subscribe('message');
        channel.bind('inserted', function(newMessage) {
          //alert(JSON.stringify(newMessage));
          setMessages([...messages,newMessage]);
        });
    
        return () => {
          channel.unbind_all();
          channel.unsubscribe();
        }
      }, [messages])

    const sendMessage =async (e) => {
        e.preventDefault();
        await axios.post('/messages/new',{
            message: input,
            name: user.displayName,
            timestamp : new Date().toUTCString(),
            received : false,
            roomId : roomId
        });

        setInput("");    
    }

    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar/>
                <div className="chat__headerInfo">
                    <h2>{roomName}</h2>
                    <p>last seen{" "}{new Date(
                        messages[messages.length - 1]?.
                        timestamp
                    ).toUTCString()}</p>
                </div>
                <div className="chat__headerRight">
                    <IconButton><SearchOutlined/></IconButton>
                    <IconButton><AttachFile/></IconButton>
                    <IconButton><MoreVert/></IconButton>
                </div>
            </div>

            <div className="chat__body">
                {messages.map(message=>(
                    <p className={`chat__message ${message.name === user.displayName && "chat__receiver"}`}>
                    <span className="chat__name">{message.name}</span>
                    {message.message}
                    <span className="chat__timestamp">{message.timestamp}</span>
                </p>
                ))}
                

                {/* <p className="chat__message chat__receiver">
                    <span className="chat__name">Sony</span>
                    This is a message
                    <span className="chat__timestamp">{new Date().toUTCString()}</span>
                </p>

                <p className="chat__message">
                    <span className="chat__name">Sony</span>
                    This is a message
                    <span className="chat__timestamp">{new Date().toUTCString()}</span>
                </p>                */}

            </div>

            <div className="chat__footer">
                <InsertEmoticonIcon/>
                <form>
                    <input
                    value={input}
                    onChange = {e => setInput(e.target.value)}
                    placeholder="Type a message"
                    type="text"
                    />
                    <button onClick={sendMessage} type="submit">Send a message</button>
                </form>
                <MicIcon/>
            </div>
        </div>
    );
}

export default Chat;
