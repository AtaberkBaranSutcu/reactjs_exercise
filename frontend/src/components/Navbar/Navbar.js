import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textAlign: "left"
  },
  link: {
    textDecoration: "none",
    boxShadow: "none",
    color: "white"
  }
}));

function Navbar() {
  let userId = 5;
  const classes = useStyles();
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} className={classes.title}>
              <Link className={classes.link} to="/">Home</Link>
            </Typography>
            <Link className={classes.link} to={{ pathname: '/users/' + userId }}>User</Link>
          </Toolbar>
        </AppBar>
      </Box>


    </div>
  );
}

export default Navbar;