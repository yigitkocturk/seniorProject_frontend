import React, { useEffect, useRef, useState } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CommentIcon from "@mui/icons-material/Comment";
import "../../App.css";
import { Container } from "@mui/material";
import Comment from "../Comment/Comment";
import { makeStyles } from "tss-react/mui";
import CommentForm from "../Comment/CommentForm";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 800,
    textAlign: "left",
    margin: 20,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  avatar: {
    background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
  },
  link: {
    textDecoration: "none",
    boxShadow: "none",
    color: "white",
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
  const [imageData, setImageData] = useState(image);

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
    <div className="container mb-2 ">
      <Card className="shadow-5">
        <CardHeader
          avatar={
            <a className="a" href={"/users/" + userId}>
              <Avatar sx={{ bgcolor: "aliceblue[500]" }} aria-label="recipe">
                {userName.charAt(0).toUpperCase()}
              </Avatar>
              {userName}
            </a>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={title}
        />

        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {image && (
              <img
                src={`data:image/jpeg;base64,${image}`}
                alt="Blob Resim"
                style={{ height: "250px", width: "250px" }}
              />
            )}
            <br />
            <br />
            Filter = {filter}
            <br />
            <br />
            {text}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton onClick={handleLike} aria-label="add to favorites">
            <FavoriteIcon style={isLiked ? { color: "red" } : null} />
          </IconButton>
          {likeCount}
          <ExpandMore
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <CommentIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Container fixed className={classes.container}>
            {error
              ? "error"
              : isLoaded
              ? commentList.map((comment) => (
                  <Comment
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
      </Card>
    </div>
  );
}
