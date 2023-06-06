import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import { styled } from "@mui/material/styles";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import CommentIcon from "@mui/icons-material/Comment";
import "../../App.css";
import Comment from "../Comment/Comment";
import CloseIcon from "@mui/icons-material/Close";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const UserActivity = () => {
  const [isError, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [postList, setPostList] = useState([]);
  const [commentList, setCommentList] = useState([]);
  const [expanded, setExpanded] = useState({});
  const [imageData, setImageData] = useState("");
  const currentUser = parseInt(localStorage.getItem("currentUser"));

  useEffect(() => {
    const fetchPosts = () => {
      setIsLoading(true);
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

    const fetchComments = (postId) => {
      fetch(`/comments?postId=${postId}`)
        .then((res) => res.json())
        .then(
          (result) => {
            setCommentList(result);
          },
          (error) => {
            console.log(error);
          }
        );
    };

    const fetchUserPhoto = () => {
      fetch(`/photos?userId=${currentUser}`, {
        method: "GET",
        headers: {
          Authorization: localStorage.getItem("tokenKey"),
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setImageData(data.image);
        })
        .catch((error) => {
          console.error("Blob resmi alınamadı:", error);
        });
    };

    fetchPosts();
    fetchUserPhoto();
  }, [currentUser]);

  const handleExpandClick = (postId) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [postId]: !prevExpanded[postId],
    }));
    refreshComments(postId);
  };

  const refreshComments = (postId) => {
    fetch(`/comments?postId=${postId}`)
      .then((res) => res.json())
      .then(
        (result) => {
          setCommentList(result);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  const deletePost = (postId) => {
    fetch(`/posts/${postId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("tokenKey"),
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("An error occurred while deleting the post.");
        }
        // Remove the deleted post from the postList
        setPostList((prevPostList) =>
          prevPostList.filter((post) => post.id !== postId)
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteComment = (commentId) => {
    fetch(`/comments/${commentId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("tokenKey"),
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("An error occurred while deleting the comment.");
        }
        setCommentList((prevCommentList) =>
          prevCommentList.filter((comment) => comment.id !== commentId)
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error!!!</div>;
  }

  return (
    <div>
      {postList
        .filter((post) => post.userId === currentUser)
        .slice(0)
        .reverse()
        .map((post) => (
          <div className="card" key={post.id}>
            <Card className="shadow-5">
              <Card.Header className="text-center">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center">
                    {imageData && (
                      <img
                        src={`data:image/jpeg;base64,${imageData}`}
                        alt="User Profile"
                        className="mr-2 rounded-circle"
                        style={{ height: "40px", width: "40px" }}
                      />
                    )}
                    <a className="a" href={"/users/"}>
                      <span
                        className="font-weight-bold"
                        style={{
                          paddingLeft: "10px",
                          fontSize: "15px",
                          color: "black",
                        }}
                      >
                        {post.userName}
                      </span>
                    </a>
                  </div>
                  <IconButton
                    aria-label="delete"
                    className="delete-icon"
                    onClick={() => deletePost(post.id)}
                    style={{ color: "red" }}
                  >
                    <CloseIcon />
                  </IconButton>
                </div>
              </Card.Header>
              <div className="aspect-ratio-container">
                <div className="aspect-ratio-content">
                  <Card.Img
                    variant="top"
                    src={`data:image/jpeg;base64,${post.imageData}`}
                    className="max-height-image"
                  />
                </div>
              </div>
              <Card.Body>
                <h5 className="mb-0">{post.title}</h5>
                <Card.Text>{post.text}</Card.Text>
              </Card.Body>
              <Card.Footer>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <ExpandMore
                    onClick={() => handleExpandClick(post.id)}
                    aria-expanded={expanded[post.id]}
                    aria-label="show more"
                  >
                    <CommentIcon />
                  </ExpandMore>
                </div>
                <Collapse in={expanded[post.id]} timeout="auto" unmountOnExit>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    {commentList.length > 0 ? (
                      commentList.map((comment) => (
                        <div
                          key={comment.id}
                          style={{
                            display: "flex",
                            alignItems: "center",
                          }}
                          
                        >
                          <Comment
                            userId={comment.userId}
                            userName={comment.userName}
                            text={comment.text}
                          />
                          <IconButton
                            aria-label="delete"
                            className="delete-icon"
                            onClick={() => deleteComment(comment.id)}
                            style={{ color: "red", marginLeft: "10px" }}
                          >
                            <CloseIcon />
                          </IconButton>
                        </div>
                      ))
                    ) : (
                      <div>Yorum Yok</div>
                    )}
                  </div>
                </Collapse>
              </Card.Footer>
            </Card>
          </div>
        ))}
    </div>
  );
};

export default UserActivity;
