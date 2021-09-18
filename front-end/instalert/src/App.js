import React, { Component } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Post from './components/Post/Post';

const posts = [
    {
        nickname: "CatLover293",
        avatar:   "http://placekitten.com/200/300",
        caption:  "OMG LOOK AT HIM HE IS SO CUTE!!!",
        image:    "http://placekitten.com/g/200/200"
    },
    {
        nickname: "julia_aimes",
        avatar:   "https://i.pinimg.com/originals/65/56/e9/6556e9d201517acb93cb1280832a7dab.jpg",
        caption:  "My kitten is better than yours. Fight me.",
        image:    "http://placekitten.com/g/200/150"
    }
];

const App = () => {

    return (
        <div className="App">
        <Header />
        <section className="App-main">
        {posts.map(post => (
            <Post {...post}/>
        ))}
        </section>
    </div>
    )
};

export default App;