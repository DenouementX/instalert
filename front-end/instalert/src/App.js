import React, { Component } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Post from './components/Post/Post';
import SettingsCard from './components/SettingsCard/SettingsCard';

class App extends Component {
    render() {
        return <div className="App">
            <Header />
            <SettingsCard />
            <section className="App-main">
                <Post nickname="CatLover293" avatar="http://placekitten.com/200/300" caption="OMG LOOK AT HIM HE IS SO CUTE!!!" image="http://placekitten.com/g/200/200" />
                <Post nickname="julia_aimes" avatar="https://i.pinimg.com/originals/65/56/e9/6556e9d201517acb93cb1280832a7dab.jpg" caption="My kitten is better than yours. Fight me." image="http://placekitten.com/g/200/150" />

                {/* more posts */}
            </section>
        </div>;
    }
}

export default App;