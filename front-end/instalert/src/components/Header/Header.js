import React from "react";
import "./Header.css";
import pfp from "../../images/pfp.png";
import {Link, Route} from "react-router-dom";

const Header = () => {

    return (
        <nav className="Nav">
            <div className="Nav-menus">
                <div className="Nav-brand">
                    <h3 className="Nav-brand-logo">
                        Instalert
                    </h3>
                </div>
                <Route path="/" exact>
                    <Link to="/settings" >
                        <img className="Nav-pfp" src={pfp} alt="profile pic" />
                    </Link>
                </Route>
                <Route path="/settings">
                    <Link to="/" >
                        <img className="Nav-pfp" src={pfp} alt="profile pic" />
                    </Link>
                </Route>
            </div>
        </nav>
    );
};

export default Header;