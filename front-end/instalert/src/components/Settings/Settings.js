import React, { Component } from "react";
import "./Settings.css";
import SettingsCard from "../SettingsCard/SettingsCard";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";

function Settings () {
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

    const curRef = React.useRef();

    return (
        <article className="Settings" ref={curRef}>
            <div>Settings</div>
            <div>User</div>
            <div>Contacts</div>
            <section className="Contacts">
                {settings.map(set => (
                    <SettingsCard {...set}/>
                ))}
            </section>
        </article>
    );
}

export default Settings