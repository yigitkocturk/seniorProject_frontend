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
                className=" input2"
                type="text"
                placeholder="text"
                value={text}
                onChange={(e) => handleText(e.target.value)}
            ></input>
            <button type="button" className="button1" onClick={handleSubmit}>Comment</button>

        </div>
    );
}

export default CommentForm;
