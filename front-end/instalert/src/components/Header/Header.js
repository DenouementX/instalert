import React from "react";
import "./Header.css";
import pfp from "../../images/pfp.png";

const Header = () => {

    return (
        <nav className="Nav">
            <div className="Nav-menus">
                <div className="Nav-brand">
                    <h3 className="Nav-brand-logo">
                        Instalert
                    </h3>
                </div>
                <div>
                    <img className="Nav-pfp" src={pfp} alt="Paris" />
                </div>
            </div>
        </nav>
    );
};

export default Header;