import { Avatar } from '@material-ui/core'
import React, {useEffect,useState} from 'react'
import "./SidebarChat.css"
import axios from './axios';
import {Link} from 'react-router-dom';

function SidebarChat({id,name,addNewChat}) {

    const [seed,setSeed] = useState('');
    const [messages,setMessages] = useState('');

    useEffect(() => {
       setSeed(Math.floor(Math.random()*5000))
    }, [])

    useEffect(() => {
        if(id){
            axios.get(`/messages/${id}`)
            .then(response=>{
                setMessages(response.data)
                //console.log(response.data)
            })
        }        
    }, [id])

    const createChat = async () => {
        const roomName = prompt("Please Enter Name for chat");

        if(roomName){

           await axios.post('/rooms/new',{
                name: roomName
            });

            //force render child component. how ?

        }
        
    };

    return !addNewChat ? (
        <Link to={`/rooms/${id}`}>
            <div className="sidebarChat">
            <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
            <div className="sidebarChat__info">
                <h2>{name}</h2>
                <p>{messages[messages.length-1]?.message}</p>
            </div>
        </div>
        </Link>        
    ) : (
        <div onClick={createChat} className="sidebarChat">
            <h2>Add New Chat</h2>
        </div>
    )
}

export default SidebarChat
