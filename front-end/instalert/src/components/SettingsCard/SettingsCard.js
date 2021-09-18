import React, { Component } from "react";
import PropTypes from "prop-types";
import "./SettingsCard.css";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";

function SettingsCard () {
    const [postType, setPostType] = React.useState("");

    const changePostType = (event) => { setPostType(event.target.value)};

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
                    />
                    <TextField
                        id="lastname"
                        className="FieldText"
                        label="Last Name"
                        variant="filled"
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
                    />
                    <TextField
                        id="filled-basic"
                        className="FieldText"
                        label="Phone Number"
                        variant="filled"
                        required="true"
                    />
                    <FormControl className="FieldSelect">
                        <InputLabel id="post-type-label">Post Type</InputLabel>
                        <Select
                            labelId="post-type-label"
                            id="post-type-select"
                            value={postType}
                            label="Post Type: {postType}"
                            onChange={changePostType}
                        >
                            <MenuItem value={"Type A"}>Type A</MenuItem>
                            <MenuItem value={"Type B"}>Type B</MenuItem>
                            <MenuItem value={"Type C"}>Type C</MenuItem>
                        </Select>
                    </FormControl>
                </div>
            </div>
        </article>
    );
}

export default SettingsCard