import React from "react";
import "./Settings.css";
import UserSettings from "../UserSettings/UserSettings"
import SettingsCard from "../SettingsCard/SettingsCard";
import Fab from "@mui/material/Fab";
import createTheme from "@mui/material/styles/createTheme";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import indigo from "@mui/material/colors/indigo";
import AddIcon      from "@mui/icons-material/Add";


const user = {fn:"Sudo", ln: "Nim"};

const initContacts = [
    {
        fn: "Make a",
        ln: "Contact",
        un: "with the",
        pn: "Plus Button",
        pt: "Below!",
    }];

initContacts.doAdd = () => null;



const theme = createTheme({
    palette: {
        primary: {
            main: indigo[200]
        }
    }
});

const Settings = ({contacts}) => {

    const properFormContacts = contacts ? contacts.map(contact => {return {
        fn: contact.firstName,
        ln: contact.lastName,
        un: contact.username,
        key: contact.key,
        pn: contact.phoneNumber,
        pt: contact.postType,
        dd: contact.doDelete,
        du: contact.doUpdate,
    }}) : initContacts;



    return (
        <>
            <br/>
            <div className="Settings">
            <ThemeProvider theme={theme}>
                <br/>
                <div className="CenterText">Settings</div>
                <br/>
                <div className="LeftUnderText">User</div>
                <section className="User">
                    <UserSettings {...user}/>
                </section>
                <div className="LeftUnderText">Contacts</div>
                <section className="Contacts">
                    {properFormContacts.map(cont => (
                        <SettingsCard {...cont}/>
                    ))}
                </section>
                <div className="settings-add">
                    <Fab
                        color="primary"
                        ariaLabel="save"
                        sx={{ boxShadow: 4 }}
                        onClick={contacts.doAdd}
                    >
                        <AddIcon/>
                    </Fab>
                </div>
            </ThemeProvider>
            </div>
        </>
    );
}

export default Settings