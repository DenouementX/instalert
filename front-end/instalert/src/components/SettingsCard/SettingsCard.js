import React from "react";
import "./SettingsCard.css";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Fab from "@mui/material/Fab";
import createTheme from '@mui/material/styles/createTheme';
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import indigo from "@mui/material/colors/indigo";
import SaveIcon      from "@mui/icons-material/Save";
import DeleteForever from "@mui/icons-material/DeleteForever";

const theme = createTheme({
    palette: {
        primary: {
            main: indigo[200]
        }
    }
});

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
            <div className="flex-container">
            <ThemeProvider theme={theme}>
                {/*<div className="empty-width"/>*/}
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
                />
                </div>
                {/*<div className="empty-width"/>*/}
                <hr/>
                <div className="text-wrap">
                <TextField
                    id="username"
                    className="FieldText"
                    label="Username"
                    variant="filled"
                    required="true"
                    // InputProps = {{style:{fontSize:8}}}
                    value={userName}
                    onChange={changeUserName}
                />
                </div>
                <div className="text-wrap">
                <TextField
                    id="filled-basic"
                    className="FieldText"
                    label="Phone Number"
                    variant="filled"
                    required="true"
                    // InputProps = {{style:{fontSize:8}}}
                    value={phoneNumber}
                    onChange={changePhoneNumber}
                />
                </div>
                <hr/>
                <div className="text-wrap" style={{width: '200px',
                    justifyContent: 'center'}}>
                    <FormControl className="FieldSelect">
                        <InputLabel id="post-type-label">Post Type</InputLabel>
                        <Select
                            labelId="post-type-label"
                            id="post-type-select"
                            label="Post Type"
                            // InputProps = {{style:{fontSize:8}}}
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
                <div className="text-wrap">
                    <div className="text-wrap">
                        <Fab
                            color="primary"
                            ariaLabel="save"
                            sx={{ boxShadow: 4 }}
                        >
                            <SaveIcon/>
                        </Fab>
                    </div>
                        <div className="text-wrap">
                        <Fab
                            color="primary"
                            ariaLabel="save"
                            sx={{ boxShadow: 4 }}
                        >
                            <DeleteForever/>
                        </Fab>
                    </div>
                </div>
            </ThemeProvider>
            </div>
            </div>
        </article>
    );
}

export default SettingsCard