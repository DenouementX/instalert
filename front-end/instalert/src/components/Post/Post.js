import React, {useRef} from "react";
import "./Post.css";
import meat from "../../images/meatball_menu.png";
import sprites from "../../images/sprite.png";
import share from "../../images/share-35-35.png";

function Post({username, avatar, image, caption, doPost}) {

    const postRef = useRef();

    const likeOnClick = () => {
        doPost(0);
        document.querySelector('#heartInteraction').classList.add('likedHeart');
    }

    const commentOnClick = () => {
        doPost(1);
        document.querySelector('#commentInteraction').classList.add('commented')
    }

    const bookmarkOnClick = () => {
        doPost(2);
        document.querySelector('#bookmarkInteraction').classList.add('bookmarked');
    }

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
                    <img className="heart" src={sprites} onClick={likeOnClick} alt="Like" id="heartInteraction" />
                    <img className="comment" src={sprites} alt="Comment" onClick={commentOnClick} id="commentInteraction"/>
                    <img src={share} alt="Share" style={{
                        transform: "scale(.85)"}}/>
                </div>
                <div className="Post-interactions-center" />
                <div className="Post-interactions-right">
                    <div className="Post-interactions-button">
                        <img className="bookmark" src={sprites} alt="Bookmark" onClick={bookmarkOnClick} id="bookmarkInteraction" />
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