import React, { useEffect, useState, useRef } from 'react';
import './Posts.css';
import Post from '../Post/Post';
import toast, { Toaster } from 'react-hot-toast';

const initPosts = [
    {
        nickname: "KittyAlwaysHelpin",
        avatar: "http://placekitten.com/200/300",
        caption: "Hey! You're gonna be okay! Hit the big round button where the cat is pointing!",
        captionIndex: 0,
        image: "http://placekitten.com/g/590/590",
    },
    // {
    //     nickname: "julia_aimes",
    //     avatar: "https://i.pinimg.com/originals/65/56/e9/6556e9d201517acb93cb1280832a7dab.jpg",
    //     caption: "My kitten is better than yours. Fight me.",
    //     image: "http://placekitten.com/g/200/150"
    // },
    // {
    //     nickname: "wateronewith",
    //     avatar: "https://placeimg.com/430/430/people",
    //     caption: "All the fine things in life <3",
    //     image: "http://placekitten.com/g/300/250"
    // },
    // {
    //     nickname: "danielStevens3",
    //     avatar: "https://placeimg.com/330/480/people",
    //     caption: "Groot.",
    //     image: "https://placeimg.com/330/330/nature"
    // },
];

function PostData(type, captions) {
    this.type = type
    this.captionIndex = Math.floor(Math.random() * 4)
    this.captions = captions
    this.imageH = 430
    this.imageW = 430
    this.imageUrl = `https://placeimg.com/${this.imageW}/${this.imageH}/${this.type}`
}

const postDatas = [
    new PostData("animals", [
        "Taking name suggestions in the comments.",
        "look at this absolute cutie!",
        "After three weeks of chores and constant nagging, my parents finally caved in! Welcome to your new home, Hershey!! #thoseeyes #aww",
        "whenever I'm feeling down, you are always by my side. <3 #pets #frens"
    ]),
    new PostData("arch", [
        "Sometimes, the most beautiful art is the art we make unintentionally. The contrast of positive and negative space. Geometric forms both smooth and flat. This is beauty. Taking commissions",
        "Took a detour, and boy am I glad I did #architecture #aesthetics",
        "this was a surprisingly dangerous picture to take lol, it's a long story",
        "Lines, Dots, and Curves. Alex Monterey, 2017"
    ]),
    new PostData("nature", [
        "just came back from my road trip with friends, here are some of the photos, love y'all #goodtimes",
        "Had such a solid vacay, just what I needed!",
        "God i wish i lived here. maybe when i'm not so busy haha",
        "Okay but what I want to know is what the first people to live around here and see this thought about it all. I mean look just how beautiful it is! #nationalparks #vacation"
    ]),
    new PostData("people", [
        "@cuddlefish cris convinced me to take some aesthetic shots",
        "When the lighting is just right #nofilter #jksomefilter",
        "too nice outside today to not get some photos lol",
        "Wanted to put the old camera to good use before it finally broke. Glad the results turned out great!!"
    ]),
    new PostData("tech", [
        "Improve your workflow today with Campana, the organizer, calendar, and planner rolled into one. #campana #organization",
        "Looking to learn about machine learning, artificial intelligence, and other skills? Try RoseAI for a one-month free trial, then get 20% off with code ROSEHIP.",
        "Working with data analysis has never been so easy. UnderFlow pairs cutting-edge mathematical analysis tools and visual simulation software.",
        "We're hiring! Apply for a position at Ardenum today to join a team of world-class scientists, analysts, and more! #ardenum #jobopportunity"
    ]),
]

const loopHelper = (val) => {
    return 400 + ((val + 1) % 100)
};

const modifyContacts = (contacts, postDatas) => {
    let avatarW = 430
    let avatarH = 430
    let postTypeIndex = 0

    contacts.forEach(contact => {
        contact.avatar = `https://placeimg.com/${avatarW}/${avatarH}/people`
        let curPostData = postDatas[postTypeIndex]

        contact.caption = curPostData.captions[curPostData.captionIndex]
        contact.image = curPostData.imageUrl

        curPostData.captionIndex = ((curPostData.captionIndex + 1) % 4)
        curPostData.imageH = loopHelper(curPostData.imageH)
        curPostData.imageW = loopHelper(curPostData.imageW)
        avatarW = loopHelper(avatarW)
        avatarH = loopHelper(avatarH)

        postDatas[postTypeIndex] = curPostData
        postTypeIndex++
    })

    return contacts
}

const Posts = ({ contacts }) => {

    //const [posts, updatePosts] = useState(contacts ? modifyContacts(contacts, postDatas) : initPosts)
    const [posts, updatePosts] = useState(initPosts)

    const ws = useRef(null);

    useEffect(() => {
        ws.current = new WebSocket("wss://instalert-dev.herokuapp.com/api/socket");
        ws.current.onopen = () => console.log("ws opened");
        ws.current.onclose = () => console.log("ws closed");

        return () => {
            ws.current.close();
        };
    }, []);

    useEffect(() => {
        if (!ws.current) return;

        ws.current.onmessage = e => {
            const message = e.data;
            if (message != 'ping') {
                toast(message + ' made a new post!');
            }
            console.log(message);
        };
    }, []);

    useEffect(() => {
        console.log(contacts)
        updatePosts(contacts ? modifyContacts(contacts, postDatas) : initPosts)
    }, [contacts])

    return (
        <div className="App">
            <Toaster />
            <section className="App-main">
                {posts.map(post => (
                    <Post {...post} />
                ))}
            </section>
        </div>
    )
};

export default Posts;