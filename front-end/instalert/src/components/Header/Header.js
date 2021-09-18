import React from "react";
import "./Header.css";
import pfp from "../../images/pfp.png";

class Header extends React.Component{
    render(){
        return (
            <nav className="Nav">
                <div className="Nav-menus">
                    <div className="Nav-brand">
                        <h3 className="Nav-brand-logo" href="/">
                            Instalert
                        </h3>
                    </div>
                    <div>
                        <img className="Nav-pfp" src={pfp} alt="Paris" />
                    </div>
                </div>
            </nav>
        );
    }
}
export default Header;