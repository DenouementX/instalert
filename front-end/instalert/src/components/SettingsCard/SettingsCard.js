import React, { Component } from "react";
import "./SettingsCard.css";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";

function SettingsCard ({fn, ln, un, pn, pt}) {
    const [firstName, setFirstName] = React.useState(fn);
    const [lastName, setLastName] = React.useState(ln);
    const [userName, setUserName] = React.useState(un);
    const [phoneNumber, setPhoneNumber] = React.useState(pn);
    const [postType, setPostType] = React.useState(pt);

    const changeFirstName = (event) => {setFirstName(event.target.value)};
    const changeLastName = (event) => {setLastName(event.target.value)};
    const changeUserName = (event) => {setUserName(event.target.value)};
    const changePhoneNumber = (event) => {setPhoneNumber(event.target.value)};
    const changePostType = (event) => {setPostType(event.target.value)};

    const curRef = React.useRef();

    return (
        <article className="SettingsCard" ref={curRef}>
            <div className="Delete">
                
            </div>
            <div className="CardFields">
                <div class="flex-container-1">
                    <div class="empty-width"/>
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
                    <div class="empty-width"/>
                </div>
                <div class = "flex-container-2">
                    <TextField
                        id="username"
                        className="FieldText"
                        label="Username"
                        variant="filled"
                        required="true"
                        InputProps = {{style:{fontSize:8}}}
                        value={userName}
                        onChange={changeUserName}
                    />
                    <TextField
                        id="filled-basic"
                        className="FieldText"
                        label="Phone Number"
                        variant="filled"
                        required="true"
                        InputProps = {{style:{fontSize:8}}}
                        value={phoneNumber}
                        onChange={changePhoneNumber}
                    />
                    <FormControl className="FieldSelect">
                        <InputLabel id="post-type-label">Post Type</InputLabel>
                        <Select
                            labelId="post-type-label"
                            id="post-type-select"
                            label="Post Type"
                            InputProps = {{style:{fontSize:8}}}
                            value={postType}
                            onChange={changePostType}
                        >
                            <MenuItem value={"animals"}>Animals</MenuItem>
                            <MenuItem value={"architecture"}>Architecture</MenuItem>
                            <MenuItem value={"nature"}>Nature</MenuItem>
                            <MenuItem value={"people"}>People</MenuItem>
                            <MenuItem value={"tech"}>Tech</MenuItem>
                        </Select>
                    </FormControl>
                </div>
            </div>
        </article>
    );
}

export default SettingsCard