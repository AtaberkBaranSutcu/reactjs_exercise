import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import { makeStyles } from '@material-ui/core/styles';
import { InputAdornment, OutlinedInput } from "@mui/material";
import Button from '@mui/material/Button';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
function Alert(props) {

    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: 800,
    textAlign: "left",
    margin: 20
  },
  media: {
    height: 20,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  avatar: {
    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
  },
  link: {
    textDecoration: "none",
    boxShadow: "none",
    color: "white"
  }
}));

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

function PostForm(props) {
  const {userId, userName, refreshPosts } = props;
  const classes = useStyles();  
  const [text,setText] = useState("");
  const [title,setTitle] = useState("");
  const [isSent,setIsSent] = useState(false);

  const savePost = () => {
      fetch("/posts",
      {
        method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization" : localStorage.getItem("tokenKey"),
      },
      body: JSON.stringify({
        title: title, 
        userId : userId,
        text : text,
      }),
  })
  .then((res) => res.json())
  .catch((err) => console.log(err))
  }

  const handleSubmit = () => {
    savePost();
    setIsSent(true);
    setTitle("");
    setText("");
    refreshPosts();
  };

  const handleTitle = (value) => {
    setTitle(value);
    setIsSent(false);
  }

  const handleText = (value) => {
      setText(value);
      setIsSent(false);
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setIsSent(false);
  };

  return (
    <div className="postContainer">
        <Snackbar open={isSent} autoHideDuration={1200} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            Your post is sent!
        </Alert>
        </Snackbar>
      <br></br>
      <Card className={classes.root}>
        <CardHeader sx={{ textAlign: "left" }}
          avatar={
            <Link className={classes.link} to={{ pathname: '/users/' + userId }}>
              <Avatar aria-label="recipe" className={classes.avatar}>
                {userName.charAt(0).toUpperCase()}
              </Avatar>
            </Link>
          }

          title={<OutlinedInput
          id="outlined-adorment-amount"
          multiline
          placeholder="Title"
          inputProps={{maxLength:25}}
          fullWidth
          value={title}
          onChange={(i) => handleTitle(i.target.value)}
          >
          </OutlinedInput>}
        />

        <CardContent>
          <Typography variant="body2" color="text.secondary">
          <OutlinedInput
          id="outlined-adorment-amount"
          multiline
          placeholder="Text"
          inputProps={{maxLength:250}}
          fullWidth
          value={text}
          onChange={(i) => handleText(i.target.value)}
          endAdornment = {
            <InputAdornment position="end">
              <Button
              variant = "contained"
              style={{background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
              color: 'white'}}
              onClick={handleSubmit}
              >Post
              </Button>
            </InputAdornment>
        }
          >
          </OutlinedInput>
          </Typography>
        </CardContent>
        
        
      </Card>
      <br></br>
    </div>
  );
}

export default PostForm;