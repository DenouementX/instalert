import React, { Component } from "react";
import "./UserSettings.css";
import TextField from "@mui/material/TextField";

function UserSettings ({fn, ln}) {
    const [firstName, setFirstName] = React.useState(fn);
    const [lastName, setLastName] = React.useState(ln);

    const changeFirstName = (event) => {setFirstName(event.target.value)};
    const changeLastName = (event) => {setLastName(event.target.value)};

    const curRef = React.useRef();

    return (
        <article className="UserSettings" ref={curRef}>
            <div class="Userbox">
            <div class="flex-container">
                <TextField
                    id="firstname"
                    className="FieldText"
                    label="First Name"
                    variant="filled"
                    required="true"
                    InputProps = {{style:{fontSize:8}}}
                    value={firstName}
                    onChange={changeFirstName}
                />
                <TextField
                    id="lastname"
                    className="FieldText"
                    label="Last Name"
                    variant="filled"
                    InputProps = {{style:{fontSize:8}}}
                    value={lastName}
                    onChange={changeLastName}
                />
            </div>
            </div>
        </article>
    );
}

export default UserSettings