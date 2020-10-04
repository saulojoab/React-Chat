import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2, 0),
    flex: 1,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },
  container: {
    display: "flex !important",
    flexDirection: "column",
    flex: 1,
    overflow: "hidden",
  },

  title: {
    borderBottom: `1px solid ${theme.palette.grey[400]}`,
    paddingBottom: theme.spacing(2),
  },

  chatContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    textAlign: "left",
    paddingTop: theme.spacing(2),
    overflowY: "auto",
  },

  messageInputContainer: {
    paddingTop: theme.spacing(1),
    borderTop: `1px solid ${theme.palette.grey[400]}`,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    marginRight: theme.spacing(2),
  },

  sendMessageButton: {
    alignSelf: "flex-end",
  },

  messageContainer: {
    display: "flex",
    flexDirection: "row",
  },
  messageDate: {
    color: theme.palette.grey[600],
    marginRight: theme.spacing(1),
  },
  messageContent: {
    flex: 1,
    margin: theme.spacing(0, 1),
    color: theme.palette.grey[900],
  },
}));

export default useStyles;
