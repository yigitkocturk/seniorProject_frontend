import React, { useState, useEffect } from "react";
import Post from "../Post/Post";
import "../../App.css";

const PostList = (props) => {
    const [isError, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [postList, setPostList] = useState([]);


    const refreshPosts = () => {
        fetch("/posts")
        .then(res => res.json())
        .then(
            (result) => {
                setIsLoading(false);
                setPostList(result)
            },
            (error) => {
                console.log(error)
                setIsLoading(false);
                setError(error);
            }
        )
    }

    useEffect(() => {
        refreshPosts()
    }, [postList])

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div> Error!!!</div>;
    }

    return (
        <div >
            {postList.slice(0).reverse().map((posts) => (
                <Post
                    likes={posts.postLikes}
                    postId={posts.id}
                    key={posts.id}
                    userId={posts.userId}
                    userName={posts.userName}
                    title={posts.title}
                    text={posts.text}
                    date={posts.date}
                    filter={posts.filter}
                />
            ))}
        </div>
    );
};

export default PostList;