import React from "react";
import {
  Button,
  Box,
  TextField,
  IconButton,
  OutlinedInput,
  InputLabel,
  InputAdornment,
  FormControl,
  Divider,
  Link,
} from "@mui/material";
import "../App.css";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [userData, setuserData] = useState({
    email: "",
    password: "",
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setuserData({ ...userData, [name]: value });
  };

  const signupPage = () => {
    navigate("/signup");
  };
  const homepage = () => {
    const existingUser = JSON.parse(localStorage.getItem("User")) || [];
    // console.log(existingUser)
    const user = existingUser.find(
      (user) =>
        user.email === userData.email && user.password === userData.password
    );

    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user))
      //console.log(user)
      navigate("/homepage");
    
    } else {
      console.log("invalid credentials");
    }
    setuserData({
      email: "",
      password: "",
    });
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display : "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 2,
      }}>
      <Box
        component="form"
        sx={{
          textAlign:'center',
          bgcolor: "#c5c6c7",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          border: 1,
          borderRadius: 2,
          maxHeight: '500px',
          height: '100%',
          maxWidth: "500px",
          p: 3,
          width: '100%',
        }}
        noValidate
        autoComplete="off"
      >
        <h1>Login</h1>
          <FormControl sx={{ m: 1, marginTop: 2, width: "100%" }}>
            <TextField
              onChange={handleChange}
              value={userData.email}
              name="email"
              id="outlined-email-input"
              label="Email Address"
            />
          </FormControl>
          <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              onChange={handleChange}
              value={userData.password}
              name="password"
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
          <Button
            onClick={() => homepage()}
            sx={{ m: 2, width: "100%" }}
            variant="contained"
          >
            Login
          </Button>
          <Link href="#" underline="hover">
            {"Forgot Password?"}
          </Link>
          <Divider sx={{ m: 2 }}></Divider>
          <Button
            onClick={() => signupPage()}
            sx={{ marginBottom: 2, width: "100%" }}
            variant="contained"
            color="success"
          >
            Create new account
          </Button>
      </Box>
    </Box>
  );
}
