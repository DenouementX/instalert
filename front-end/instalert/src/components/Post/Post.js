import React, {useRef, useState} from "react";
import "./Post.css";
import meat from "../../images/meatball_menu.png";
import sprites from "../../images/sprite.png";
import share from "../../images/share-35-35.png";

function Post({username, avatar, image, caption, doPost}) {

    const postRef = useRef();

    const [markedInteractions, mark] = useState([]);

    const normalClassName = [
        'heart',
        'comment',
        'bookmark'
    ]

    const markedClassName = [
        'likedHeart',
        'commented',
        'bookmarked'
    ]

    const getClassName = (i) => `${normalClassName[i]} ${markedInteractions.includes(i) ? markedClassName[i] : ''}`

    const markOnClick = (i) => () => {
        doPost(i)
        mark(marked => {
            if(!marked.includes(i)) {
                return marked.concat(i);
            }
            return marked;
        });
    }

    const likeOnClick = markOnClick(0)

    const commentOnClick = markOnClick(1)

    const bookmarkOnClick = markOnClick(2)

    return (
        <article className="Post" ref={postRef}>
            <header>
                <div className="Post-user">
                    <div className="Post-user-avatar">
                        <img src={avatar}  alt="avatar"/>
                    </div>
                    <div className="Post-user-nickname">
                        <span>{username}</span>
                    </div>
                    <div className="Post-user-meatball">
                        <img className="Meatball-menu" src={meat} alt="menu"/>
                    </div>
                </div>
            </header>
            <div className="Post-image">
                <div className="Post-image-bg">
                    <img src={image} alt="Post"/>
                </div>
            </div>
            <div className="Post-interactions">
                <div className="Post-interactions-left" id="changeHeart">
                    <img className={getClassName(0)} src={sprites} onClick={likeOnClick} alt="Like" />
                    <img className={getClassName(1)} src={sprites} alt="Comment" onClick={commentOnClick} id="commentInteraction"/>
                    <img src={share} alt="Share" style={{
                        transform: "scale(.85)"}}/>
                </div>
                <div className="Post-interactions-center" />
                <div className="Post-interactions-right">
                    <div className="Post-interactions-button">
                        <img className={getClassName(2)} src={sprites} alt="Bookmark" onClick={bookmarkOnClick} id="bookmarkInteraction" />
                    </div>
                </div>
            </div>
            <div className="Post-caption">
                <div>
                    <strong>{username}</strong> {caption}
                </div>
            </div>
        </article>
    )
}
export default Post;