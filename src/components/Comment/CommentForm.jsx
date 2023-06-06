import React, { useState } from "react";
import { makeStyles } from "tss-react/mui";
import "../../App.css";

const useStyles = makeStyles((theme) => ({
    comment: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "flex-start",
        alignItems: "center",
    },
    small: {
        width: theme.spacing(4),
        height: theme.spacing(4),
    },
    link: {
        textDecoration: "none",
        boxShadow: "none",
        color: "white",
    },
}));

function CommentForm(props) {
    const { userId, userName, postId, setCommentRefresh } = props;
    const classes = useStyles();
    const [text, setText] = useState("");



    const saveComment = () => {
        fetch("/comments", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("tokenKey"),
            },
            body: JSON.stringify({
                postId: postId,
                userId: userId,
                text: text,
            })
        }
        )
    }

    const handleSubmit = (e) => {
        saveComment();
        setText("");
        setCommentRefresh();
    };

    const handleText = (value) => {
        setText(value);
    };

    return (
        <div >

            <input
                type="text"
                placeholder="Yorum Gönderin"
                value={text}
                onChange={(e) => handleText(e.target.value)}
                style={{width: '750px', marginLeft:'30px', height: '45px'}}
            ></input>
            <button type="button" className="button1" onClick={handleSubmit}>Gönder</button>

        </div>
    );
}

export default CommentForm;
