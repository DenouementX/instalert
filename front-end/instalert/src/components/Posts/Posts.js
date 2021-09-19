import React, { useEffect, useState } from 'react';
import './Posts.css';
import Post from '../Post/Post';


const initPosts = [
    {
        nickname: "CatLover293",
        avatar: "http://placekitten.com/200/300",
        caption: "OMG LOOK AT HIM HE IS SO CUTE!!!",
        image: "http://placekitten.com/g/200/200"
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
    this.captionIndex = 0
    this.captions = captions
    this.imageH = 430
    this.imageW = 430
    this.imageUrl = `https://placeimg.com/${this.imageW}/${this.imageH}/${this.type}`
}

const postDatas = [
    new PostData("animals", [
        "Taking name suggestions in the comments.",
        "look at how cute she is!",
        "Hi, I'm Karla! Nice to meet you!",
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
        "just came back from my road trip with frends, here are some of the photos, love y'all #goodtimes",
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

const modifyContacts = (contacts, postDatas) => {
    let avatarW = 430
    let avatarH = 430
    let captionsIndex = 0

    contacts.forEach(contact => {
        contact.avatar = `https://placeimg.com/${avatarW}/${avatarH}/people`
        let curPostData = postDatas[captionsIndex]

        contact.caption = curPostData.captions[curPostData.captionIndex]
        contact.image = curPostData.imageUrl

        curPostData.captionIndex++
        curPostData.imageH++
        curPostData.imageW++

        postDatas[captionsIndex] = curPostData

        avatarW++
        avatarH++
        captionsIndex++
    })

    return contacts
}

const Posts = ({ contacts }) => {

    //const [posts, updatePosts] = useState(contacts ? modifyContacts(contacts, postDatas) : initPosts)
    const [posts, updatePosts] = useState(initPosts)

    useEffect(() => {
        console.log(contacts)
        updatePosts(contacts ? modifyContacts(contacts, postDatas) : initPosts)
    }, [contacts])

    return (
        <div className="App">
            <section className="App-main">
                {posts.map(post => (
                    <Post {...post} />
                ))}
            </section>
        </div>
    )
};

export default Posts;