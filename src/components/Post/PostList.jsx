import React, { useState, useEffect } from "react";
import Post from "../Post/Post";
import "../../App.css";

const PostList = (props) => {
    const [isError, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [postList, setPostList] = useState([]);
    const { postId } = props;
    const [imageData, setImageData] = useState(null);
    const [filter, setFilter] = useState("");


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
    const fetchBlobImage = () => {
        fetch("/post?postId=" + postId, {
            method: 'GET',
            headers: {
                Authorization: localStorage.getItem('tokenKey'),
            }
        })
            .then(response => response.blob())
            .then(blob => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    const base64data = reader.result;
                    setImageData(base64data);
                };
                reader.readAsDataURL(blob);
            })
            .catch(error => {
                console.error('Blob resmi alınamadı:', error);
            });
    };

    useEffect(() => {
        fetchBlobImage();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div> Error!!!</div>;
    }

    return (
        <div >
            {postList
                .filter((post) => post.filter === props.filter || props.filter === "")
                .slice(0)
                .reverse()
                .map((posts) => (
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
                        image={posts.imageData}
                    />
                ))}
        </div>
    );
};

export default PostList;