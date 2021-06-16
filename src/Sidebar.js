import React, {useState,useEffect} from 'react';
import "./Sidebar.css";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { SearchOutlined } from "@material-ui/icons";
import { Avatar, IconButton } from '@material-ui/core';
import SidebarChat from './SidebarChat';
import axios from './axios';
import { useStateValue } from './StateProvider';

function Sidebar() {
    const [rooms,setRooms] = useState([]);    
    const [{user},dispatch] = useStateValue();

    useEffect(async () => {
        await axios.get('/rooms')
        .then(response=>{
            setRooms(response.data)
        })
    }, [])

    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <Avatar src={user?.photoURL}/>
               <div className="sidebar__headerRight">
                   <IconButton><DonutLargeIcon/></IconButton>
                   <IconButton><ChatIcon/></IconButton>
                   <IconButton><MoreVertIcon/></IconButton>                    
                </div> 
            </div>

            <div className="sidebar__search">
                <div className="sidebar__searchContainer">
                    <SearchOutlined />
                    <input placeholder="Search or start new chat" type="text" />
                </div>
            </div>

            <div className="sidebar__chats">
                <SidebarChat addNewChat/>
                {rooms.map(room => (
                    <SidebarChat key={room._id} id={room._id}
                    name={room.name}
                    ></SidebarChat>
                ))}
            </div>
        </div>
    );
}

export default Sidebar;
