import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,Route,Redirect,withRouter
} from "react-router-dom";
import Blog from './components/Blog';
import Update from './components/Update';


function App() {
  return (
    <div className="App">
     <Router>
       <Route exact path="/" component={Blog}/>
       <Route exact path="/Update/:id" component={Update}/>
     </Router>
    </div>
  );
}

export default App;
