import React, { Component } from "react";
import "./Settings.css";
import Header from '../Header/Header';
import UserSettings from "../UserSettings/UserSettings"
import SettingsCard from "../SettingsCard/SettingsCard";
import TextField from "@mui/material/TextField";

const user = {fn:"Sudo", ln: "Nim"}

const contacts = [
    {
        fn: "Johnathan",
        ln: "Rainwater",
        un: "FuncWithAnalysis52",
        pn: "888-447-5594",
        pt: "nature",
    },
    {
        fn: "Artemis",
        ln: "Besse",
        un: "Indifferential_Geometer",
        pn: "866-740-4531",
        pt: "people",
    },
    {
        fn: "Nicky",
        ln: "Bourbaki",
        un: "thefrenchconnection",
        pn: "515-808-2362",
        pt: "architecture",
    }
    ];

const Settings = () => {
    const curRef = React.useRef();

    return (
        <div className="Settings">
            <div className="CenterText">Settings</div>
            <div className="LeftUnderText">User</div>
            <section className="User">
                <UserSettings {...user}/>
            </section>
            <div className="LeftUnderText">Contacts</div>
            <section className="Contacts">
                {contacts.map(cont => (
                    <SettingsCard {...cont}/>
                ))}
            </section>
            
        </div>
    );
}

export default Settings