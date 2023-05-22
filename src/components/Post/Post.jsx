import React, { useEffect, useRef, useState } from "react";
import { Container, Card, Button } from "react-bootstrap";
import { styled } from "@mui/material/styles";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CommentIcon from "@mui/icons-material/Comment";
import "../../App.css";
import Comment from "../Comment/Comment";
import { makeStyles } from "tss-react/mui";
import CommentForm from "../Comment/CommentForm";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 800,
    textAlign: "left",
    margin: 20,
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
}));

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

export default function Post(props) {
  const { title, text, userId, userName, postId, likes, date, filter, image } =
    props;
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [commentList, setCommentList] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const isInitialMount = useRef(true);
  const [likeCount, setLikeCount] = useState(likes.length);
  const [likeId, setLikeId] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [imageData2, setImageData2] = useState(image);

  let disabled = localStorage.getItem("currentUser") == null ? true : false;

  const setCommentRefresh = () => {
    setRefresh(true);
  };

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
    var likeControl = likes.find(
      (like) => "" + like.userId === localStorage.getItem("currentUser")
    );
    if (likeControl != null) {
      setLikeId(likeControl.id);
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  };

  useEffect(() => {
    if (isInitialMount.current) isInitialMount.current = false;
    else refreshComments();
  }, [commentList]);

  const fetchBlobImage = (userId) => {
    fetch(`/photos?userId=${userId}`, {
      method: 'GET',
      headers: {
        Authorization: localStorage.getItem('tokenKey'),
      },
    })
      .then((response) => response.json())  // response.blob() yerine response.json()
      .then((data) => {
        setImageData2(data.image);
      })
      .catch((error) => {
        console.error('Blob resmi alınamadı:', error);
      });
  };

  useEffect(() => {
    fetchBlobImage(userId);
  }, [userId]);

  useEffect(() => {
    checkLikes();
  }, []);

  const refreshComments = () => {
    fetch("/comments?postId=" + postId)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setCommentList(result);
        },
        (error) => {
          console.log(error);
          setIsLoaded(true);
          setError(error);
        }
      );
    setRefresh(false);
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
    fetch("/likes/" + likeId, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("tokenKey"),
      },
    }).catch((err) => console.log(err));
  };

  return (
    <div className="container mb-2">
      <Card className="shadow-5">
        <Card.Header className="text-center">
          <div className="d-flex align-items-center">
            <a className="a" href={"/users/" + userId}>
              <img
                src={`data:image/jpeg;base64,${imageData2}`}
                alt="User Profile"
                className="mr-2 rounded-circle"
                style={{ height: '40px', width: '40px' }}
              />
              <span className="font-weight-bold ml-2">{userName}</span>
            </a>
          </div>
          <h5 className="mb-0">{title}</h5>
        </Card.Header>

        <Card.Img variant="top" src={`data:image/jpeg;base64,${image}`} style={{ maxHeight: "350px" }} />
        <Card.Body>
          <Card.Text className="mb-0">
            <span className="font-weight-bold">Filter:</span> {filter}
          </Card.Text>
          <Card.Text>{text}</Card.Text>
        </Card.Body>
        <Card.Footer>
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
            <Container>
              {error
                ? "error"
                : isLoaded
                  ? commentList.map((comment) => (
                    <Comment
                      key={comment.id}
                      userId={comment.userId}
                      userName={comment.userName}
                      text={comment.text}
                    ></Comment>
                  ))
                  : "Loading"}
              {disabled ? (
                ""
              ) : (
                <CommentForm
                  userId={localStorage.getItem("currentUser")}
                  userName={localStorage.getItem("userName")}
                  postId={postId}
                  setCommentRefresh={setCommentRefresh}
                ></CommentForm>
              )}
            </Container>
          </Collapse>
        </Card.Footer>
      </Card>
    </div>
  );
}
