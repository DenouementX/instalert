import React, {useRef} from "react";
import "./Post.css";
import meat from "../../images/meatball_menu.png";
import sprites from "../../images/sprite.png";
import share from "../../images/share-35-35.png";

function Post({username, avatar, image, caption, doPost}) {

    const postRef = useRef();

    let clickHoldTimer = null;

    const handleMouseDown = () => {
        clickHoldTimer = setTimeout(() => {
            doPost(2)
        }, 3000);
    }

    const handleMouseUp = () => {
        clearTimeout(clickHoldTimer);
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
                    <img src={image} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} alt="Post"/>
                </div>
            </div>
            <div className="Post-interactions">
                <div className="Post-interactions-left">
                    <img src={sprites} onClick={() => doPost(0)} alt="Like" style={{
                        objectPosition: "-650px -660px"}}/>
                    <img src={sprites} alt="Comment" style={{
                        objectPosition: "-515px -352px"}}/>
                    <img src={share} alt="Share" style={{
                        transform: "scale(.85)"}}/>
                </div>
                <div className="Post-interactions-center" />
                <div className="Post-interactions-right" onClick={() => doPost(1)} >
                    <div className="Post-interactions-button">
                        <img src={sprites} alt="Comment" style={{
                            objectPosition: "-300px -711px"}}/>
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