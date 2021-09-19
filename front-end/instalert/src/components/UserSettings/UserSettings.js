import React from "react";
import "./UserSettings.css";
import TextField from "@mui/material/TextField";
import Fab from "@mui/material/Fab";
// import createTheme from '@mui/material/styles/createTheme';
// import ThemeProvider from "@mui/material/styles/ThemeProvider";
// import indigo from "@mui/material/colors/indigo";
import SaveIcon from '@mui/icons-material/Save';


function UserSettings ({fn, ln}) {
    const [firstName, setFirstName] = React.useState(fn);
    const [lastName, setLastName] = React.useState(ln);

    const changeFirstName = (event) => {setFirstName(event.target.value)};
    const changeLastName = (event) => {setLastName(event.target.value)};

    const curRef = React.useRef();

    return (
        <article className="UserSettings" ref={curRef}>
            <div className="Userbox">
            <div className="flex-container">
                <div className="text-wrap">
                    <TextField
                        id="firstname"
                        className="FieldText"
                        label="First Name"
                        variant="filled"
                        required="true"
                        // InputProps = {{style:{fontSize:8}}}
                        value={firstName}
                        onChange={changeFirstName}
                        sx={{ boxShadow: 2 }}
                    />
                </div>
                <div className="text-wrap">
                    <TextField
                        id="lastname"
                        className="FieldText"
                        label="Last Name"
                        variant="filled"
                        // InputProps = {{style:{fontSize:8}}}
                        value={lastName}
                        onChange={changeLastName}
                        sx={{ boxShadow: 2 }}
                    />
                </div>
                <hr/>
                <Fab
                    color="primary"
                    ariaLabel="save"
                    sx={{ boxShadow: 4 }}
                >
                    <SaveIcon/>
                </Fab>
            </div>
            </div>
        </article>
    );
}

export default UserSettings