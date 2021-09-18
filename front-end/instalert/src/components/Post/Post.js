import React, { Component } from "react";
import "./Post.css";
import meat from "../../images/meatball_menu.png";

class Post extends Component {
    constructor(props){
        super(props);
    }
    render() {
        const nickname = this.props.nickname;
        const avatar = this.props.avatar;
        const image = this.props.image;
        const caption = this.props.caption;

        return <article className="Post" ref="Post">
            <header>
                <div className="Post-user">
                    <div className="Post-user-avatar">
                        <img src={avatar} />
                    </div>
                    <div className="Post-user-nickname">
                        <span>{nickname}</span>
                    </div>
                    <div className="Post-user-meatball">
                        <img className="Meatball-menu" src={meat}/>
                    </div>
                </div>
            </header>
            <div className="Post-image">
                <div className="Post-image-bg">
                    <img src={image} />
                </div>
            </div>
            <div className="Post-interactions">
            </div>
            <div className="Post-caption">
                <strong>{nickname}</strong> {caption}
            </div>
        </article>;
    }
}
export default Post;