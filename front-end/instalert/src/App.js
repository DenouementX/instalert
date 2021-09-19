import {BrowserRouter as Router, Route} from "react-router-dom";
import Header from "./components/Header/Header";
import Posts from "./components/Posts/Posts";
import Settings from "./components/Settings/Settings";
import React from "react";

const App = () => {
    return (
    <Router>
        <div>
            <Header/>
            <Route path="/" exact component={Posts}/>
            <Route path="/settings" component={Settings}/>
        </div>
    </Router>
    )
};

export default App;