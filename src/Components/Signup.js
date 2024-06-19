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
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  Checkbox,
  Link,
} from "@mui/material";
import "../App.css";
import {Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

export default function Signup() {
  const navigate = useNavigate();
  const [value, setValue] = useState(dayjs);
  const [showPassword, setShowPassword] = useState(false);
  const [userData, setuserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    gender: "",
  });
  const [checked, setChecked] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setuserData({ ...userData, [name]: value });
    //console.log(userData)
  };

  const handleChecked = (e) => {
    setChecked(e.target.checked);
  };

  const loginPage = () => {
    if (
      userData.password.length >= 8 &&
      userData.firstName &&
      userData.lastName &&
      userData.email &&
      userData.password &&
      userData.gender &&
      checked
    ) {
      navigate("/login");
      const existingUser = JSON.parse(localStorage.getItem("User")) || [];
      const updatedData = [...existingUser, userData];
      localStorage.setItem("User", JSON.stringify(updatedData));
      //console.log(updatedData)
    } else {
      setuserData({
        ...userData,
        password: "",
      });
    }
  };

  return (
    <Box
      sx={{
        // backgroundColor: "red",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
      }}
    >
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
          // height: 'auto',
          maxWidth: "500px",
          p: 3,
          width: '100%',
        }}
        autoComplete="off"
      >
        <h1>Sign Up</h1>
        Its quick and easy.
        <br />
        <br />
        <TextField
          id="outlined-required"
          label="First Name"
          onChange={handleChange}
          value={userData.firstName}
          name="firstName"
          sx={{ m: 1, width: "100%" }}
          required
        />
        <TextField
          id="outlined-required"
          label="Last Name"
          onChange={handleChange}
          value={userData.lastName}
          name="lastName"
          sx={{ m: 1, width: "100%" }}
          required
        />
        <FormControl sx={{ m: 1, width: "100%" }}>
          <TextField
            onChange={handleChange}
            value={userData.email}
            name="email"
            id="outlined-email-input"
            label="Email Address"
            type="email"
            required
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password" required>
            New Password
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
            label="New Password"
          />
        </FormControl>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Date of Birth"
            sx={{ m: 2, width: "100%" }}
            value={value}
            onChange={(newValue) => setValue(newValue)}
          />
        </LocalizationProvider>
        <FormControl>
          <FormLabel id="demo-controlled-radio-buttons-group">Gender</FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="gender"
            value={userData.gender}
            onChange={handleChange}
          >
            <FormControlLabel
              value="female"
              control={<Radio />}
              label="Female"
            />
            <FormControlLabel value="male" control={<Radio />} label="Male" />
          </RadioGroup>
        </FormControl>
        <FormControlLabel
          required
          control={<Checkbox checked={checked} onChange={handleChecked} />}
          label="I agree to Terms and Conditions"
        />
        <Button
          onClick={() => loginPage()}
          sx={{ m: 2, width: "100%" }}
          variant="contained"
          disabled={!checked}
        >
          Sign Up
        </Button>
        <p>
          Already have an Account?{" "}
          <Link href="./login" underline="hover">
            {"Login"}
          </Link>
        </p>
      </Box>
    </Box>
  );
}
