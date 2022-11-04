import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { createTheme } from "@material-ui/core/styles";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  height: 420,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const theme = createTheme();

theme.spacing(2);

export default function Navbar() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [userName, setUserName] = React.useState("");
  const [userEmail, setUserEmail] = React.useState("");
  const [userPhone, setUserPhone] = React.useState("");
  const [userAddress, setUserAddress] = React.useState("");
  const [userMessage, setUserMessage] = React.useState("");

  const getUserName = (event) => {
    setUserName(event.target.value);
  };
  const getUserEmail = (event) => {
    setUserEmail(event.target.value);
  };
  const getUserPhone = (event) => {
    setUserPhone(event.target.value);
  };
  const getUserAddress = (event) => {
    setUserAddress(event.target.value);
  };
  const getUserMessage = (event) => {
    setUserMessage(event.target.value);
  };

  const postData = async (e) => {
    e.preventDefault();
    if (userName && userEmail && userPhone && userAddress && userMessage) {
      const res = await fetch(
        "https://react-form-7735-default-rtdb.firebaseio.com/react-form.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userName,
            userEmail,
            userPhone,
            userAddress,
            userMessage,
          }),
        }
      );

      if (res) {
        setUserName("");
        setUserEmail("");
        setUserPhone("");
        setUserAddress("");
        setUserMessage("");

        alert("Data Stored Successfully");
      }
    }
    else{
      alert('Please fill all the data');
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ background: "#2E3B55" }}>
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
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            React Form
          </Typography>
          <Button onClick={handleOpen} color="inherit">
            Contact
          </Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style} method="POST">
              <Typography id="modal-modal-title" variant="h6" component="h">
                <h1>Contact Us</h1>
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <TextField
                  required
                  id="standard-basic"
                  label="Name"
                  variant="standard"
                  style={{ margin: theme.spacing("auto", 10, "auto", 0) }}
                  value={userName}
                  onChange={getUserName}
                />
                <TextField
                  required
                  id="standard-basic"
                  label="Email"
                  variant="standard"
                  style={{ margin: theme.spacing("auto", 5, "auto", 10) }}
                  value={userEmail}
                  onChange={getUserEmail}
                />
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <TextField
                  required
                  id="standard-basic"
                  label="Mobile"
                  variant="standard"
                  style={{ margin: theme.spacing("auto", 10, "auto", 0) }}
                  value={userPhone}
                  onChange={getUserPhone}
                />
                <TextField
                  required
                  id="standard-basic"
                  label="Address"
                  variant="standard"
                  style={{ margin: theme.spacing("auto", 5, "auto", 10) }}
                  value={userAddress}
                  onChange={getUserAddress}
                />
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <TextField
                  id="outlined-multiline-static"
                  label="Message"
                  multiline
                  rows={4}
                  style={{ width: 560, margin: theme.spacing(2, "auto") }}
                  value={userMessage}
                  onChange={getUserMessage}
                />
                <Button
                  variant="contained"
                  color="success"
                  style={{ borderRadius: 20 }}
                  onClick={postData}
                >
                  Submit
                </Button>
              </Typography>
            </Box>
          </Modal>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
