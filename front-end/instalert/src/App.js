import {BrowserRouter as Router, Route} from "react-router-dom";
import Header from "./components/Header/Header";
import Posts from "./components/Posts/Posts";
import Settings from "./components/Settings/Settings";
import React, {useState, useEffect} from "react";

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

import { collection, getDocs } from "firebase/firestore"; 

const user = {
    firstName: "John",
    lastName: "Smith",
};

const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };
  
function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
}

const App = () => {

    //TODO: establish websockets connection with server

    const [firebaseApp, fAppUpdate] = useState(null)
    const [db         , dbUpdate]  = useState(null)
    const [contacts, contactsUpdate] = useState(null)
    const [lat, setLat] = useState(80)
    const [lng, setLng] = useState(80)

    const getContacts = async () => {
        const firestore = getFirestore()
        const querySnapshot = await getDocs(collection(firestore, "contacts"));

        const contacts = querySnapshot.docs.map((doc) => doc.data())
        contacts.forEach(contact => contact.doPost = doPost(contact))
        //console.log(contacts)

        contactsUpdate(contacts)
        dbUpdate(firestore)
    }

    useEffect(() => {
        fAppUpdate(initializeApp({
            apiKey: 'AIzaSyAPEcF5upcjIrsu9_cvbX_NfbZykAYOWsk',
            authDomain: 'instalert-dev.firebaseapp.com',
            projectId: 'instalert-dev'
        }));
        getContacts()
        navigator.geolocation.getCurrentPosition((pos) => {
            const crd = pos.coords;
            setLat(crd.latitude)
            setLng(crd.longitude)
        }, error, options)
    }, []);
    
    const doPost = (contact) => (severity) => {
        fetch('/api/send-message', {
            method: 'POST',
            mode: 'same-origin',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                severity: severity,
                contact: contact,
                user: Object.assign(user, {geolocation: {lat: lat, lng: lng}})    
            })
        })
    }

    return (
    <Router>
        <div>
            <Header/>
            <Route path="/" exact >
                <Posts contacts={contacts}/>
            </Route>
            <Route path="/settings">
                <Settings />
            </Route>
        </div>
    </Router>
    )
};

export default App;