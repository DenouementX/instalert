import React from "react";
import "./Settings.css";
import UserSettings from "../UserSettings/UserSettings"
import SettingsCard from "../SettingsCard/SettingsCard";

const user = {fn:"Sudo", ln: "Nim"};

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

    return (
        <>
            <br/>
            <div className="Settings">
                <br/>
                <div className="CenterText">Settings</div>
                <br/>
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
        </>
    );
}

export default Settings