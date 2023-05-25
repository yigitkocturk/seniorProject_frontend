import React, { useState, useEffect } from "react";
import Post from "../Post/Post";
import "../../App.css";

const PostList = ({ filter }) => {
  const [isError, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [postList, setPostList] = useState([]);

  const refreshPosts = () => {
    fetch("/posts")
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoading(false);
          setPostList(result);
        },
        (error) => {
          console.log(error);
          setIsLoading(false);
          setError(error);
        }
      );
  };

  useEffect(() => {
    refreshPosts();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error!!!</div>;
  }

  return (
    <div>
      {postList
        .filter((post) => post.filter === filter || filter === "")
        .slice(0)
        .reverse()
        .map((post) => (
          <Post
            likes={post.postLikes}
            postId={post.id}
            key={post.id}
            userId={post.userId}
            userName={post.userName}
            title={post.title}
            text={post.text}
            date={post.date}
            filter={post.filter}
            image={post.imageData}
          />
        ))}
    </div>
  );
};

export default PostList;
