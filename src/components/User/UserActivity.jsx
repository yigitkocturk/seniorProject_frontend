import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import "../../App.css";

function UserActivity(props) {

    const [posts, setPosts] = useState([]);
    const userId = JSON.parse(localStorage.getItem("currentUser"));
    const [user, setUser] = useState();

    const getUser = () => {
        fetch("/users/" + userId, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("tokenKey"),
            }
        })
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                    setUser(result);
                },
                (error) => {
                    console.log(error)
                }
            )
    }

    useEffect(() => {
        getUser()
    }, [])

    useEffect(() => {
        fetch(`/posts?userId=${userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("tokenKey"),
            },
        })
            .then((res) => res.json())
            .then((data) => setPosts(data));
    }, []);

    return (
        <div>
            {posts.map((post) => (
                <div className="container mb-2 ">
                    <Card className="shadow-5" >
                        <CardHeader
                            avatar={
                                <a className="a" href={"/users/" + userId}>
                                    <Avatar sx={{ bgcolor: "aliceblue[500]" }} aria-label="recipe">
                                        {user.userName.charAt(0).toUpperCase()}
                                    </Avatar>
                                    {user.userName}
                                </a>
                            }
                            action={
                                <IconButton aria-label="settings">
                                    <MoreVertIcon />
                                </IconButton>
                            }
                            title={post.title}

                        />

                        <CardContent>
                            <Typography variant="body2" color="text.secondary">
                                Filter = {post.filter}<br /><br />
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
