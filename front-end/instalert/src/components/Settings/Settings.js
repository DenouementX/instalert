import React, { Component } from "react";
import "./Settings.css";
import Header from '../Header/Header';
import SettingsCard from "../SettingsCard/SettingsCard";

const settings = [
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
            <div>Settings</div>
            <div>User</div>
            <div>Contacts</div>
            <section className="Contacts">
                {settings.map(set => (
                    <SettingsCard {...set}/>
                ))}
            </section>
        </div>
    );
}

export default Settings