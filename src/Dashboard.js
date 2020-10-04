import React, { useState, useEffect } from "react";
import useStyles from "./styles";
import {
  Button,
  TextField,
  Paper,
  Container,
  IconButton,
  Grid,
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import IconSend from "@material-ui/icons/Send";
import io from "socket.io-client";
import MessageList from "./MessageList";

const socket = io.connect("http://localhost:4001");

export default function Dashboard() {
  const classes = useStyles();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [author, setAuthor] = useState("");

  function handleNewMessage(newMessage) {
    const messageDate = new Date();

    setMessages((prevState) => [
      ...prevState,
      {
        ...newMessage,
        date: messageDate.toLocaleTimeString(),
      },
    ]);
  }

  useEffect(() => {
    socket.on("broad msg", (msg) => {
      handleNewMessage(msg);
    });
    socket.on("connect_error", () => {
      handleNewMessage({
        author: "Sistema",
        msg: "Ocorreu um erro ao se conectar com o serviço de Chat",
      });
    });

    return () => {
      socket.removeAllListeners();
    };
  }, []);

  function handleChangeAuthor(evt) {
    setAuthor(evt.target.value);
  }
  function handleChangeMessage(evt) {
    setMessage(evt.target.value);
  }

  function handleClick() {
    setMessage("");
    setAuthor("");
    socket.emit("send msg", {
      author,
      msg: message,
    });
  }

  return (
    <Paper elevation={0} className={classes.root}>
      <Container className={classes.container}>
        <Typography variant="h5" className={classes.title}>
          React Chat
        </Typography>

        <MessageList messages={messages} />

        <div className={classes.messageInputContainer}>
          <Grid container spacing={2}>
            <Grid item xs={10} sm={3}>
              <TextField
                fullWidth
                variant="standard"
                label="Seu Nome"
                placeholder="Insira seu nome aqui..."
                onChange={handleChangeAuthor}
                className={classes.input}
              />
            </Grid>
            <Grid item xs={10} sm={8}>
              <TextField
                fullWidth
                variant="standard"
                multiline
                label="Sua Mensagem"
                placeholder="Insira sua mensagem aqui..."
                onChange={handleChangeMessage}
                className={classes.input}
              />
            </Grid>
            <Grid item xs={2} sm={1} className={classes.sendMessageButton}>
              <IconButton
                onClick={handleClick}
                component="span"
                color="primary"
              >
                <IconSend />
              </IconButton>
            </Grid>
          </Grid>
        </div>
      </Container>
    </Paper>
  );
}
