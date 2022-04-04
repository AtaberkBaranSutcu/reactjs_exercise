import React, { useState, useEffect } from "react";
import Post from "../Post/Post";
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { makeStyles } from '@material-ui/core/styles';
import PostForm from "../Post/PostForm";

const useStyles = makeStyles((theme) => ({
    container: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#f0f5ff',
    }
}));

function Home() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [postList, setPostList] = useState([]);
    const classes = useStyles();

    const refreshPosts = () => {
        fetch("/posts")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setPostList(result);
                },
                (error) => {
                    //api call is finished
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }

    useEffect(() => {
        refreshPosts()
    }, [postList])

    if (error) {
        return <div> Error !!!</div>;
    } else if (!isLoaded) {
        return <div> Loading... </div>;
    } else {
        return (

            <React.Fragment>
                <CssBaseline />
                <div className={classes.container}>
                    <Box>
                        <PostForm userId={1} userName={"ddd"} refreshPosts={refreshPosts} ></PostForm>
                        {postList.map(post => (
                            <Post postId={post.id} userId={post.userId} userName={post.userName} title={post.title} text={post.text}></Post>
                        ))}
                    </Box>
                </div>
            </React.Fragment>



        );
    }

}

export default Home;