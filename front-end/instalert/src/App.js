import {BrowserRouter as Router, Route} from "react-router-dom";
import Header from "./components/Header/Header";
import Posts from "./components/Posts/Posts";
import Settings from "./components/Settings/Settings";
import React, {useState, useEffect} from "react";

import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, getDocs, deleteDoc, updateDoc, addDoc } from "firebase/firestore"


const user = {
    firstName: "John",
    lastName: "Smith",
};

const options = {
    enableHighAccuracy: true,
    timeout: 20000,
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

        const contacts = querySnapshot.docs.map((doc) => Object.assign(doc.data(), {key: doc.id}));
        contacts.forEach(contact => {
            contact.doPost   = doPost(contact);
            contact.doDelete = doDelete(contact);
            contact.doUpdate = doUpdate(contact);
        });
        //console.log(contacts)

        contacts.doAdd = doAdd;

        contactsUpdate(contacts);
        dbUpdate(firestore)
    }

    useEffect(() => {
        fAppUpdate(initializeApp({
            apiKey: 'AIzaSyAPEcF5upcjIrsu9_cvbX_NfbZykAYOWsk',
            authDomain: 'instalert-dev.firebaseapp.com',
            projectId: 'instalert-dev'
        }));

        navigator.geolocation.getCurrentPosition((pos) => {
            const crd = pos.coords;
            setLat(crd.latitude)
            setLng(crd.longitude)
        }, error, options)
    }, []);

    useEffect(() => {
        getContacts()
    }, [lat, lng])
    
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
                user: {
                    firstName: "John",
                    lastName: "Smith",
                    geoLocation: {
                        lat: lat,
                        lng: lng
                    }
                }    
            })
        })
    }

    const doDelete = (contact) => async () => {
        await deleteDoc(doc(db, "contacts", contact.key));
        await getContacts();
    };

    const doUpdate = (contact) => async (fn, ln, un, pn, pt) => {
        await updateDoc(doc(db, "contacts", contact.key), {
            firstName: fn,
            lastName: ln,
            username: un,
            phoneNumber: pn,
            postType: pt,
        });
        await getContacts();
    };

    const doAdd = async () => {
        await addDoc(collection(db, "contacts"), {
            firstName: "Enter first name",
            lastName: "Enter last name",
            username: "Enter username",
            phoneNumber: "Enter phone number",
            postType: "Animals",
        });
        await getContacts();
    };


    return (
    <Router>
        <div>
            <Header/>
            <Route path="/" exact >
                <Posts contacts={contacts}/>
            </Route>
            <Route path="/settings">
                <Settings contacts={contacts}/>
            </Route>
        </div>
    </Router>
    )
};

export default App;