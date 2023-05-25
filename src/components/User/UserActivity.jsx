import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import "../../App.css";

function UserActivity(props) {
    const [posts, setPosts] = useState([]);
    const userId = JSON.parse(localStorage.getItem("currentUser"));
    const [user, setUser] = useState();
  
    useEffect(() => {
      const getUser = () => {
        fetch("/users/" + userId, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("tokenKey"),
          },
        })
          .then((res) => res.json())
          .then(
            (result) => {
              console.log(result);
              setUser(result);
            },
            (error) => {
              console.log(error);
            }
          );
      };
  
      getUser();
    }, [userId]);
  
    useEffect(() => {
      fetch(`/posts?userId=${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("tokenKey"),
        },
      })
        .then((res) => res.json())
        .then((data) => setPosts(data));
    }, [userId]);
  
    return (
      <div>
        {posts.map((post) => (
          <div className="container mb-2" key={post.id}>
            <Card className="shadow-5">
                <br/>
            <h5 className="mb-0">{post.title}</h5><br/>
              <CardMedia
                component="img"
                src={`data:image/jpeg;base64,${post.imageData}`}
                style={{ maxHeight: "350px" }}
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  Filter = {post.filter}
                  <br />
                  <br />
                  {post.text}
                </Typography>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    );
  }
  
  export default UserActivity;
