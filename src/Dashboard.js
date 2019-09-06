import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Button, TextField, Paper} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import socket from 'socket.io-client';
import { green } from '@material-ui/core/colors';

const sockete = socket.connect("http://localhost:4001");

const useStyles = makeStyles(theme => ({
    root: {
      padding: theme.spacing(3, 2),
      margin: 50,
      textAlign: 'center'
    },
    flex: {
        display: 'flex',
        flexDirection: 'column'
    },
    topicsWindow: {
        width: '30%',
        height: 300,
        borderRight: '1px solid grey'
    },
    chatWindow: {
        width: '70%',
        maxHeight: 300,
        backgroundColor: green
    },
    chatBox: {
        width: '85%'
    },
    button: {
        width: '15%'
    },
  }));

  function handleClick(author, msg){
      let obj = {
          author: author,
          msg: msg
      }

    sockete.emit("send msg", obj);
  }

export default function Dashboard() {
    const classes = useStyles();
    const [msgObj, setMsg] = useState(["ok test"]);
    const [msg, setMessage] = useState();
    const [author, setAuthor] = useState();

    sockete.on("broad msg", (msg) => {
        setMsg(msg);
    })

    return(
        <div>
            <Paper className={classes.root}>
                <Typography variant="h5" component="h3">
                React Chat
                </Typography>
                <Typography component="p">
                Topic Placeholder<br/>
                <TextField 
                    placeholder="Insira o nome do autor..."
                    onChange={(evt) => setAuthor(evt.target.value)}
                />
                </Typography>

                <div className={classes.flex}>
                    <div className={classes.chatWindow}>
                        {msgObj.map((i) => {
                            return <div><strong>{i.author}</strong>{i.msg}<br/></div>
                        })}
                    </div>
                </div>
            </Paper>
            <TextField 
            placeholder="Insira sua mensagem aqui..."
            onChange={(evt) => setMessage(evt.target.value)}
            />
            <Button onClick={() => handleClick(author, msg)}>ok</Button>
        </div>
    )
}