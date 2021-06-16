import React,{useEffect, useState} from "react"
import './App.css';
import Chat from './Chat';
import Sidebar from './Sidebar';
import axios from './axios'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from './login.js'
import { useStateValue } from './StateProvider';

function App() {
 
  const [{user},dispatch] = useStateValue();
  //const [user,setUser] = useState();

  return (
    <div className="app">
      {!user?(<Login/>):(
        <div className="app__body">
        <Router>
          <Sidebar/>
          <Switch>
            <Route path="/rooms/:roomId">               
              <Chat/>
            </Route>
            <Route path="/">               
              <Chat/>
            </Route>                     
          </Switch>
        </Router>
      </div>  
      )}
       
    </div>
  );
}

export default App;
