import React from "react";
import { makeStyles } from "tss-react/mui";
import {
  CardContent,
  InputAdornment,
  OutlinedInput,
  Avatar,
  Link,
} from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";

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

function Comment(props) {
  const { text, userId, userName } = props;
  const [imageData, setImageData] = useState('');
  const classes = useStyles();

  useEffect(() => {
    fetch(`/photos?userId=${userId}`, {
      method: 'GET',
      headers: {
        Authorization: localStorage.getItem('tokenKey'),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setImageData(data.image);
      })
      .catch((error) => {
        console.error('Blob resmi alınamadı:', error);
      });
  }, [userId]);

  return (
    <CardContent className={classes.comment}>
      <OutlinedInput
        disabled
        id="outlined-adornment-amount"
        multiline
        inputProps={{ maxLength: 25 }}
        fullWidth
        value={text}
        startAdornment={
          <InputAdornment position="start">
            <Link
              className={classes.link}
              to={{ pathname: "/users/" + userId }}
            >
               {imageData && (
              <img
                src={`data:image/jpeg;base64,${imageData}`}
                alt="User Profile"
                className="mr-2 rounded-circle"
                style={{ height: "40px", width: "40px" }}
              />
            )}
            {userName}
            </Link>
          </InputAdornment>
        }
        style={{ color: "black", backgroundColor: "white" }}
      ></OutlinedInput>
    </CardContent>
  );
}

export default Comment;
