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
                <TextField id="firstname" className="Field" label="First Name" variant="filled" />
                <TextField id="lastname" className="Field" label="Last Name" variant="filled" />
                <TextField id="username" className="Field" label="Username" variant="filled" />
                <TextField id="filled-basic" className="Field" label="Phone Number" variant="filled" />
                <FormControl fullWidth className="Field">
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
        </article>
    );
}

export default SettingsCard