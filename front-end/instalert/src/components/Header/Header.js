import React from "react";
import "./Header.css";

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
                </div>
                <div className="Nav-pfp">

                </div>
            </nav>
        );
    }
}
export default Header;