import React, { useEffect, useRef, useState } from "react";
import { Card, Button } from "react-bootstrap";
import { styled } from "@mui/material/styles";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import "../../App.css";
import Comment from "../Comment/Comment";
import CommentForm from "../Comment/CommentForm";

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

const Post = (props) => {
  const { title, text, userId, userName, postId, likes, date, filter, image } =
    props;
  const [expanded, setExpanded] = useState(false);
  const [commentList, setCommentList] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes.length);
  const [likeId, setLikeId] = useState(null);
  const [imageData, setImageData] = useState("");

  const isInitialMount = useRef(true);

  const handleExpandClick = () => {
    setExpanded(!expanded);
    refreshComments();
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    if (!isLiked) {
      saveLike();
      setLikeCount(likeCount + 1);
    } else {
      deleteLike();
      setLikeCount(likeCount - 1);
    }
  };

  const checkLikes = () => {
    const likeControl = likes.find(
      (like) => like.userId === localStorage.getItem("currentUser")
    );
    if (likeControl) {
      setLikeId(likeControl.id);
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  };

  useEffect(() => {
    if (!isInitialMount.current) {
      refreshComments();
    }
    isInitialMount.current = false;
  }, [commentList]);

  useEffect(() => {
    checkLikes();
  }, []);

  const refreshComments = () => {
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

  const saveLike = () => {
    fetch("/likes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("tokenKey"),
      },
      body: JSON.stringify({
        postId: postId,
        userId: localStorage.getItem("currentUser"),
      }),
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
  };

  const deleteLike = () => {
    fetch(`/likes/${likeId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("tokenKey"),
      },
    }).catch((err) => console.log(err));
  };

  useEffect(() => {
    fetch(`/photos?userId=${userId}`, {
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
  }, [userId]);
  return (
    <div className="card " style={{backgroundColor: '#e0efed'}}>
      <Card className="shadow-5">
        <Card.Header className="text-center" style={{backgroundColor: '#e0efed'}}>
          <div className="d-flex align-items-center">
            <a className="a">
              {imageData && (
                <img
                  src={`data:image/jpeg;base64,${imageData}`}
                  alt="User Profile"
                  className="mr-2 rounded-circle"
                  style={{ height: "40px", width: "40px", display: "inline-block", border:" 2px solid white", borderRadius: "50%" }}
                 
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
                  {userName}
                </span>
              </a>
            </a>
          </div>
        </Card.Header>

        <div className="aspect-ratio-container" style={{backgroundColor: '#fafafa'}}>
          <div className="aspect-ratio-content">
            <Card.Img
              variant="top"
              src={`data:image/jpeg;base64,${image}`}
              className="max-height-image"
              style={{
                border: "2px solid #ccc", // Çerçeve rengi
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)", // Gölge stil ve rengi
                backgroundColor: '#fafafa'
              }}
            />
          </div>
        </div>
        <Card.Body >
          <h5 className="mb-0">{title}</h5>
          <Card.Text>{text}</Card.Text>
        </Card.Body>

        <Card.Footer style={{backgroundColor: '#edfaf8'}}>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <Button
                variant={isLiked ? "danger" : "primary"}
                size="sm"
                onClick={handleLike}
              >
                <FavoriteIcon style={{ marginRight: "0.5rem" }} />
                {likeCount}
              </Button>
            </div>
            <ExpandMore
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <CommentIcon />
            </ExpandMore>
          </div>

          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <div className="container">
              {commentList.length > 0
                ? commentList.map((comment) => (
                    <Comment
                      key={comment.id}
                      userId={comment.userId}
                      userName={comment.userName}
                      text={comment.text}
                    />
                  ))
                : null}
              <CommentForm
                userId={localStorage.getItem("currentUser")}
                userName={localStorage.getItem("userName")}
                postId={postId}
                setCommentRefresh={refreshComments}
              />
            </div>
          </Collapse>
        </Card.Footer>
      </Card>
    </div>
  );
};

export default Post;
