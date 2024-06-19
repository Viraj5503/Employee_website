import React from "react";
import CommonLayout from "../Components/CommonLayout";
import { Box, Button, Paper, TextField, styled } from "@mui/material";
import { useDispatch} from "react-redux";
import {contactDetails} from "../Pages/employeeSlice";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  width: 600,
  height: 400,
  textAlign: "center",
  lineHeight: 1,
}));


export default function Contact() {
  const dispatch = useDispatch()
  return (
    <Box sx={{ paddingTop: 14, display: "flex", justifyContent: "center"}}>
      <CommonLayout />
      <Item elevation={3} square={false}>
        <h1>Contact Us</h1>
        <TextField
          sx={{ width: "90%" }}
          // onChange={handleChange}
          // value={employeeDetails.name}
          name="name"
          label="Name"
          margin="normal"
          required
        />
        <TextField
          sx={{ width: "90%" }}
          // onChange={handleChange}
          // value={employeeDetails.salary}
          name="salary"
          type="number"
          label="Mobile Number"
          margin="normal"
          required
        />
        <TextField
          sx={{ width: "90%" }}
          // onChange={handleChange}
          // value={employeeDetails.salary}
          name="salary"
          type="email"
          label="Email"
          margin="normal"
        />

        <Button
          sx={{ width:'90%', marginTop:4}}
          onClick={() => dispatch(contactDetails())}
          variant='contained'
        >
          Submit
        </Button>
      </Item>
    </Box>
  );
}
