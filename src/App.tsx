import React, { useState } from "react";
import Contacts from "./app/Contacts";
import { useAppDispatch, useAppSelector } from "./features/hooks";
import { getUser, logOut } from "./features/userSlice";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

export default function App() {
  const { user } = useAppSelector((state) => state.userReducer);
  const [error, setError] = useState(false);
  const dispatch = useAppDispatch();

  let arg = { username: "", password: "" };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(getUser(arg));
    console.log(user.length);
    setTimeout(() => {
      if (user.length == 0) {
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 3000);
      }
    }, 500);
  };
  const displayError = () => {};
  const handleLogOut = () => {
    dispatch(logOut());
  };
  console.log(user);

  return (
    <div className="">
      {user.length > 0 ? (
        <div>
          <Button
            onClick={(e) => {
              e.preventDefault();
              handleLogOut();
            }}
          >
            Log out
          </Button>
          <Contacts userId={user[0].id} />
        </div>
      ) : (
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoFocus
                onChange={(e) => (arg.username = e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={(e) => (arg.password = e.target.value)}
              />
              {error ? "wrong name/password" : ""}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
            </Box>
          </Box>
        </Container>
      )}
      ;
    </div>
    // <div>
    //   {user.length > 0 ? (
    //     <Contacts userId={user[0].id} />
    //   ) : (
    //     <form onSubmit={handleSubmit}>
    //       <input
    //         type="text"
    //         onChange={(e) => (arg.username = e.target.value)}
    //       />
    //       <input
    //         type="password"
    //         onChange={(e) => (arg.password = e.target.value)}
    //       />
    //       <button type="submit">Login</button>
    //     </form>
    //   )}
    // </div>
  );
}
